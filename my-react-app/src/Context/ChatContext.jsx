import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [activeChat, setActiveChat] = useState(null);
    const [showChatWindow, setShowChatWindow] = useState(false);
    const [conversations, setConversations] = useState([])

    const addConversations = (newChat) => {
        const chatExists = conversations.some(chat => chat.id === newChat.id);
        
        if (!chatExists) {
            setConversations(prev => [newChat, ...prev])
        }
    };

    return (
        <ChatContext.Provider value={{ 
            activeChat, 
            setActiveChat, 
            showChatWindow,
            setShowChatWindow,
            conversations,
            setConversations,
            addConversations
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