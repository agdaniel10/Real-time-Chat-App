import { useState } from 'react';
import './Search.css';

const Search = () => {

    const [searchInput, setSearchInput] = useState('')

    const handleInputChange = (e) => {
        setSearchInput(e.target.value)
    }


    return (
        <div className='search-container'>
            <span
                className='search-icon'
            >
                <ion-icon name="search-outline"></ion-icon>
            </span>
            <input 
                type="text" 
                placeholder='Search...'
                value={searchInput}
                onChange={(e) => handleInputChange(e)}
                className='search-input'
            />
        </div>
    )
}

export default Search;