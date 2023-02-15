const { Thought, User } = require('../models');

const thoughtContoller = {

    getThoughts(req, res) {
        Thought.find()
        .then((dbThoughts) => {
            res.json(dbThoughts);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then((dbThought) => {
            if(!dbThought) {
                return res.status(404).json({message: 'No thought with this id was found'});
            }
            res.json(dbThought);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((dbThought) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: dbThought._id } },
                { new: true }
            );
        })
        .then((dbUser) => {
            if (!dbUser) {
                return res.status(404).json({ message: 'Thought created but no user was found with this id!' });
            }

            res.json({message: 'Thought created successfully'});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true})
        .then((dbThought) => {
            if(!dbThought){
                return res.status(404).json({message: 'No thought was found with this id'});
            }
            res.json(dbThought);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove({_id: req.params.thoughtId})
        .then((dbThought) => {
            if(!dbThought){
                return res.status(404).json({message: 'No thought was found with this id'});
            }
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
        })
        .then((dbUser) => {
            if (!dbUser) {
                return res.status(404).json({ message: 'Thought deleted but no user was found with this id!' });
            }

            res.json({message: 'Thought deleted successfully'});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((dbThought) => {
            if (!dbThought) {
              return res.status(404).json({ message: 'No thought was found with this id!' });
            }
            res.json(dbThought);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
      // remove reaction from a thought
      removeReaction(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true })
        .then((dbThought) => {
            if (!dbThought) {
                return res.status(404).json({ message: 'No thought was found with this id!' });
            }
            res.json(dbThought);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};

module.exports = thoughtContoller;
