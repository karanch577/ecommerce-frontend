import axios from 'axios'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ImgCarousel from '../conponents/ImgCarousel'
import ProductContext from '../context/product/ProductContext'

function Product() {
    const { id } = useParams()

    const {setImgUrl} = useContext(ProductContext)
    const [product, setProduct] = useState(null)

    useEffect(() => {
        if(!id) return

        axios.get("/product/id/" + id)
        .then(({data}) => {
            setProduct(data.product)
            setImgUrl(data?.product?.photos)
        })
        .catch(err => console.log(err))
    }, [id])
  return (
    <div className='flex max-w-7xl mx-auto mt-24 gap-10'>
        <div className="img w-1/3">
            <ImgCarousel />
        </div>
        <div className="info">
            <h2 className='text-xl font-semibold'>{product?.name}</h2>
            <p>₹ {product?.price}</p>
            <p className='line-clamp-6'>{product?.description}</p>
            <div className="btn font-semibold">
            <button>Add to Cart</button>
            <Link to="/buy">Buy Now</Link>
            </div>
        </div>
        
    </div>
  )
}

export default Product