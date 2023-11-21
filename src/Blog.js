import React from "react";
import { useQuery } from "react-query";


function fetcher (url) {
    return fetch(url).then(res=>res.json())
  }

const Post= ({postID,goBack}) =>{

    const {isLoading,data}=useQuery(['blog',postID],()=>fetcher(`https://jsonplaceholder.typicode.com/posts/${postID}`),{
        staleTime:1000
    })

    console.log(data)
    
    if(isLoading){
        return <h1>Loading...</h1>
    }

    return <div>
      <a href="#" onClick={goBack}>go back </a> 
    <h1> Iam in {postID} </h1>
     <h2> Title-  {data.title}</h2>
    <p>{data.body}</p> 
    
    </div>
}

export default Post