import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [products, setProducts] = useState([])
  useState(() => {
    axios.get("/product/all")
    .then(res => res.data).then(data => setProducts(data.products))
    .catch(err => console.log(err))
  },[])

  return (
    <div className='flex max-w-6xl mx-auto px-5 flex-wrap gap-6 justify-center mt-16'>
        {products.length > 0 && products.map(product => (
          <Link to={`/product/${product._id}`} key={product._id} className="w-[40%] md:w-[23%]">
            <div className="img">
              <img src={product.photos[0].secure_url} alt="product" className='rounded-xl object-cover aspect-square'/>
            </div>
            <h2 className='line-clamp-2 font-semibold'>{product.name}</h2>
            <p>₹ {product.price}</p>
          </Link>
        ))}
    </div>
  )
}

export default Home