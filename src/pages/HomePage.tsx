import React, { useEffect, useState } from 'react'
import RepoCard from '../components/RepoCard'
import { useDebounce } from '../hooks/debounce'
import { useSearchUsersQuery, useLazyGetUserReposQuery } from '../store/github/github.api'
import '../styles/pages.scss'

const HomePage = () => {
    const [search, setSearch] = useState('')
    const debounced = useDebounce(search)
    const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true,
    })
    const [fetchRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery()

    useEffect(() => {

    }, [debounced])

    const clickHandler = (username: string) => {
        fetchRepos(username)
    }

    return (
        <div className="home">
            { isError ? <p className='text--error'>Something went wrong...</p> : null }
            
            <div className='dropdown'>
                <input 
                    type="text"
                    className="dropdown__input"
                    placeholder="Search for Github username..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <ul className="dropdown__list">
                    { isLoading ? <p className='text--center'>Loading...</p> : null }
                    { data?.map(user => (
                        <li 
                            key={user.id}
                            onClick={() => clickHandler(user.login)}
                            className="dropdown__list-item"
                        >{ user.login }</li>
                    )) }
                </ul>

                <div className="container">
                    { areReposLoading ? <p className="text--center">Repos are loading...</p> : null }
                    { repos?.map(repo => <RepoCard key={repo.id} repo={repo}/>) }
                </div>
            </div>
        </div>
    )
}

export default HomePage