 import { useContext, useEffect } from "react";
 import { useParams,Link } from "react-router-dom";
import DataContext from "./context/DataContext";

 const EditPost =  () =>{

  const {posts,handleEdit,editBody,setEditBody,editTitle,setEditTitle} =useContext(DataContext)

  
    const {id} = useParams()
    for(var i=0;i<posts.length;i++){
      const p_id=(posts[i].id).toString()
      if (p_id===id){
          var post= posts[i]
          var editPostTitle = posts[i].title
          var editPostBody = posts[i].body
      }
    }
    useEffect(() =>{
      setEditTitle(editPostTitle)
      setEditBody(editPostBody)
    },[post,setEditBody,setEditTitle])
     
    return (
      <main className="NewPost">
        {editTitle &&
          <>
            <h2>Edit Post</h2>
            <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="postTitle">Title:</label>
                <input 
                  id="postTitle"
                  type="text" 
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <label htmlFor="postBody">Post:</label>
                <textarea 
                  id="postBody"
                  required
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                />
                <button type="submit" onClick={()=> handleEdit(post.id)}>Submit</button>
            </form>
          </>
        }
        {!editTitle &&
          <>
            <h2>Post Not Found</h2>
            <p>Well thts disappointing</p>
            <Link to='/'>Visit the homepage</Link>
          </>
        }
        </main>
    )
 }

 export default EditPost