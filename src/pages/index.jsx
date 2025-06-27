import Head from 'next/head'

// import { CallToAction } from '@/components/CallToAction'
// import { Faqs } from '@/components/Faqs'
import NewFooter from '@/components/NewFooter'
import Navbar from '@/components/Navbar'
import NewHero from '@/components/NewHero'
import Products from '@/components/Products'
import About from '@/components/About'
import Contact from '@/components/Contact'
// import { Pricing } from '@/components/Pricing'
// import { PrimaryFeatures } from '@/components/PrimaryFeatures'
// import { Reviews } from '@/components/Reviews'
// import { SecondaryFeatures } from '@/components/SecondaryFeatures'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ninana Technologies Private Limited</title>
        <meta
          name="description"
          content="A tech firm based in Gandhinagar Gujarat. We are hiring!"
        />
      </Head>
      <Navbar />
      <main>
        <NewHero />
        <Products />
        <About />
        <Contact />
      </main>
      <NewFooter />
    </>
  )
}
