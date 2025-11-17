import Message from "../Models/messageModel.js";

const chatHistory = async (req, res) => {
    const { user1, user2 } = req.params;

    try {
        const messages = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 } 
            ]
        }).sort({ timestamp: 1 });

        res.status(200).json({
            status: 'success',
            data: messages
        });

    } catch(error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ 
            status: 'error',
            error: 'Failed to load messages'
        });
    }
};

export default chatHistory;