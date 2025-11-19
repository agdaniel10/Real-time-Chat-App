import { useEffect, useState } from 'react';
import axios from 'axios';
import './chatWindow.css';
import socket from '../../socket';
import { useChat } from '../../Context/ChatContext';

const ChatWindow = () => {
    const authData = JSON.parse(localStorage.getItem('kela-app_auth'));
    const myUserId = authData?.user?._id;
    const token = authData?.token

    if (!myUserId) {
        console.error('User Id not found. Please login')
    }

    const { activeChat, showChatWindow, setShowChatWindow } = useChat();

    const [message, setMessage] = useState('');
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const VITE_API_BACKEND = import.meta.env.VITE_API_BACKEND || 'http://localhost:3000';

    useEffect(() => {
        if (myUserId) {
            socket.emit('register', myUserId);
        }
    }, [myUserId]);

    // Fetch chat history
    const chatHistoryData = async () => {
        if (!activeChat?._id || !myUserId) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `${VITE_API_BACKEND}/api/chat/chathistory/${myUserId}/${activeChat._id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data.status === 'success') {
                console.log(response.data.data)
                const formattedChats = response.data.data.map(msg => ({
                    ...msg,
                    isSender: msg.sender === myUserId
                }));
                setChats(formattedChats);
            }

        } catch(error) {
            console.error('Error loading chat history: ', error);
            setError(error.response?.data?.error || 'Failed to load chat history');
        } finally {
            setLoading(false);
        }
    };

    // Load chat history when activeChat changes
    useEffect(() => {
        if (activeChat?._id) {
            setChats([]);
            chatHistoryData();
        }
    }, [activeChat?._id]);

    useEffect(() => {


    const handleReceiveMessage = (data) => {

        const isForMe = String(data.receiver) === String(myUserId);
        const isFromActiveChat = String(data.sender) === String(activeChat);

        if (isForMe && isFromActiveChat) {
            setChats(prev => [
                ...prev,
                {
                    ...data, 
                    isSender: false
                }
            ])
        }
    }

    socket.on('receive_message', handleReceiveMessage);

    return () => {
        console.log('🔇 Removing receive_message listener');
        socket.off('receive_message', handleReceiveMessage);
    };
}, [activeChat?._id, myUserId]);

    // Auto-scroll
    useEffect(() => {
        const container = document.querySelector('.chat-messages-container');
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [chats]);

    const sendMessage = () => {
        if (message.trim() && activeChat) {

            const recieverId = activeChat._id || activeChat.id

            if (!recieverId) {
                console.error('Cannot send message: reciever ID not found')
                return
            }
            
            // CRITICAL CHECK
            if (activeChat._id === myUserId) {
                console.error('❌ BLOCKED: Attempting to send message to yourself!');
                alert('Error: Cannot send message to yourself. Please select a different user.');
                return; // EXIT EARLY
            }
    

            const data = {
                sender: myUserId,
                receiver: recieverId,
                text: message
            };

            console.log('Sending message:', data);

            setChats(prev => [...prev, {
                ...data,
                isSender: true,
                timestamp: new Date()
            }]);

            console.log("Sending message:", data);
            socket.emit('send_message', data);
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

    const handleBack = () => {
        setShowChatWindow(false);
    };

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
        <div className={`chat-window-main-container ${showChatWindow ? 'show-on-mobile' : ''}`}>
            <div className='chat-window-header'>
                <button className='back-btn' onClick={handleBack}>
                    <ion-icon name="arrow-back-outline"></ion-icon>
                </button>
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
                {loading && (
                    <div className='loading-messages'>Loading messages...</div>
                )}
                {error && (
                    <div className='error-messages'>{error}</div>
                )}
                {!loading && chats.map((chat, index) => (
                    <div 
                        key={chat._id || index}
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