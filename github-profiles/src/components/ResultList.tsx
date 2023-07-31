import { ActionProps } from "../App"
import { UserProp } from "../App";


export const ResultList = ({searchResults,searchProfile}:Partial<ActionProps>) => {
  return (
    <table className="w-full">
    <thead>
      <tr className="border-b border-b-zinc-800">
        <th>Avatar</th>
        <th>Username</th>
        <th>Profile</th>
      </tr>
    </thead>
    <tbody>
      {searchResults?.items?.map((user:any,key) => (
        <User key={key} username={user?.login} accountUrl={user?.url}
        avatarLink={user?.avatar_url} searchProfile={searchProfile}/>
      ))}
    </tbody>
  </table>
  )
}



const User = ({avatarLink,username,accountUrl ,searchProfile}:UserProp) =>{
  return (
    <tr className="text-center hover:bg-zinc-900" onClick={()=>searchProfile && searchProfile(accountUrl)}>
      <td className="p-3 flex justify-center items-center"><img className="w-10 h-10" src={avatarLink} alt={username} /></td>
      <td className="p-3 ">{username}</td>
      <td className="p-3 "><button className="text-indigo-300 hover:text-white"
       onClick={()=>searchProfile && searchProfile(accountUrl)}>See Profile</button></td>
    </tr>
  )
}
