// import { createServer } from "node:http"

// const server = createServer((request, response) => {
//     response.write("Hello World")
    
    
//     return response.end()
// })

// server.listen(3333)


// Request Body


import { fastify } from "fastify"
import { dataBasePostgres } from "./database-postgres.js"

const server = fastify()

//const dataBase = new dataBaseMemory()
const dataBase = new dataBasePostgres()

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body



    await dataBase.create({
        title,
        description,
        duration,
    })


    return reply.status(201).send()
})


server.get('/videos', async (request) => {
    const search = request.query.search
   
   
    const videos = await dataBase.list(search)


    return videos
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const { title, description, duration} = request.body

    await dataBase.update(videoId, {
        title,
        description,
        duration,
    })


    return reply.status(204).send()
})



server.delete('/videos/:id', async  (request, reply) => {
    const videoId = request.params.id
    await dataBase.delete(videoId)

    return reply.status(204).send()
})


server.listen({
    port: process.env.PORT ?? 3333, 
})