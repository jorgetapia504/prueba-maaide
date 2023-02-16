import Link from 'next/link'
import React from 'react'
import { useCategories } from '../../hooks/'
import { Spinner } from './'

export const Categories = () => {

  const {categories, isLoading} = useCategories('/categories')

  return (
    <>
      {
        isLoading
          ? (
            <div className="flex w-full">
              <div className="m-auto mt-16 mb-16">
                <Spinner />
              </div>
            </div>
          )
          : (
            <div className='flex p-4'>
              <div className='w-1280 m-auto'>
                <div className='flex justify-around flex-wrap'>
                  {
                    categories?.length
                      ? categories.map(category => (
                        <Link href={`/tienda/${category.slug}`} key={category._id} className='w-64 h-64 mb-12 bg-contain bg-center hover:opacity-70 1010:w-80 1010:h-80 1280:w-410 1280:h-410'>
                          <img src={category.image} alt={category.category} />
                          <h2 className='text-xl text-center mt-2 font-light'>{category.category}</h2>
                        </Link>
                      ))
                      : ''
                  }
                </div>
              </div>
            </div>
          )
      }
    </>
  )
}
