import { ActionProps } from "../App"
import { Profile } from "./Profile"
import { ResultList } from "./ResultList"

export interface ProfileProps{
    login:string,
    name:string,
    avatar_url:string,
    following:number,
    followers:number,
    bio:string,
    location:string,
    public_repos:number
    repos_url:string,
    setProfile:Function,
}
export type Repository = {
    name:string,
}

export const Body = ({searchResults,setProfile,profile}:Partial<ActionProps>) => {

    const searchProfile = async (accountUrl:string) =>{
        const user = await fetch(accountUrl)
        .then(res=>res.json())
        .catch(err=>console.log(err));
        
        setProfile && setProfile(user);
    }

  return (
    <section className=" row-span-4 relative overflow-y-scroll ">
      {profile && Object.keys(profile).length > 0
       ? <Profile {...profile} />
        : <ResultList searchResults={searchResults} searchProfile={searchProfile}/> }
    </section>
  )
}
