import Message from "../Models/messageModel.js";

export const saveMessage = async ({sender, receiver, text}) => {

    try {
        const message = new Message({sender, receiver, text, timestamp: new Date()})
        const save = await message.save()

        return save
    }catch (error) {
        console.error("Error saving message: ", error)
        return null
    }
};