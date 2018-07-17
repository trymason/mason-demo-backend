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

    channelsConversationsIndex(data) {
      return this.Conversation.find({ channelId: this.req.params.channelId }).populate({ path: 'userId', select: 'name photoUrl'}).sort({ createdAt: -1 })
    }
}

module.exports = ChannelsService;