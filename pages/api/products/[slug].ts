import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Product } from '../../../models'
import { IProduct } from '../../../interfaces'

type Data = 
  | { message: string }
  | IProduct

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch( req.method ) {
    case 'GET':
      return getProductBySlug( req, res )
    
    default:
      return res.status(400).json({
        message: 'Bad request'
      })
  }
}

async function getProductBySlug(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.dbConnect()
  const { slug } = req.query
  const product = await Product.findOne({ slug }).lean()

  if ( !product ) {
    return res.status(404).json({
      message: 'Producto no encontrado'
    })
  }

  return res.json( product )
}