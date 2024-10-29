import { createContext,useEffect,useState } from "react";
import {format} from 'date-fns'
import useWindowSize from '../hooks/useWindowSize'
import useFetchData from '../hooks/useFetchData'
import api from "../api/apiposts";
import { useNavigate } from "react-router-dom";

const DataContext = createContext({})

export const DataProvider = ({children}) => {

    const [posts ,setPosts] = useState([])
    const [search,setSearch]=useState('')
    const [searchResults,setSearchResults] = useState([])
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')
    const {width} = useWindowSize()
    const { data , fetchError , isLoading } = useFetchData('http://localhost:3500/posts')
    const navigate=useNavigate()
  
    useEffect(()=>{
      setPosts(data)  //rendering post using useFetch custom hook
    },[data])
  
  
    // useEffect(() => {
    //   const fetchPosts = async () => {
    //     try {
    //       const response = await api.get('/posts');
    //       setPosts(response.data)
    //     }
    //     catch(err){
    //       if(err.response){
    //         console.log(err.data)
    //         console.log(err.status)
    //         console.log(err.headers)
    //       }
    //       else {
    //       console.log(`Error:${err.message}`)
    //       }
    //     }
    //   }
    //   fetchPosts();
    // },[])
  
    useEffect(() => {
      const filteredResults =posts.filter((post) => 
          ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
          ((post.title).toLowerCase()).includes(search.toLowerCase()))
      setSearchResults(filteredResults.reverse())
    },[posts,search])
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const id = (posts.length ? posts[posts.length-1].id+1 : 1).toString()
      const datetime = format(new Date(),'MMM dd, yyyy pp')
      const newPost = { id,title:postTitle,datetime, body:postBody}
      try{
        const response = await api.post('/posts',newPost)
        const allPosts =[...posts,response.data]
        setPosts(allPosts)
        setPostTitle('')
        setPostBody('')
        navigate('/')
      }
      catch(err){
        console.log(`Error:${err.message}`)
      }
    }
  
      const handleEdit = async (id) => {
      const datetime = format(new Date(),'MMM dd, yyyy pp')
      const updatePost = {id,title:editTitle,datetime, body:editBody}
      try {
          const response = await api.put(`/posts/${id}`,updatePost)
          setPosts(posts.map(post => post.id===id ? {...response.data} : post))
          setEditTitle('')
          setEditBody('')
          navigate('/')
      }
      catch(err){
        console.log(`${err}`)
      }
    }
  
    const handleDelete = async (id) => {
      try{
        await api.delete(`/posts/${id}`)
        const postsList = posts.filter(post => post.id!==id)
        setPosts(postsList)
        navigate('/')
      }
      catch(err){
        console.log(`Error:${err.message}`)
      }
  
    }
    return (
        <DataContext.Provider value={{
            width,search,setSearch,searchResults,fetchError,isLoading,handleSubmit,postTitle,setPostTitle,postBody,setPostBody,posts,handleDelete,handleEdit,editBody,setEditBody,editTitle,setEditTitle
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext