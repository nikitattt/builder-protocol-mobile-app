import { Request, Response, NextFunction } from 'express'
import { loadImageFromUrl } from '../data/images'

require('dotenv').config()

const getData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const url = req.query.url as string
    const type = req.query.type

    if (!url) return res.status(404).json({ message: 'Provide image url' })

    const decodedUrl = decodeURIComponent(url)

    const size = type && type === 'thumbnail' ? 250 : 1500
    const image = await loadImageFromUrl(decodedUrl, size)

    res.setHeader('Content-Type', 'image/png')
    return res.status(200).send(image)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Error happened during data loading' })
  }
}

export default { getData }
