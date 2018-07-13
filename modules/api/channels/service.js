class ChannelsService {

    constructor(req) {
      this.req = req;
      this.Channel = req.models.Channel;
    }

    channelsIndex(data) {
      return this.Channel.find().populate({path: 'members', select: 'name email'})
    }
}

module.exports = ChannelsService;