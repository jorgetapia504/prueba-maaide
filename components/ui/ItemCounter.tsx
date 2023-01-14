import React from 'react'

interface Props {
  currentValue: number
  maxValue: number
  updatedQuantity: (maxValue: number) => void
}

export const ItemCounter: React.FC<Props> = ({ currentValue, updatedQuantity, maxValue }) => {
  
  const addOrRemove = ( value: number ) => {
    if ( value === -1 ) {
      if ( currentValue === 1 ) return

      return updatedQuantity( currentValue - 1 )
    }

    if ( currentValue >= maxValue ) return

    updatedQuantity( currentValue + 1 )
  }
  
  return (
    <div className='border border-main w-fit flex rounded-md bg-white dark:bg-neutral-800'>
      <button className='pt-2 pb-2 pl-4 pr-4 text-main' onClick={ () => addOrRemove(-1) }>-</button>
      <p className='mt-auto mb-auto text-main w-4 text-center'>{ currentValue }</p>
      <button className='pt-2 pb-2 pl-4 pr-4 text-main' onClick={ () => addOrRemove(+1) }>+</button>
    </div>
  )
}
