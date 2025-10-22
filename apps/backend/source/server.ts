import dao from './controllers/dao'
import image from './controllers/image'
import v1Dao from './controllers/v1/dao'
import v1Image from './controllers/v1/image'
import { BunRequest } from 'bun'

const PORT = process.env.PORT ?? 6060

const withMiddleware =
  (handler: (req: BunRequest) => Response | Promise<Response>) =>
  async (req: BunRequest) => {
    console.log(`${req.method} ${new URL(req.url).pathname}`)

    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers':
            'origin, X-Requested-With,Content-Type,Accept, Authorization',
          'Access-Control-Allow-Methods': 'GET, OPTIONS'
        }
      })
    }

    if (req.method !== 'GET') {
      return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const resp = await handler(req)
    resp.headers.set('Access-Control-Allow-Origin', '*')
    return resp
  }

Bun.serve({
  port: PORT,
  routes: {
    '/health': () => new Response('OK'),
    '/dao/:chain/:address': {
      GET: withMiddleware(dao.getData)
    },
    '/image/from-url': {
      GET: image.getData
    },
    '/dao/:slug': {
      GET: withMiddleware(v1Dao.getData)
    },
    '/image/:address/:id': {
      GET: v1Image.getData
    },
    '/*': new Response('Not Found', { status: 404 })
  }
})

console.log(`The server is running on port ${PORT}`)
