import axios from 'axios'
import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import UserContext from '../context/user/UserContext'
import AddCategory from './AddCategory'

function CategoriesAdmin() {
  const { action } = useParams()
  const [categories, setCategories] = useState([])
  const [editId, setEditId] = useState("")
  const [editInput, setEditInput] = useState("")

  const state = useContext(UserContext)

  useEffect(() => {
    try {
      axios.get("/category/all")
      .then(({data}) => setCategories(data.collections))
    } catch (error) {
      console.log(error);
    }
  }, [editId, state.reload])

  async function handleEdit() {
    try {
      await axios.put(`/category/${editId}`, {
        name: editInput
      })
      setEditId("")
      setEditInput("")
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(deleteId) {
    try {
      await axios.delete(`/category/${deleteId}`)
      state.setReload((value) => !value)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    action !== "add" ? (
    <div className='flex flex-col'>
    <div className='flex justify-center'>
    <Link className='text-white px-6 py-2 rounded-full text-xl bg-red-500' to={"categories/add"}>
      Add Category
    </Link>
    </div>
    {/* list the categories */}
      <h2 className='text-2xl m-2 top-3'>Categories -</h2>
    <div className='bg-white rounded h-[56vh] overflow-auto'>
      <div>
      {categories.length ? categories.map((el) => <div className='text-xl my-3 mx-5 flex items-center justify-between' key={el._id}>
      <div className="input grow">
        
      {editId === el._id ? <input type="text" placeholder={editInput} onChange={(e) => setEditInput(e.target.value)} className='w-full'/> : <p>{el.name}</p>}
      </div>
      {editId === el._id ? <button className='text-white bg-red-500 text-sm ml-3 py-1.5 rounded-lg px-5' onClick={handleEdit}>Edit</button>:<div className="icons flex items-center ml-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-4 cursor-pointer" onClick={() => {
        setEditId(el._id)
        setEditInput(el.name)
      }}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={() => {
        handleDelete(el._id)
        }}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
</svg>

      </div>}
      </div>) : ""}
      </div>
    </div>
    </div>
    ) : <AddCategory />
  )
}

export default CategoriesAdmin