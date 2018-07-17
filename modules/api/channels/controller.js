const _ = require('lodash');
const Service = require('./service');

const channelResponse = (channel) => {
  console.log('CHANNEL', channel)
  return ({ channel })
}

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

  channelsShow(req, res) {
    const service = new Service(req);
    service.channelsShow()
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

  channelsConversationsIndex(req, res) {
    const service = new Service(req);
    service.channelsConversationsIndex()
    .then(result => {
      console.log('result', result)
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
