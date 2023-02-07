export interface IProduct {
  _id: string
  name: string
  description: string
  images: string[]
  stock: number
  price: number
  beforePrice?: number
  timeOffer?: string
  variations?: IVariation[]
  productsOffer?: IProductsOffer[]
  slug: string
  tags: string[]
  category: string
  reviews?: IReview[] 

  createdAt: string
  updatedAt: string
}

export interface IReview {
  _id?: string
  calification: number
  name: string
  email?: string
  title?: string
  review: string
  createdAt: Date
}

export interface IProductsOffer {
  products: IProductOffer[]
  price: number
}

export interface IProductOffer {
  name: string
  beforePrice: number
  image: string
  slug: string
  variations?: IVariation[]
}

export interface IVariation {
  variation: string
  image: string
}