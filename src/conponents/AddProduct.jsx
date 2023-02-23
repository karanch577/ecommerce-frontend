import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

import UserContext from '../context/user/UserContext'

function AddProduct() {
  const [input, setInput] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    collectionId: "",
  })

  const formData = new FormData()

  const [files, setFiles] = useState([])
  const [showError, setShowError] = useState(false)
  const [dbError, setDbError] = useState(false)
  const [categories, setCategories] = useState([])

  const {setReload} = useContext(UserContext)

  useEffect(() => {
    axios.get("/category/all")
    .then(({data}) => setCategories(data.collections))
    .catch(err => console.log(err))
  }, [])
  
  const handleFiles = (e) => {
    setFiles(Array.from(e.target.files))
  }

  const handleForm = async (e) => {
      e.preventDefault()

      // add the values to the formdata

      for(let property in input) {
        formData.set(property, input[property])
      }

      files.forEach((element, i) => {
        formData.set(`file${i}`, element)
      })

      setInput({
        name: "",
        price: "",
        description: "",
        stock: "",
        collectionId: "",
      })

      setFiles([])

      if(!input.name || !input.price || !input.description || !input.stock || !input.collectionId || input.collectionId === "default") {
          setShowError(true)
      } else {
          setShowError(false)
          try {
            console.log(formData);
              const { data } = await axios.post("/product/create", formData)
              if(data.success) {
                  setReload((value) => !value)
              }
          } catch (error) {
              if(error?.response.status){
                  setDbError(true)
              }
          }
      }
  }


  return (
    <div>
       <form className='flex flex-col w-[75%] mx-auto relative bg-white rounded py-2 px-4' onSubmit={handleForm} onFocus={() =>{
            setShowError(false)
            setDbError(false)
        }} encType="multipart/form-data">
            <p className='text-3xl my-6'>Enter the Product details </p>
            {showError ? <p className='text-red-500 text-right absolute right-0 top-12'>* All fields are mandatory</p> : dbError ? <p className='text-red-500 text-right absolute right-0 top-12'>* Category already exist</p> : ""}

            <input type="text" placeholder='Product name' className='p-2 my-1 w-full rounded' value={input.name} onChange={(e) => setInput((prev) => ({
              ...prev,
              name: e.target.value}))}/>

            <input type="number" placeholder='Price' className='p-2 my-1 w-full rounded' min={0} value={input.price} onChange={(e) => setInput((prev) => ({
              ...prev,
              price: e.target.value
            }))}/>

            <textarea className='p-2' placeholder='Description' value={input.description} onChange={(e) => setInput((prev) => ({
              ...prev,
              description: e.target.value
            }))} />

            <select className='p-2 my-2' defaultValue={"default"} onChange={(e) => {
              setInput((prev) => ({
                ...prev,
                collectionId: e.target.value
              }))
            }}>
              <option value={"default"} disabled>Select Category</option>
              {categories.length && categories.map((el) => (
                <option key={el._id} value={el._id}>{el.name}</option>
              ))}
            </select>

            {/* images */}

            { files.length ?
            <div className='flex border h-48 justify-center items-center rounded-xl my-2'>
              {files.slice(0,4).map((file, index) => (
              <div className='w-32 h-32'>
                <img key={index} className="w-full h-full px-1" src={URL.createObjectURL(file)} />
              </div>
              ))}
              <label htmlFor='photos' className='w-32 h-32 flex items-center justify-center cursor-pointer'>Add more</label>
            </div> :
            <label htmlFor="photos" className='flex border h-32 justify-center items-center rounded-xl my-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>

            <span className='cursor-pointer'>Upload Photos</span></label>}
            <input id='photos' type="file" multiple className='hidden' onChange={handleFiles}/>

            <input type="Number" placeholder='Stock' className='p-2 my-1 w-full rounded' value={input.stock} onChange={(e) => setInput((prev) => ({
              ...prev,
              stock: e.target.value
            }))}/>

            <button type="submit" className='block my-4 bg-red-500 p-2 rounded text-white'>Add</button>
        </form>
    </div>
  )
}

export default AddProduct