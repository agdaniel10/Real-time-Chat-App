import { useEffect, useState } from 'react';
import './chatWindow.css';
import socket from '../../socket';
import { useChat } from '../../Context/ChatContext';


const ChatWindow = () => {

    const { activeChat } = useChat()

    const [message, setMessage] = useState('');
    const [chats, setChats] = useState([]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            if (data.senderId !== socket.id) {
                setChats(prev => [...prev, { ...data, isSender: false }]);
            }
        });

        return () => {
            socket.off('receive_message');
        };
    }, []);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        const container = document.querySelector('.chat-messages-container');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [chats]);

    const sendMessage = () => {
        if (message.trim()) {
            const data = { text: message, senderId: socket.id };
            setChats(prev => [...prev, { ...data, isSender: true }]);
            socket.emit("send_message", data);
            setMessage('');
        }
    };

    const getInitials = (name) => {
        if (!name) return '??';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Show placeholder when no chat is selected
    if (!activeChat) {
        return (
            <div className='chat-window-main-container'>
                <div className='no-chat-selected'>
                    <div className='no-chat-icon'>
                        <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                    </div>
                    <h3>Select a chat to start messaging</h3>
                    <p>Choose a conversation from the list or start a new one</p>
                </div>
            </div>
        );
    }

    return (
        <div className='chat-window-main-container'>
            <div className='chat-window-header'>
                <div className='cw-profile'>
                    <div className='prof-photo-container'>
                        {activeChat.avatar ? (
                            <img src={activeChat.avatar} alt={activeChat.name} className='prof-photo'/>
                        ) : (
                            <div className='prof-photo prof-initials'>
                                {getInitials(activeChat.name)}
                            </div>
                        )}
                        {activeChat.online && <div className='header-online-indicator'></div>}
                    </div>
                    <span>
                        <p className='userName-display'>{activeChat.name || 'Unknown'}</p>
                        <p className='online'>{activeChat.online ? 'online' : 'offline'}</p>
                    </span>
                </div>
            </div>

            <div className='chat-messages-container'>
                {chats.map((chat, index) => (
                    <div 
                        key={index} 
                        className={`chat-message ${chat.isSender ? 'sender' : 'receiver'}`}
                    >
                        <p>{chat.text}</p>
                    </div>
                ))}
            </div>

            <div className='message-input-send-button'>
                <input
                    type="text"
                    placeholder='Message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className='message-input'
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />

                <button onClick={sendMessage} className='send-btn'>
                    <ion-icon name="send-outline"></ion-icon>
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;