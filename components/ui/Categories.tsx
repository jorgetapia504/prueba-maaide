import Link from 'next/link'
import React, { useState } from 'react'
import { ICategory } from '../../interfaces'

interface Props {
  categories: ICategory[]
}

export const Categories: React.FC<Props> = ({ categories }) => {

  const [imgLoad, setImgLoad] = useState(false)

  return (
    <>
      {
        categories.length
          ? (
            <div className='flex pt-4 pl-3 pr-3'>
              <div className='w-1280 m-auto flex flex-wrap justify-around'>
                {
                  categories.map(category => (
                    <Link href={`/tienda/${category.slug}`} key={category._id} className='w-full mb-2 p-1 bg-contain bg-center 500:w-1/2 800:w-1/3 hover:opacity-70'>
                      <img onLoad={() => setImgLoad(true)} src={category.image} alt={category.category} />
                      <h2 style={{ display: imgLoad ? 'block' : 'none' }} className='text-xl text-center mt-2 font-light'>{category.category}</h2>
                    </Link>
                  ))
                }
              </div>
            </div>
          )
          : ''
      }
    </>
  )
}
