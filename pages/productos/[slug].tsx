import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useState, useEffect } from 'react'
import { ICartProduct, IProduct } from '../../interfaces'
import { dbProducts } from '../../database'
import { ButtonAddToCart, ButtonNone, ItemCounter, ProductSlider, Spinner } from '../../components/ui'
import { NumberFormat } from '../../utils'
import { NoReviews, ProductDetails, ProductList, ProductOffer, Reviews, ShippingCost } from '../../components/products'
import { ReviewsProduct, NoReviewsProduct } from '../../components/products/ReviewsProduct'
import { useProducts } from '../../hooks'
import Link from 'next/link'
import Head from 'next/head'

interface Props {
  product: IProduct
}

const ProductPage: React.FC<Props> = ({ product }) => {

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    name: product.name,
    image: product.images[0],
    price: product.price,
    beforePrice: product.beforePrice,
    slug: product.slug,
    quantity: 1,
    stock: product.stock
  })
  const [scrollPosition, setScrollPosition] = useState(0)

  const { products, isLoading } = useProducts('/products')

  const handleScroll = () => {
    const position = window.scrollY
    setScrollPosition(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const selectVariation = (e: any) => {
    const variation = product.variations?.find(variation => variation.variation === e.target.value)
    setTempCartProduct({...tempCartProduct, variation: variation})
  }

  const onUpdateQuantity = ( quantity: number ) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }))
  }

  let stars = 0
  let quantity = 0

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      {
        scrollPosition >= 400
          ? <ProductDetails product={product} setTempCartProduct={setTempCartProduct} tempCartProduct={tempCartProduct} />
          : ''
      }
      <div className='flex p-4'>
        <div className='block m-auto w-full gap-4 lg:flex xl2:w-1280 xl2:gap-8'>
          <div className='w-full lg:w-1/2'>
            <div className='mb-4'>
              <span className='text-15 font-light'><Link href='/tienda'>Tienda</Link> / <Link href={`/category/${ product.category }`}>{ product.category[0].toUpperCase() }{ product.category.substring(1) }</Link> / <Link href={`/product/${ product.slug }`}>{ product.name }</Link></span>
            </div>
            <div className='sticky top-32 mb-0 1010:mb-10'>
              <ProductSlider images={ product.images } />
            </div>
          </div>
          <div className='w-full mt-2 lg:w-1/2 lg:mt-11'>
            {
              product.beforePrice
                ? <div className='mb-4'>
                  <span className='bg-main w-fit text-white pt-2 pb-2 pl-4 pr-4 text-xl mb-2'>OFERTA</span>
                </div>
                : ''
            }
            <h1 className='text-3xl mb-2'>{ product.name }</h1>
            {
              product.reviews
                ? product.reviews.map(review => {
                  stars = stars + review.calification
                  quantity = quantity + 1
                  return null
                })
                : <NoReviews />
            }
            {
              product.reviews
                ? <Reviews reviews={product.reviews} quantity={quantity} stars={stars} />
                : ''
            }
            <div className='flex gap-2 mb-2'>
              <span>${ NumberFormat(product.price) }</span>
              {
                product.beforePrice
                  ? <span className='text-sm line-through font-light'>${ NumberFormat(product.beforePrice) }</span>
                  : ''
              }
              {
                product.beforePrice
                  ? <span className='font-semibold text-green'>{-(Math.round((product.price * 100) / product.beforePrice)) + 100}% OFF</span>
                  : ''
              }
            </div>
            <span className='mb-2 font-light text-sm block'>En <span className='text-green font-normal'>3 cuotas sin interes de ${NumberFormat(Math.round(product.price / 3))}</span></span>
            <span className='mb-2 font-light text-sm block'>Stock: { product.stock } { product.stock === 1 ? 'unidad' : 'unidades' }</span>
            {
              product.variations
                ? <select onChange={selectVariation} className='border p-1 rounded-md font-light mb-2'>
                  <option>Seleccionar variación</option>
                  {
                    product.variations?.map(variation => (
                      <option key={variation.variation}>{variation.variation}</option>
                    ))
                  }
                </select>
                : ''
            }
            <div className='flex gap-2 pb-4 border-b dark:border-neutral-800'>
              <ItemCounter
                currentValue={ tempCartProduct.quantity }
                updatedQuantity={ onUpdateQuantity }
                maxValue={ product.stock }
              />
              {
                product.variations
                  ? tempCartProduct.variation
                    ? <ButtonAddToCart tempCartProduct={tempCartProduct} />
                    : <ButtonNone>Añadir al Carrito</ButtonNone>
                  : <ButtonAddToCart tempCartProduct={tempCartProduct} />
              }
            </div>
            <div className='border-b pb-4 mt-4 dark:border-neutral-800'>
              <ShippingCost />
            </div>
            {
              product.productsOffer
                ? <div className='mt-4 border-b pb-4 dark:border-neutral-800'>
                  <h2 className='text-xl mb-2 font-light'>Ofertas por la compra de este producto</h2>
                  {
                    product.productsOffer.map(offer => <ProductOffer key={offer.products[0].slug} offer={offer} />)
                  }
                </div>
                : ''
            }
            <div className='mt-4'>
              <h2 className='text-xl mb-2 font-light'>Descripción</h2>
              {product.description.split('|').map(des => {
                return <p className='font-light mb-1 text-sm' key={des}>{des}</p>
              })}
            </div>
          </div>
        </div>
      </div>
      <div className='flex p-4'>
        <div className='w-1280 m-auto'>
          <h2 className='text-xl mb-2 font-light'>Evaluaciones de clientes</h2>
          <span className='font-light mb-1'>Valoracion media</span>
          {
            product.reviews
              ? <ReviewsProduct quantity={quantity} stars={stars} reviews={product.reviews} />
              : <NoReviewsProduct />
          }
        </div>
      </div>
      {
        isLoading
          ? (
            <div className="flex w-full">
              <div className="m-auto mt-16 mb-16">
                <Spinner />
              </div>
            </div>
          )
          : <ProductList products={ products } title='Productos recomendados' />
      }
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProducts.getAllProductSlugs()

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string }
  const product = await dbProducts.getProductBySlug( slug )

  if ( !product ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 86400
  }
}

export default ProductPage