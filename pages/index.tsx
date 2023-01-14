import { MainLayout } from "../components/layouts"
import { HomeSlider } from "../components/ui/HomeSlider"
import { useProducts } from "../hooks"
import { ProductList } from '../components/products'
import { Spinner } from "../components/ui"

export default function Home() {

  const { products, isLoading } = useProducts('/products')

  return (
    <MainLayout title="Blaspod" description="Tienda Online">
      <div className="z-0">
        <HomeSlider images={['https://res.cloudinary.com/df7nchfnh/image/upload/v1669732754/Ecommerce/banner2_hwfxdp.png', 'https://res.cloudinary.com/df7nchfnh/image/upload/v1669732758/Ecommerce/banner1_sma6nm.png']} />
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
    </MainLayout>
  )
}
