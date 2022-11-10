import * as React from 'react'
import { useAppSelector } from '../hooks/redux'
import '../styles/pages.scss'

const FavouritesPage = () => {
    const {favourites} = useAppSelector(state => state.github)

    if (favourites.length === 0) return <p className="text--center">No items.</p>

    return (
        <div className='favourites'>
            <ul>
                { favourites.map(f => (
                    <li key={f}>
                        <a href={f} target="_black">{f}</a>
                    </li>
                )) }
            </ul>
        </div> 
    )
}
 
export default FavouritesPage