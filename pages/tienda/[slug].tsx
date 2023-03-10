import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { ProductCard3 } from '../../components/products'
import { Spinner, CategoriesShop } from '../../components/ui'
import { dbProducts } from '../../database'
import { useProducts, useCategories } from '../../hooks'
import { ICategory } from '../../interfaces'
import { IProduct } from '../../interfaces'

interface Props {
  category: ICategory
}

const CategoryPage: React.FC<Props> = ({ category }) => {

  const [filterProducts, setFilterProducts] = useState<IProduct[]>([])
  const router = useRouter()
  const { categories } = useCategories('/categories')

  const { products, isLoadingProducts } = useProducts('/products')

  useEffect(() => {
    if (!isLoadingProducts) {
      const filter = products.filter(product => product.category === category.category)
      if (filter) {
        setFilterProducts(filter)
      }
    }
  }, [isLoadingProducts, router.asPath])

  return (
    <>
      <Head>
        <title>{ category.category }</title>
      </Head>
      <div className='bg-gradient-to-r from-sky-500 pt-20 pb-20 to-indigo-500 flex pl-4 pr-4'>
        <div className='w-1280 m-auto'>
          <h1 className='text-5xl text-white mb-4 text-center'>{category.category}</h1>
          <p className='font-light text-lg text-white w-full text-center'>{category.description}</p>
        </div>
      </div>
      <CategoriesShop categories={categories} />
      {
        filterProducts.length === 0
          ? (
            <div className="flex w-full">
              <div className="m-auto mt-16 mb-16">
                <Spinner />
              </div>
            </div>
          )
          : <div className='flex'>
            <div className='w-1280 m-auto flex gap-2 pt-4 pb-4 flex-wrap'>
              {
                filterProducts.map(product => (
                  <ProductCard3 key={product._id} product={product} />
                ))
              }
            </div>
          </div>
      }
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const categoriesSlugs = await dbProducts.getAllcategoriesSlug()
  
  return {
    paths: categoriesSlugs.map(({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string }
  const category = await dbProducts.getCategoriesBySlug( slug )

  if ( !category ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      category
    },
    revalidate: 86400
  }
}

export default CategoryPage