import useSWR, { SWRConfiguration } from 'swr'
import { IProduct } from '../interfaces'

export const useProducts = ( url: string, config: SWRConfiguration = {} ) => {

  const { data, error } = useSWR<IProduct[]>(`http://localhost:4000${ url }`, config )

  return {
    products: data || [],
    isLoading: !error && !data,
    isError: error
  }

}