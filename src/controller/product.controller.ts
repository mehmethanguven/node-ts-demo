import { Request, Response } from 'express'
import {
  CreateProductInput,
  ReadProductInput,
  UpdateProductInput,
} from '../schema/product.schema'
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
  findProducts,
} from '../service/product.service'

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput['body']>,
  res: Response,
) {
  const userId = res.locals.user._id

  const body = req.body

  const product = await createProduct({ ...body, user: userId })

  return res.send(product)
}

export async function updateProductHandler(
  req: Request<UpdateProductInput['params']>,
  res: Response,
) {
  const userId = res.locals.user._id

  const productId = req.params.productId
  const update = req.body

  const product = await findProduct({ productId })

  if (!product) {
    return res.sendStatus(404)
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403)
  }

  const updatedProduct = await findAndUpdateProduct({ productId }, update, {
    new: true,
  })

  return res.send(updatedProduct)
}

export async function getAllProductHandler(req: Request, res: Response) {
  console.log('getProductsHandler', req.params)
  const products = await findProducts()

  if (!products) {
    return res.sendStatus(404)
  }
  console.log('products', products)

  return res.send(products)
}

export async function getProductHandler(
  req: Request<UpdateProductInput['params']>,
  res: Response,
) {
  console.log('getProductHandler', req.params)
  const productId = req.params.productId
  const product = await findProduct({ productId })

  if (!product) {
    return res.sendStatus(404)
  }
  console.log('product', product)

  return res.send(product)
}

export async function deleteProductHandler(
  req: Request<UpdateProductInput['params']>,
  res: Response,
) {
  const userId = res.locals.user._id
  const productId = req.params.productId

  const product = await findProduct({ productId })

  if (!product) {
    return res.sendStatus(404)
  }

  if (String(product.user) !== userId) {
    return res.sendStatus(403)
  }

  await deleteProduct({ productId })

  return res.sendStatus(200)
}
