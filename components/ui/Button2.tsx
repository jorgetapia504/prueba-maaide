import React, { PropsWithChildren } from 'react'

export const Button2: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <button className='pt-1.5 pb-1.5 pl-4 pr-4 rounded-md bg-main text-white'>
      { children }
    </button>
  )
}