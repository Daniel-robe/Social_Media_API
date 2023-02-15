const {Schema, model} = require('mongoose');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionsSchema]
    },
    {
        toJSON: {
          getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(
    function() {
        return this.reactions.length;
    }
);

const Thought = model('Thought', thoughtSchema);