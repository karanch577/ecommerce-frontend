import axios from 'axios'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ImgCarousel from '../conponents/ImgCarousel'
import SimilarProduct from '../conponents/SimilarProduct'
import ProductContext from '../context/product/ProductContext'
import UserContext from '../context/user/UserContext'

function Product() {
    const { id } = useParams()

    const {setImgUrl, setCategoryId} = useContext(ProductContext)
    const {cart, setCart} = useContext(UserContext)

    const [product, setProduct] = useState(null)
    const [showFullDesc, setShowFullDesc] = useState(false)

    useEffect(() => {
        if(!id) return

        axios.get("/product/id/" + id)
        .then(({data}) => {
            setProduct(data.product)
            setImgUrl(data?.product?.photos)
            setCategoryId(data?.product?.collectionId)
        })
        .catch(err => console.log(err))
    }, [id])

    // handle add to cart 
    function handleCart() {
        // check if the product already exist
        const existingProduct = cart.find(ele => ele?.item._id === product._id)
        // if the product exist increase the count
        if(existingProduct) {
            const updatedCart = cart.map(ele => (
                ele.item._id === product._id ? {
                    ...ele,
                    count: ele.count + 1
                } : ele
            ))
            setCart(updatedCart)
        } else {
            setCart((prev) => [...prev, {item: product, count: 1}])
        }
    }
  return (
    <>
     <div className='flex max-w-7xl mx-auto mt-24 gap-10 px-6'>
        <div className="img w-1/3">
            <ImgCarousel />
        </div>
        <div className="flex flex-col justify-between">
            <div className="info">
            <h2 className='text-xl font-semibold my-2'>{product?.name}</h2>
            <p>₹ {product?.price}</p>
            <div className="desc">
                {showFullDesc ? <div>
                <p className='my-4'>{product?.description}</p>
                {/* view less btn */}
                <span className='float-right flex items-center font-semibold cursor-pointer' onClick={() => setShowFullDesc(prev => !prev)}>
                view more
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
</svg>

            </span>
                </div> :
                <div>
                <p className='line-clamp-6 my-4'>{product?.description}</p>
            {product?.description.length > 645 && <span className='float-right flex items-center font-semibold cursor-pointer' onClick={() => setShowFullDesc(prev => !prev)}>
                view more
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 relative top-0.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
            </span> }
                </div>}
            </div>
            </div>
            <div className="btn font-semibold mb-6 flex justify-center">
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold flex items-center justify-center w-32 h-10 rounded' onClick={() => handleCart()}>Add to Cart</button>
            <Link to="/buy" className='bg-blue-500 hover:bg-blue-700 text-white font-bold flex items-center justify-center w-32 h-10 rounded ml-12'>Buy Now</Link>
            </div>
        </div>
    </div>
    {/* similar product section */}
    <SimilarProduct />
    </>
  )
}

export default Product