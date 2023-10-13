// import {createServer} from 'node:http';

// const server = createServer((req, res) => {
//     res.write('Ola mundo');
//     return res.end();
// })

// server.listen(8000, () => {
//     console.log('O servidor está rodando na porta 8000');
// });

//FAZENDO A MESMA COISA POREM COM FASTIFY

import {fastify} from 'fastify'
//import {Databasememory} from './database-memory.js'
import { Databapostegres } from './database-postregresql.js'

const server = fastify()
//const database = new Databasememory()
const database= new Databapostegres()

server.get('/videos', async (request) => {
    const search = request.query.search
    const videos = await database.list(search)
    return videos

})

server.post('/videos', async (req, res) => {
    const {title, description, duration} = req.body
    console.log(title, description, duration)

    await database.create({
        title,
        description,
        duration,
    })

    return res.status(201).send()
})

server.put('/videos/:id', async (req, res) => {
    const videoId = req.params.id
    const {title, description, duration} = req.body

    await database.update({
        title,
        description,
        duration,
    })

    return res.status(204).send()
})

server.delete('/videos/:id', (req, res) => {
    const videoId = req.params.id

    database.delete(videoId)

    return res.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 8000,
})