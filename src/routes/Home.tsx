import { Helmet } from 'react-helmet-async'
import { Hero } from '../components/storefront/Hero'
import { LatestArrivals } from '../components/storefront/LatestArrivals'
import { CategoryTiles } from '../components/storefront/CategoryTiles'
import { BenefitsBar } from '../components/storefront/BenefitsBar'
import { Newsletter } from '../components/storefront/Newsletter'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home | Great Commerce</title>
        <meta
          name="description"
          content="Discover curated essentials at Great Commerce."
        />
      </Helmet>
      <Hero />
      <BenefitsBar />
      <LatestArrivals />
      <CategoryTiles />
      <Newsletter />
    </>
  )
}
