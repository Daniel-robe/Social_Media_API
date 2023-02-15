const { User, Thought } = require('../models');

const userController = {
    getUsers(req, res) {
        User.find()
        .then((dbUsers) => {
            res.json(dbUsers);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getUser(req, res) {
        User.findOne({_id: req.params.userId})
        .populate('friends').populate('thoughts')
        .then((dbUser) => {
            if(!dbUser){
                return res.status(404).json({message: 'No user was found with this id'});
            }
            res.json(dbUser);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    createUser(req, res) {
        User.create(req.body)
        .then((dbUser) => {
            res.json(dbUser);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    updateUser(req, res) {
        User.findOneAndUpdate({_id: req.params.userId},
                              {$set: req.body},
                              {runValidators: true, new: true})
        .then((dbUser) => {
            if(!dbUser){
                return res.status(404).json({message: 'No user was found with this id'});
            }
            res.json(dbUser);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId})
        .then((dbUser) => {
            if(!dbUser){
                return res.status(404).json({message: 'No user was found with this id'});
            }
        })
        .then(() => {
            res.json({message: 'User deleted'})
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    addFriend(req, res) {
        User.findOneAndUpdate({_id: req.params.userId},
            {$addToSet: {friends: req.params.friendId}},
            {new: true})
        .then((dbUser) => {
            if(!dbUser){
                return res.status(404).json({message: 'No user was found with this id'});
            }
            res.json(dbUser);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    },

    removeFriends(req, res) {
        User.findOneAndUpdate({_id: req.params.userId},
            {$pull: {friends: req.params.friendId}},
            {new: true})
        .then((dbUser) => {
            if(!dbUser){
                return res.status(404).json({message: 'No user was found with this id'});
            }
        res.json(dbUser);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    }
};

module.exports = userController;