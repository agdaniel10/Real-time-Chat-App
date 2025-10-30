import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [activeChat, setActiveChat] = useState(null);
    const [chats, setChats] = useState([]);

    const addChat = (newChat) => {
        const chatExists = chats.some(chat => chat.id === newChat.id);
        
        if (!chatExists) {
            setChats(prev => [newChat, ...prev]);
        }
    };

    return (
        <ChatContext.Provider value={{ 
            activeChat, 
            setActiveChat, 
            chats, 
            setChats,
            addChat 
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within ChatProvider');
    }
    return context;
};