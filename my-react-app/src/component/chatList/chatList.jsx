import './chatList.css';
import Search from '../../UI/Search/Search';
import { useChat } from '../../Context/ChatContext';

const ChatList = () => {

    const { activeChat, setActiveChat, conversations, setShowChatWindow } = useChat();

    const getInitials = (name) => {
        if (!name) return '??';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleChatClick = (chat) => {
        setActiveChat(chat);
        setShowChatWindow(true);
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
                {conversations.length === 0 ? (
                    <div className='empty-chats'>
                        <div className='empty-chats-icon'>
                            <ion-icon name="chatbubbles-outline"></ion-icon>
                        </div>
                        <p className='empty-chats-text'>No conversations yet</p>
                        <p className='empty-chats-subtext'>Search for users to start chatting</p>
                    </div>
                ) : (
                    <ul>
                        {conversations.map(chat => (
                            <li 
                                key={chat._id} 
                                className={`chat-item ${activeChat?._id === chat._id ? 'active' : ''} ${chat.unread > 0 ? 'unread' : ''}`}
                                onClick={() => handleChatClick(chat)}
                            >
                                <div className='chat-avatar'>
                                    {chat.avatar ? (
                                        <img src={chat.avatar} alt={chat.name} />
                                    ) : (
                                        <div className='avatar-initials'>
                                            {getInitials(chat.name)}
                                        </div>
                                    )}
                                </div>
                                {chat.online && <div className='online-indicator'></div>}
                                
                                <div className='chat-info'>
                                    <div className='chat-header'>
                                        <span className='chat-name'>{chat.name}</span>
                                        <span className='chat-time'>{chat.time}</span>
                                    </div>
                                    <div className='chat-preview'>
                                        <span className='chat-last-message'>{chat.lastMessage || 'No messages yet'}</span>
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