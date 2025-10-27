import { useState } from 'react';
import './chatWindow.css';
import profile from '../../assets/profile.jpg'

const ChatWindow = () => {

    const [message, setMessage] = useState('');
    // const [chat, setChat] = useState([])

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = () => {
        // The message logic will be here
    }


    return (
        <div className='chat-window-main-container'>

            <div className='chat-window-header'>
                <div className='cw-profile'>
                    <img src={profile} alt={profile} className='prof-photo'/>
                    <span>
                        <p className='userName-display'>Glory Acheme</p>
                        <p className='online'>online</p>
                    </span>
                </div>

                <div className='cw-call'>
                    <button className='call'><ion-icon name="call-outline"></ion-icon></button>
                    <button className='call'><ion-icon name="videocam-outline"></ion-icon></button>
                </div>
            </div>

            <div className='message-input-send-button'>
                    <input
                        type="text" 
                        placeholder='Message...'
                        value={message}
                        onChange={(e) => handleChange(e)}
                        className='message-input'
                    />

                <button
                    onClick={sendMessage}
                    className='send-btn'
                >
                    <ion-icon name="send-outline"></ion-icon>
                </button>
            </div>


            <p>{message}</p>
        </div>
    )
}

export default ChatWindow;