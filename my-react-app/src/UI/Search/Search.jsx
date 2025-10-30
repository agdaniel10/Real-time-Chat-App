import { useEffect, useState } from 'react';
import axios from 'axios'
import './Search.css';
import { useChat } from '../../Context/ChatContext';

const Search = () => {

    const {activeChat, setActiveChat} = useChat()

    const BASE_URL = import.meta.env.VITE_API_BACKEND || "http://localhost:3000";

    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)

    useEffect(() => {
        if (searchInput.trim() === '') {
            setSearchResults([]);
            setHasSearched(false);
            return;
        }

        setLoading(true);
        const delaySearch = setTimeout(() => {
            performSearch(searchInput);
        }, 300); 

        return () => clearTimeout(delaySearch);
    }, [searchInput]); 

    const performSearch = async (value) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/api/users/searchUserName?userName=${encodeURIComponent(value)}`
            )

            const result = response.data?.data
            setSearchResults(Array.isArray(result) ? result : []);
            setHasSearched(true);
        } catch (error) {
            console.error('Search error: ', error);
            setSearchResults([]);
            setHasSearched(true);
        } finally {
            setLoading(false);
        }
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        
        if (value.trim() !== '') {
            setLoading(true);
        }
    }

    const handleUserClick = (user) => {
        console.log('Selected user:', user);
        
        const chatData = {
            id: user._id,
            name: user.userName, 
            avatar: user.profileImage, 
            online: true, 
            lastMessage: '',
            time: 'Now',
            unread: 0
        };
        
        setActiveChat(chatData);
        setSearchInput(''); 
        setSearchResults([]); 
    }

    return (
        <div className='search-main-container'>
            <div className='search-container'>
                <input 
                    type="text" 
                    placeholder='Search or start a new chat'
                    value={searchInput}
                    onChange={handleInputChange}
                    className='search-input'
                />
                <span className='search-icon'>
                    <ion-icon name="search-outline"></ion-icon>
                </span>
            </div>

            {loading && (
                <div className='search-loading'>
                    <div className='loading-spinner'></div>
                    <span>Searching...</span>
                </div>
            )}

            {!loading && hasSearched && searchResults.length === 0 && searchInput.trim() !== '' && (
                <div className='no-results'>
                    <div className='no-results-icon'>
                        <ion-icon name="person-outline"></ion-icon>
                    </div>
                    <p className='no-results-text'>No users found for "{searchInput}"</p>
                </div>
            )}

            <div className='search-results'>
                {searchResults.map((user) => (
                    <div 
                        key={user._id} 
                        className={`user-item ${activeChat?.id === user._id ? 'active' : ''}`}
                        onClick={() => handleUserClick(user)}
                    >
                        <img 
                            src={user.profileImage || 'https://via.placeholder.com/45'} 
                            alt={user.userName}
                            className='user-avatar'
                        />
                        <div className='user-info'>
                            <span className='user-name'>{user.userName}</span>
                            <span className='user-status'>Click to start chatting</span>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Search;