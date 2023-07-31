import { Body } from "./components/Body"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import React, { useEffect, useState } from "react"

export interface ActionProps {
    setUsername:React.Dispatch<React.SetStateAction<string>>,
    searchUsers:Function,
    searchResults:SearchResults,
    searchProfile:Function,
    setProfile:React.Dispatch<React.SetStateAction<object>>,
    profile:object,
}
export type SearchResults = {
    items?:UserProp[]
}
export type UserProp = {
  avatarLink:string,
  username:string,
  accountUrl:string,
  searchProfile?:Function,
}

function App() {
  const [profile , setProfile] = useState({});
  const [username,setUsername] = useState("");
  const [data, setData ] = useState({});

  const getDefaultUsers = async ()=>{
    const items:any = await fetch(`https://api.github.com/users`)
    .then(res=>res.json())
    .catch(err=>console.log(err));
    
    setData({items});
    setProfile({})
   }

  const searchUsers:Function = async () => {
      if(username.trim() === ""){
        return getDefaultUsers();
      }
      const result:any = await fetch(`https://api.github.com/search/users?q=${username}`)
      .then(res=>res.json())
      .then(data=>{return data})
      .catch(err=>console.log(err));
      
      setData(result);
      setProfile({})
  }

  useEffect(()=>{
     getDefaultUsers();
  },[])

  return (
    <div className="shadow-md shadow-zinc-600 lg:w-1/2 sm:w-full  m-auto h-screen grid grid-flow-row ">
      <Header setUsername={setUsername} searchUsers ={searchUsers} setProfile={setProfile}/>
       {data && <Body searchResults={data} setProfile={setProfile} profile={profile}/>}
      <Footer/>
    </div>
  )
}

export default App
