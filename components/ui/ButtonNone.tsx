import React, { PropsWithChildren } from 'react'

export const ButtonNone: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <button className='pt-2 pb-2 pl-6 pr-6 rounded-md bg-main/40 text-white cursor-not-allowed'>
      { children }
    </button>
  )
}
