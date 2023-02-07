import Link from 'next/link'
import React from 'react'

export const Categories = () => {
  return (
    <div className='flex p-4'>
      <div className='w-1280 m-auto'>
        <div className='flex gap-2 justify-around flex-wrap'>
          <Link href='/' className='flex w-64 h-64 bg-contain bg-center 1010:w-80 1010:h-80 1280:w-410 1280:h-410 bg-[url("https://res.cloudinary.com/blasspod/image/upload/v1675207506/blaspod/Audifonos_inalambricos_ydovli.png")]'>
            <h2 className='m-auto text-2xl text-center font-bold text-white'>AUDÍFONOS INALÁMBRICOS</h2>
          </Link>
          <Link href='/' className='flex w-64 h-64 bg-contain bg-center 1010:w-80 1010:h-80 1280:w-410 1280:h-410 bg-[url("https://res.cloudinary.com/blasspod/image/upload/v1675207504/blaspod/Relojes_inteligentes_vzaqt5.png")]'>
            <h2 className='m-auto text-2xl text-center font-bold text-white'>RELOJES INTELIGENTES</h2>
          </Link>
          <Link href='/' className='flex w-64 h-64 bg-contain bg-center 1010:w-80 1010:h-80 1280:w-410 1280:h-410 bg-[url("https://res.cloudinary.com/blasspod/image/upload/v1675207505/blaspod/Carcasas_Airpods_ljpw1p.png")]'>
            <h2 className='m-auto text-2xl text-center font-bold text-white'>CARCASAS AIRPODS</h2>
          </Link>
        </div>
      </div>
    </div>
  )
}
