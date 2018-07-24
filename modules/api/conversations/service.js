const mongoose = require('mongoose')
class ConversationsService {

    constructor(req) {
      this.req = req;
      this.Conversation = req.models.Conversation;
    }

    conversationsCreate(data) {
      console.log('new convo data', data)
      return this.Conversation.create(data);
    }

    validateConversationCreate(data) {
      if (!data.message) {
        return { error: "Message can't be blank" };
      }
      if (!data.channelId) {
        return { error: "Channel can't be blank" };
      }
      if (!data.userId) {
        return { error: "User can't be blank" };
      }
      return true;
    }
}

module.exports = ConversationsService;