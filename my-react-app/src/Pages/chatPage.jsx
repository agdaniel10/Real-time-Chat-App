import ChatList from '../component/chatList/chatList';
import ChatWindow from '../component/chatWindow/chatWindow';
import './chatPage.css';
import { chats } from '../Data/chats';

const ChatPage = () => {

    return (
        <div className='chatPage-container'>
            <ChatList />
            <ChatWindow />
        </div>
    )
}

export default ChatPage;