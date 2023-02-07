import { HomeSlider } from "../components/ui/HomeSlider"
import { useProducts } from "../hooks"
import { ProductList } from '../components/products'
import { Categories, Spinner } from "../components/ui"
import Head from "next/head"

export default function Home() {

  const { products, isLoading } = useProducts('/products')

  return (
    <>
      <Head>
        <title>Inicio</title>
      </Head>
      <div className="z-0">
        <HomeSlider />
        <Categories />
        {
          isLoading
            ? (
              <div className="flex w-full">
                <div className="m-auto mt-16 mb-16">
                  <Spinner />
                </div>
              </div>
            )
            : <ProductList products={ products } title='Más Vendidos' />
        }
      </div>
    </>
  )
}
