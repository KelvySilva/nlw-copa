import Fastify from "fastify";
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { poolRoutes } from "./routes/pool";
import { userRoutes } from "./routes/user";
import { guessRoutes } from "./routes/guess";
import { authRoutes } from "./routes/auth";
import * as dotenv from 'dotenv'
import { gameRoutes } from "./routes/game";

dotenv.config()

const secret = String(process.env.SECRET) || '' 

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })
  
  await fastify.register(cors, {
    origin: true
  })  

  // Tornar a secre como variavel de ambiente 
  await fastify.register(jwt, {
    secret: secret ,
  })

  await fastify.register(authRoutes)
  await fastify.register(poolRoutes)
  await fastify.register(userRoutes)
  await fastify.register(guessRoutes)  
  await fastify.register(gameRoutes)  

  await fastify.listen({port: 3333 ,host: '192.168.237.64' }, (err, address) => {
    console.log('Rodando em: ', address)
  })
}

bootstrap()