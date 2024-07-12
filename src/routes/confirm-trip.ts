import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import {dayjs} from "../lib/dayjs";
import getMailClient from "../lib/mail";
import nodemailer from "nodemailer"
import { ClientError } from "../errors/client-error";
import { env } from "../env";

export async function confirmTrip(app: FastifyInstance){
    app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/confirm', {
        schema: {
            params: z.object({
                tripId: z.string().uuid(),
            }) 
        }
    },
        async(request, reply) => {
           const { tripId } = request.params

           const trip = await prisma.trip.findUnique({
                where: {
                    id: tripId,
                },
                include: {
                    participants: {
                        where: {
                            is_owner: false,
                        }
                    }
                }
           })

            if(!trip){
                    throw new ClientError("Trip not found")
            }

            if(trip.is_confirmed){
                return reply.redirect(`${env.WEB_BASE_URL}/trips/${tripId}`)
            }

            await prisma.trip.update({
                where: {
                    id: tripId,
                },
                data: {
                    is_confirmed: true,
                }
            })

            const formattedStartDate = dayjs(trip.starts_at).format('LL')
            const formattedEndDate = dayjs(trip.ends_at).format('LL')

            const mail = await getMailClient()

            await Promise.all(
                trip.participants.map(async (participant) => {
                    const confirmationLink = `${env.API_BASE_URL}/participants/${participant.id}/confirm`
                    const message = await mail.sendMail({
                        from: {
                            name: 'Equipe plann.er',
                            address: 'oi@plann.er'
                        },
                        to: participant.email,
                        subject: `Confirmação de presensa na viagem para ${trip.destination}`,
                        html: `Olá ${participant.name},\n\nSua viagem para ${trip.destination} está confirmada.\n\nInício: ${formattedStartDate}\nFim: ${formattedEndDate}\n\nConfirme o início da viagem clicando no link abaixo:\n\n <a href="${confirmationLink}">Confirmar viagem</a>`
                    })
                    console.log(nodemailer.getTestMessageUrl(message))
                })
            )

            return reply.redirect(`${env.WEB_BASE_URL}http://localhost:3000/trips/${tripId}`)
    })
}