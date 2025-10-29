import { useEffect, useState } from 'react';
import './chatWindow.css';
import profile from '../../assets/profile.jpg'
import socket from '../../socket';

const ChatWindow = () => {

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

    const sendMessage = () => {
        if (message.trim()) {
            const data = { text: message, senderId: socket.id };
            // Add to your own chat as sender
            setChats(prev => [...prev, { ...data, isSender: true }]);
            // Emit to socket without isSender flag
            socket.emit("send_message", data);
            setMessage('');
        }
    };

    return (
        <div className='chat-window-main-container'>
            <div className='chat-window-header'>
                <div className='cw-profile'>
                    <img src={profile} alt="profile" className='prof-photo'/>
                    <span>
                        <p className='userName-display'>Glory Acheme</p>
                        <p className='online'>online</p>
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