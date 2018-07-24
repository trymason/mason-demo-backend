const mongoose = require('mongoose')
class ChannelsService {

    constructor(req) {
      this.req = req;
      this.Channel = req.models.Channel;
      this.Conversation = req.models.Conversation;
    }

    channelsIndex(data) {
      return this.Channel.find().populate({path: 'members', select: 'name email'})
    }

    channelsShow(data) {
      return this.Channel.find({ _id: this.req.params.channelId })
    }

    createChannel(data) {
      return this.Channel.create(data);
    }

    channelsConversationsIndex(data) {
      return this.Conversation.find({ channelId: this.req.params.channelId }).populate({ path: 'userId', select: 'name photoUrl'}).sort({ 'name': 1 })
    }

    channelsConversationsCreate(data) {
      return this.Conversation.create({ channelId: this.req.params.channelId, ...data });
    }

    validateConversationCreate(data) {
      if (!data.message) {
        return { error: "Message can't be blank" };
      }
      return true;
    }

    validateChannelCreateReq(data) {
      if (!data.name) {
        return { error: "You must provide a name." };
      }

      if (data.name.length > 22) {
        return { error: "Name must be fewer than 22 characters long." }
      }

      if (data.name.match(/[\.\sA-Z]/)) {
        return { error: "Name must be lowercase, without spaces or periods, and shorter than 22 characters." }
      }

      return true;
    }
}

module.exports = ChannelsService;