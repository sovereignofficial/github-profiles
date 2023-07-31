import { useEffect, useState } from "react"
import { ProfileProps } from "./Body"
import { MdStar } from "react-icons/md";
import { LiaEye } from "react-icons/lia";
export const Profile =
  ({ avatar_url, login, name, bio, location,
    followers, following, public_repos, repos_url }: Partial<ProfileProps>) => {
    return (
      <div>
        <ProfileId avatar_url={avatar_url} login={login} name={name} bio={bio} location={location}
          followers={followers} following={following} />
        <Repository public_repos={public_repos} repos_url={repos_url} />
      </div>
    )
  }

const ProfileId =
  ({ avatar_url, name, login, bio,
    location, followers, following }: Partial<ProfileProps>) => {

    return (
      <>
        <section className="grid grid-flow-col p-3">
          <div className=" col-span-1  items-center justify-center grid">
            <img className="lg:w-32 lg:h-32 sm:w-20 sm:h-20 rounded-full" src={avatar_url} />
          </div>
          <div className=" col-span-11 space-y-4  pl-10 ">
            <h2 className="font-medium text-lg">{login}</h2>
            <div className="flex gap-7">
              <div className="space-x-1">
                <span className="font-medium">{followers}</span>
                <span>Followers</span>
              </div>
              <div className="space-x-1">
                <span className="font-medium">{following}</span>
                <span>Following</span>
              </div>
            </div>
            <div className="space-y-1">
              <h3>{name}</h3>
              <p className="font-thin">{bio}</p>
              <p className="text-zinc-400">{location}</p>
            </div>
          </div>
        </section>
      </>
    )
  }

type Repo = {
  name: string,
  watchers_count: number,
  stargazers_count: number,
  html_url: string
}

const Repository = ({ public_repos, repos_url }: Partial<ProfileProps>) => {

  const [repositories, setRepositories] = useState<Repo[]>([]);

  const fetchRepos = async () => {
    const repos = await fetch(`${repos_url}`)
      .then(res => res.json())
      .catch(err => console.log(err));
    console.log(repos);
    setRepositories(repos);
  }
  useEffect(() => {
    fetchRepos();
  }, [])

  return (
    <section className="border-t border-zinc-800 space-y-3">
      <h2 className="ml-3 mt-3 font-medium text-xl">{public_repos} Public Repositories</h2>
      <table className="table-auto sm:w-1/2 lg:w-full m-auto ">
        <thead>
          <tr>
            <th className="px-4 py-2">Repository</th>
            <th className="px-4 py-2 "><div className="flex items-center gap-1">Watchers <LiaEye /></div> </th>
            <th className="px-4 py-2 flex items-center gap-1"><div className="flex items-center gap-1">Stars  <MdStar /></div> </th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            repositories.length > 0 ?
              repositories.map((item, index) =>
                <tr key={index}>
                  <td className="p-2 sm:text-sm lg:text-base">{item?.name}</td>
                  <td className="p-2 "><div className="flex items-center gap-1 sm:text-sm lg:text-base">{item?.watchers_count} <LiaEye /></div></td>
                  <td className="p-2 "><div className="flex items-center gap-1 sm:text-sm lg:text-base">{item?.stargazers_count} <MdStar /></div></td>
                  <td className="p-2 text-center">
                    <a target="_blank" href={item?.html_url}
                      className="text-blue-400 hover:text-blue-700 font-medium py-1 px-3 rounded sm:text-sm lg:text-base">
                      View on Github
                    </a>
                  </td>
                </tr>
              )
              : (
                <tr>
                  <td colSpan={4} className="border px-4 py-2">Couldn't find a public repository.</td>
                </tr>
              )
          }
        </tbody>
      </table>

    </section>
  )
}