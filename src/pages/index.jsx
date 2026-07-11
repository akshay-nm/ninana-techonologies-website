import Head from 'next/head'

import NewFooter from '@/components/NewFooter'
import Navbar from '@/components/Navbar'
import NewHero from '@/components/NewHero'
import ProductStory from '@/components/ProductStory'
import About from '@/components/About'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ninana Technologies Private Limited</title>
        <meta
          name="description"
          content="Ninana builds Vivid, Pragati, and Wasp — software for real estate, construction, and legal practice. Based in Gandhinagar, Gujarat. We're hiring!"
        />
      </Head>
      <Navbar />
      <main>
        <NewHero />
        <ProductStory />
        <About />
        <Contact />
      </main>
      <NewFooter />
    </>
  )
}
