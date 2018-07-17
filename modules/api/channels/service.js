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
      return this.Channel.aggregate([
        { $match: { '_id': mongoose.Types.ObjectId(this.req.params.channelId) }},
        { $lookup: {
            from: 'conversations',
            localField: '_id',
            foreignField: 'channelId',
            as: 'convos'
          }
        },
        { $project: {
          "_id": 1,
          "createdAt": 1,
          "name": 1,
          "visibility": 1,
          "members": 1,
          "convos.createdAt": 1,
          "convos.updatedAt": 1,
          "convos.userId": 1,
          "convos.message": 1
        }}
      ])
    }
}

module.exports = ChannelsService;