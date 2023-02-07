import { ICartProduct } from "./cart"

export interface ISell {
  _id?: string
  firstName: string
  lastName: string
  email: string
  phone?: number
  address: string
  details?: string
  region: string
  city: string
  total: number
  cart: ICartProduct[]
  coupon?: string
  shipping: number,
  serviceShipping?: string
  pay: string
  state: string

  createdAt?: Date
  updatedAt?: Date
}