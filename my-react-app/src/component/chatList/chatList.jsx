import './chatList.css'
import Search from '../../UI/Search/Search'

const ChatList = () => {

    const chats = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Developers Group" }
    ]

    return (
        <div className='chat-list-container'>
            <Search />
            <h3>Messages</h3>

            <div>
                <ul>
                    {chats.map(chat => (
                        <li key={chat.id}>
                            {chat.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ChatList;