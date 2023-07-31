import { SearchBar } from "./SearchBar"
import { ActionProps } from "../App"
export const Header = ({setUsername,searchUsers}:Partial<ActionProps>) => {
  return (
    <header className="row-span-1 text-center p-3">
        <h1 className="font-medium text-2xl">Github Profiles</h1>
        <SearchBar setUsername={setUsername} searchUsers={searchUsers}/>
    </header>
  )
}
