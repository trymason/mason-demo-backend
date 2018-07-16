const _ = require('lodash');
const Service = require('./service');

const channelResponse = (channel) => ({ channel: channel.getPublicObject() })

class ChannelsController {
  channelsIndex(req, res) {
    const service = new Service(req);
    service.channelsIndex()
    .then(result => {
      if (result.error) {
        return res.status(400).json({ error: result.error });
      } else {
        return res.status(200).send({
          data: _.forEach(result, (c) => (channelResponse(c)))
        });
      }
    });
  }
}

module.exports = new ChannelsController;
