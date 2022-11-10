import * as React from 'react'
import { useState } from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { IRepo } from '../models/models'
import '../styles/repo.scss'

const RepoCard = ({ repo }: { repo: IRepo }) => 
{
    const { addFavourite, removeFavourite } = useActions()
    const { favourites } = useAppSelector(state => state.github)

    const [isFav, setIsFav] = useState(favourites.includes(repo.html_url))

    const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        addFavourite(repo.html_url)
        setIsFav(true)
    }

    const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        removeFavourite(repo.html_url)
        setIsFav(false)
    }

    return (
        <a href={repo.html_url} target="_blank" className="repo">
            <h2 className="repo__name">{repo.full_name}</h2>
            <p className="repo__info">
                Forks: <span>{repo.forks}</span>
                Watchers: <span>{repo.watchers}</span>
            </p>
            <p className="repo__desc">{repo?.description}</p>

            { isFav ? 
                <button 
                    className="repo__control repo__control--danger"
                    onClick={(event) => removeFromFavourite(event)}
                >Remove</button> 
                : <button 
                    className="repo__control repo__control--success"
                    onClick={(event) => addToFavourite(event)}
                >Add</button> 
            }
        </a>
    )
}
 
export default RepoCard