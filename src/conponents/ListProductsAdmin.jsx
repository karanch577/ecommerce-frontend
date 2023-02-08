import React from 'react'
import { Link, useParams } from 'react-router-dom'
import AddProduct from './AddProduct'

function ListProducts() {
  const { action } = useParams()
  return (
    action !== "add" ? (
      <div className='flex justify-center'>
    <Link className='bg-red-500 text-white px-6 py-2 rounded-full text-xl' to={"products/add"}>
      Add Product
    </Link>
  </div>
    ) : <AddProduct />
  )
}

export default ListProducts