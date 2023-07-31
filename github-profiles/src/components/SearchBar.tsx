import { LiaSearchSolid } from 'react-icons/lia'
import { ActionProps } from '../App'

export const SearchBar = ({setUsername,searchUsers}:Partial<ActionProps>) => {
    return (
        <div className="bg-zinc-800 lg:w-1/2 m-auto p-2 mt-3 rounded-full grid grid-flow-col h-11">
            <button onClick={()=> searchUsers && searchUsers()}
             className='flex items-center justify-center col-span-1 w-full h-full'>
                <LiaSearchSolid size={20} />
            </button>

            <input onChange={(e)=>setUsername && setUsername(e.target.value)}
            className="col-span-11 w-full h-full bg-transparent 
         text-center text-white outline-none" type="text" placeholder="Search a user" />
        </div>
    )
}
