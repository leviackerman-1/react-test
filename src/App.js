import { useState } from "react";
import React from "react";
import {Header1,About} from "./header";
import { BrowserRouter,Route,Link,Routes, useFetcher } from "react-router-dom";
import {useQuery, useMutation, isError} from 'react-query'
import "./App.css"
import Post from "./Blog";
import client from "./react-queryclient";


const fetcher = (url,body)=> fetch(url,{
  method: 'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body: JSON.stringify(body)
})




function App() {

  const [tempLang,setTemp]= useState('')

  const mutation = useMutation((body)=>fetcher(`/api/add-record`,body),{
    onSuccess(data){
      console.log('Got response from the backend',{data})
      setTemp('')
      client.invalidateQueries('favLangs')
    },
    onError(error){
      console.log('Got error from backend',{error})
    }
  })



  const {data: favLangs,isLoading,isError} = useQuery('favLangs',()=>{
    return fetch('/api/get-records').then(t=>t.json())
  },{
    select: data => data.lang
  })

  function callMutation(){
    console.log("About to call Mutation")
    mutation.mutate({record:tempLang })
    console.log("mutation called")
  
  }

  if(isLoading){
    return <p>Loading ...</p>
  }
  
  if(isError){
      return <p> Error with request</p>
  }
  
  return  <div className="App" >
  
       
      <h1>Some fav languages</h1>
      {favLangs.map(lang =>{
        return <li key={lang}>{lang}</li>
      })}
      <div>
      <input className="bg-teal-500"type="text" value={tempLang} onChange={e=>setTemp(e.target.value)}></input>
      </div>
      <p onClick={callMutation}>Sumbit</p>
        


    </div>
      
}

export default App;
