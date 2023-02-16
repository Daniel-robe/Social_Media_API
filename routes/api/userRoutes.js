const { getUsers, createUser, getUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/userController');

const router = require('express').Router();

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)

module.exports = router;