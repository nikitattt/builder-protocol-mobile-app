import { createPublicClient, fallback, http, isAddress } from 'viem'
import { mainnet } from 'viem/chains'
import { loadImage } from '../../data/images'
import { BunRequest } from 'bun'

const ANKR_RPC_URL = process.env.ANKR_RPC_URL
const BLOCKPI_RPC_URL = process.env.BLOCKPI_RPC_URL
const ALCHEMY_RPC_URL = process.env.ALCHEMY_RPC_URL

const getData = async (req: BunRequest<'/image/:address/:id'>) => {
  try {
    const address = req.params.address
    const tokenId = req.params.id
    const searchParams = new URL(req.url).searchParams
    const type = searchParams.get('type')

    if (!address)
      return new Response(JSON.stringify({ message: 'Provide DAO address' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    if (!tokenId)
      return new Response(JSON.stringify({ message: 'Provide token id' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      })
    if (!isAddress(address))
      return new Response(JSON.stringify({ error: 'Incorrect DAO address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })

    const ankr = http(ANKR_RPC_URL)
    const blockpi = http(BLOCKPI_RPC_URL)
    const alchemy = http(ALCHEMY_RPC_URL)

    const client = createPublicClient({
      chain: mainnet,
      transport: fallback([ankr, blockpi, alchemy])
    })

    const size = type && type === 'thumbnail' ? 250 : 1500
    const image = await loadImage(client, address, tokenId, size)

    // @ts-ignore
    return new Response(image, {
      status: 200,
      headers: { 'Content-Type': 'image/png' }
    })
  } catch (e) {
    console.error(e)
    return new Response(
      JSON.stringify({ error: 'Error happened during data loading' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export default { getData }
