import React from 'react'
import { useState } from "react";
import ProductContext from "./ProductContext";

export default function ProductProvider(props) {
    const [imgUrl, setImgUrl] = useState(null)
    const [categoryId, setCategoryId] = useState(null)
    return (
        <ProductContext.Provider value={{
            imgUrl,
            setImgUrl,
            categoryId,
            setCategoryId
        }}>
            {props.children}
        </ProductContext.Provider>
    )
}