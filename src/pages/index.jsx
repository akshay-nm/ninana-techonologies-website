import Head from 'next/head'

import NewFooter from '@/components/NewFooter'
import Navbar from '@/components/Navbar'
import NewHero from '@/components/NewHero'
import Manifesto from '@/components/Manifesto'
import ProductIndex from '@/components/ProductIndex'
import About from '@/components/About'
import Careers from '@/components/Careers'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ninana Technologies Private Limited</title>
        <meta
          name="description"
          content="Ninana is a product studio in Gandhinagar building Vivid, Pragati, and Wasp. Software for real estate, construction, and legal practice. We're hiring."
        />
      </Head>
      <Navbar />
      <main>
        <NewHero />
        <Manifesto />
        <ProductIndex />
        <About />
        <Careers />
        <Contact />
      </main>
      <NewFooter />
    </>
  )
}
