import { loadImageFromUrl } from '../data/images'
import { BunRequest } from 'bun'

const getData = async (req: BunRequest<'/image/from-url'>) => {
  try {
    const searchParams = new URL(req.url).searchParams
    const url = searchParams.get('url')
    const type = searchParams.get('type')

    if (!url) {
      return Response.json(
        { message: 'Provide image url' },
        {
          status: 404
        }
      )
    }

    const decodedUrl = decodeURIComponent(url)

    const size = type && type === 'thumbnail' ? 250 : 1500
    const image = await loadImageFromUrl(decodedUrl, size)

    return new Response(new Blob([new Uint8Array(image)]), {
      status: 200,
      headers: { 'Content-Type': 'image/png' }
    })
  } catch (e) {
    console.error(e)
    return Response.json(
      { error: 'Error happened during image loading' },
      { status: 500 }
    )
  }
}

export default { getData }
