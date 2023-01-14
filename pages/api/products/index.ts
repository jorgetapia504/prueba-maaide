import type { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from '../../../interfaces'
import { db } from '../../../database'
import { Product } from '../../../models'

type Data = 
  | { message: string }
  | IProduct[]

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

  switch( req.method ) {
    case 'GET':
      return getProducts( req, res )

    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }

}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  await db.dbConnect()
  const products = await Product.find()
  .select('name images price beforePrice stock slug -_id')
  .lean()
  
  return res.status(200).json( products )
  
}