import * as React from 'react' 
import { Link } from 'react-router-dom'
import '../styles/navigation.scss'

const Navigation = () => {
    return (
        <nav className='navigation'>
            <h3>Github Search</h3>
            
            <span className='navigation__links'>
                <Link to="/">Home</Link>
                <Link to="/favourites">Favourites</Link>
            </span>
        </nav>
    )
}
 
export default Navigation