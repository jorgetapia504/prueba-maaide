import React, { PropsWithChildren } from 'react'

export const Button: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <button className='pt-2 pb-2 pl-6 pr-6 rounded-md bg-main text-white'>
      { children }
    </button>
  )
}
