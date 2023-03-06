import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductContext from '../context/product/ProductContext'

function SimilarProduct() {
    const [products, setProducts] = useState([])
    const {categoryId} = useContext(ProductContext)

    useEffect(()=> {
        if(!categoryId) return
        axios.get(`/category/products/${categoryId}`)
        .then(({data}) => setProducts(data.products))
    }, [categoryId])
  return (
    <div className='max-w-7xl mx-auto mt-10 px-6'>
        <h2 className='font-bold text-2xl'>Similar Products</h2>
        <div className="cardContainer flex gap-8">
        {products.length > 0 && products.slice(0,4).map((product, index) => (
            <Link to={`../product/${product._id}`} key={index} className="card w-[23%] cursor-pointer mt-6">
                <div className=" rounded overflow-hidden shadow-lg">
                <div className="img bg-white flex justify-center">
                <img className="w-auto h-72" src={product.photos[0].secure_url} alt={product.name} />
                </div>
                <div className="px-6 py-4">
                <h2 className="font-bold text-lg mb-2 line-clamp-3">{product.name}</h2>
                <p className="text-gray-700 text-base">₹ 
                {product.price}
                </p>
  </div>
</div>
            </Link>
        ))}
        </div>
        {/* convert to link */}
        <span className='float-right font-semibold m-3 cursor-pointer'>view more</span>
       
    </div>
  )
}

export default SimilarProduct