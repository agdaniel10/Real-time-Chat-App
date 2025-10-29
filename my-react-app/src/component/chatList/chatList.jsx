import { useState } from 'react';
import './chatList.css';
import Search from '../../UI/Search/Search';

const ChatList = () => {

    const [activeChat, setActiveChat] = useState(null);

    const chats = [
        { 
            id: 1, 
            name: "John Doe",
            lastMessage: "Hey, how are you doing?",
            time: "2:30 PM",
            unread: 3,
            online: true,
            avatar: null // Will use initials
        },
        { 
            id: 2, 
            name: "Developers Group",
            lastMessage: "Alice: Check out this new feature!",
            time: "1:45 PM",
            unread: 0,
            online: false,
            avatar: null
        },
        { 
            id: 3, 
            name: "Sarah Johnson",
            lastMessage: "Thanks for your help yesterday 😊",
            time: "12:20 PM",
            unread: 0,
            online: true,
            avatar: null
        },
        { 
            id: 4, 
            name: "Team Meeting",
            lastMessage: "Bob: Meeting starts in 10 mins",
            time: "11:30 AM",
            unread: 5,
            online: false,
            avatar: null
        },
        { 
            id: 5, 
            name: "Mike Chen",
            lastMessage: "Sounds good! Let's do it",
            time: "Yesterday",
            unread: 0,
            online: false,
            avatar: null
        }
    ];

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleChatClick = (chatId) => {
        setActiveChat(chatId);
        // Add logic to open chat window
    };

    const handleNewChat = () => {
        console.log('Start new chat');
        // Add logic to start new chat
    };

    return (
        <div className='chat-list-container'>
            <div>
                <Search />
            </div>

            <div className='message-header'>
                <h2>Messages</h2>
            </div>
            
            <div className='chats-list'>
                {chats.length === 0 ? (
                    <div className='empty-chats'>
                        <div className='empty-chats-icon'>
                            <ion-icon name="chatbubbles-outline"></ion-icon>
                        </div>
                        <p className='empty-chats-text'>No conversations yet</p>
                        <p className='empty-chats-subtext'>Search for users to start chatting</p>
                    </div>
                ) : (
                    <ul>
                        {chats.map(chat => (
                            <li 
                                key={chat.id}
                                className={`chat-item ${activeChat === chat.id ? 'active' : ''} ${chat.unread > 0 ? 'unread' : ''}`}
                                onClick={() => handleChatClick(chat.id)}
                            >
                                <div className='chat-avatar'>
                                    {chat.avatar ? (
                                        <img src={chat.avatar} alt={chat.name} />
                                    ) : (
                                        getInitials(chat.name)
                                    )}
                                </div>
                                {chat.online && <div className='online-indicator'></div>}
                                
                                <div className='chat-info'>
                                    <div className='chat-header'>
                                        <span className='chat-name'>{chat.name}</span>
                                        <span className='chat-time'>{chat.time}</span>
                                    </div>
                                    <div className='chat-preview'>
                                        <span className='chat-last-message'>{chat.lastMessage}</span>
                                        {chat.unread > 0 && (
                                            <span className='unread-badge'>{chat.unread}</span>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ChatList;