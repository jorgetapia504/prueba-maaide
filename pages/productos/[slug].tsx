import { GetStaticPaths, GetStaticProps } from 'next'
import React, { useState, useEffect } from 'react'
import { ICartProduct, IProduct } from '../../interfaces'
import { dbProducts } from '../../database'
import { MainLayout } from '../../components/layouts'
import { Button, ButtonNone, ItemCounter, ProductSlider } from '../../components/ui'
import NextLink from 'next/link'
import { NumberFormat } from '../../utils'
import { NoReviews, ProductDetails, ProductOffer, Reviews, ShippingCost } from '../../components/products'

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
    quantity: 1
  })
  const [scrollPosition, setScrollPosition] = useState(0)

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
    setTempCartProduct({...tempCartProduct, variation: e.target.value})
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
    <MainLayout title={ product.name } description={ product.description }>
      {
        scrollPosition >= 400
          ? <ProductDetails product={product} setTempCartProduct={setTempCartProduct} tempCartProduct={tempCartProduct} />
          : ''
      }
      <div className='flex mt-2'>
        <div className='block m-auto w-full gap-4 p-4 lg:flex xl2:w-1270 xl2:gap-8'>
          <div className='w-full lg:w-1/2'>
            <p className='text-15 mb-4 font-light'><NextLink href='/tienda'>Tienda</NextLink> / <NextLink href={`/category/${ product.category }`}>{ product.category[0].toUpperCase() }{ product.category.substring(1) }</NextLink> / <NextLink href={`/product/${ product.slug }`}>{ product.name }</NextLink></p>
            <div className='sticky top-32'>
              <ProductSlider images={ product.images } />
            </div>
          </div>
          <div className='w-full mt-2 lg:w-1/2 lg:mt-11'>
            {
              product.beforePrice
                ? <div className={'fadeIn'}>
                  <p className='bg-main w-fit text-white pt-2 pb-2 pl-4 pr-4 text-xl mb-2'>OFERTA</p>
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
                ? <Reviews product={product} quantity={quantity} stars={stars} />
                : ''
            }
            <div className='flex gap-2 mb-2'>
              <p className='text-lg'>${ NumberFormat(product.price) }</p>
              {
                product.beforePrice
                  ? <p className='text-sm line-through font-light'>${ NumberFormat(product.beforePrice) }</p>
                  : ''
              }
              {
                product.beforePrice
                  ? <p className='font-semibold text-green text-lg'>{-(Math.round((product.price * 100) / product.beforePrice)) + 100}% OFF</p>
                  : ''
              }
            </div>
            <p className='mb-2 font-light'>En <span className='text-green font-normal'>3 cuotas sin interes de ${NumberFormat(Math.round(product.price / 3))}</span></p>
            <p className='mb-2 font-light'>Stock: { product.stock } { product.stock === 1 ? 'unidad' : 'unidades' }</p>
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
            <div className='flex gap-2 pb-2'>
              <ItemCounter
                currentValue={ tempCartProduct.quantity }
                updatedQuantity={ onUpdateQuantity }
                maxValue={ product.stock }
              />
              {
                product.variations
                  ? tempCartProduct.variation
                    ? <Button>Añadir al Carrito</Button>
                    : <ButtonNone>Añadir al Carrito</ButtonNone>
                  : <Button>Añadir al Carrito</Button>
              }
            </div>
            <div className='border-b dark:border-neutral-800 pb-6'>
              <img className='w-80' src='https://res.cloudinary.com/blasspod/image/upload/v1672619452/blaspod/tarjetas_y8wdcq.png' />
            </div>
            <ShippingCost />
            {
              product.productsOffer
                ? <div className='mt-4 border-b pb-4 dark:border-neutral-800'>
                  <h3 className='text-xl mb-2'>Ofertas por la compra de este producto</h3>
                  {
                    product.productsOffer.map(offer => <ProductOffer key={offer.products[0].slug} offer={offer} />)
                  }
                </div>
                : ''
            }
            <div className='mt-4'>
              <h3 className='text-xl mb-2'>Descripción</h3>
              {product.description.split('|').map(des => {
                return <p className='font-light mb-1' key={des}>{des}</p>
              })}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
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