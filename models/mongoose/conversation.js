var mongoose = require("mongoose");

const ConversationSchema = mongoose.Schema(
  {
    message: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
  }, { timestamps: true }
);

ConversationSchema.methods.getPublicObject = function() {
  return {
    id: this.id,
    message: this.message,
    userId: this.userId,
    channelId: this.channelId,
  };
};

const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = Conversation;