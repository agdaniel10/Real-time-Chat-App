import { useState } from 'react';
import './Search.css';

const Search = () => {

    const [searchInput, setSearchInput] = useState('')

    const handleInputChange = (e) => {
        setSearchInput(e.target.value)
    }


    return (

        <div className='search-main-container'>
            <div className='search-container'>
                <span
                    className='search-icon'
                >
                    <ion-icon name="search-outline"></ion-icon>
                </span>
                <input 
                    type="text" 
                    placeholder='Search or start a new chat'
                    value={searchInput}
                    onChange={(e) => handleInputChange(e)}
                    className='search-input'
                />
            </div>
         </div>
    )
}

export default Search;