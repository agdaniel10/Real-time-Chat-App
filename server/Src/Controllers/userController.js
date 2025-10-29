import catchAsync from '../Utils/catchAsync';
import User from '../Models/userModel';

// Search UserName
const searchUser = catchAsync(async (req, res, next) => {
    const { userName } = req.query;
    const currentUserId = req.user._id;

    if (!userName || userName.trim() === '') {
        return res.status(200).json({ status: 'success', results: 0, data: [] });
    }

    const users = await User.find({
        userName: { $regex: userName, $options: 'i' },
        _id: { $ne: currentUserId }
    })
    .select('userName profileImage _id')
    .limit(10);

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: users
    });
});;

export {searchUser};