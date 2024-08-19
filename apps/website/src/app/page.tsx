import GithubLink from '@/components/github'
import MadeBy from '@/components/madeBy'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Builder Mobile App',
    description:
      'All your Builder Daos in the pocket. Track proposals and auctions. Vote and bid.',
    openGraph: {
      url: 'https://builderapp.wtf',
      images: 'https://builderapp.wtf/img/og-image.png',
      title: 'Builder Mobile App',
      description:
        'All your Builder Daos in the pocket. Track proposals and auctions. Vote and bid.'
    },
    twitter: {
      title: 'Builder Mobile App',
      description:
        'All your Builder Daos in the pocket. Track proposals and auctions. Vote and bid.',
      card: 'summary_large_image',
      creator: '@iamng_eth',
      images: ['https://builderapp.wtf/img/og-image.png']
    },
    other: {
      'fc:frame': 'vNext',
      'fc:frame:image': `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/img/frame-image.jpg`,
      'fc:frame:image:aspect_ratio': '1:1',
      'fc:frame:button:1': 'Install on iOS',
      'fc:frame:button:1:action': 'link',
      'fc:frame:button:1:target':
        'https://apps.apple.com/us/app/builder-daos/id6450520394',
      'fc:frame:button:2': 'Website',
      'fc:frame:button:2:action': 'link',
      'fc:frame:button:2:target': 'https://builderapp.wtf/',
      'fc:frame:button:3': 'Share',
      'fc:frame:button:3:action': 'link',
      'fc:frame:button:3:target':
        'https://warpcast.com/~/compose?text=This+Builder+app+is+awesome%21+I+use+it+to+track+everything+in+my+Dao.&embeds[]=https://builderapp.wtf/'
    }
  }
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-white to-sky/50 text-black">
      <div className="flex flex-col-reverse md:flex-row mt-12 md:mt-20 mb-20 justify-center items-center gap-8 md:gap-20 lg:gap-32 px-8 text-center md:text-start">
        <div className="">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-72 rounded-[2.5rem] border-[7px] border-black ring-[3px] ring-[#7e7384] rotate-0 md:-rotate-1"
            src="/video/showcase.mp4"
          />
        </div>
        <div className="pb-4">
          <h1 className="text-2xl md:text-4xl font-black">
            Builder DAOs
            <br />
            in your pocket
          </h1>
          <div className="mt-8">
            <p>
              <span className="text-pink mr-0.5">•</span> All your Daos in one
              place
            </p>
            <p>
              <span className="text-purple mr-0.5">•</span> See pending
              proposals
            </p>
            <p>
              <span className="text-green mr-0.5">•</span> Track auctions
            </p>
            <p>
              <span className="text-orange mr-0.5">•</span> Widgets for
              everything
            </p>
            <p>
              <span className="text-red mr-0.5">•</span> Install on M1-M2 Macs
              too
            </p>
          </div>
          <div className="mt-10 max-w-max hidden md:flex flex-row bg-white rounded-2xl p-2 gap-1">
            <img
              src="/svg/app-store-qr.svg"
              alt="App Store Install QR Code"
              className="h-32 w-32"
            />
            <div className="flex flex-col">
              <div className="my-auto">
                <p className="mt-1.5 text-center text text-[#3e87f8]/80 font-bold leading-5 tracking-tight">
                  Scan to install
                  <br />
                  on the phone
                </p>
              </div>
              <div className="grow-0">
                <a
                  href="https://apps.apple.com/us/app/builder-daos/id6450520394"
                  target="_blank"
                >
                  <img
                    src="/svg/app-store-download-badge.svg"
                    alt="App Store Download Badge"
                    className="w-32 m-1.5"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 flex md:hidden w-full justify-center">
            <a
              href="https://apps.apple.com/us/app/builder-daos/id6450520394"
              target="_blank"
            >
              <img
                src="/svg/app-store-download-badge.svg"
                alt="App Store Download Badge"
                className="w-32 m-1.5"
              />
            </a>
          </div>
        </div>
      </div>
      <footer className="mb-6 mt-12 flex flex-col items-center justify-center gap-4">
        <div className="flex flex-row gap-2 items-center">
          <MadeBy />
          <p className="text-xs text-grey-four">•</p>
          <GithubLink />
        </div>
      </footer>
    </main>
  )
}
