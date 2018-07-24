const _ = require('lodash');
const Service = require('./service');

const channelResponse = (channel) => ({ channel })

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

  channelsCreate(req, res) {
    const service = new Service(req);
    const validatedChannel = service.validateChannelCreateReq(req.body);
    if (validatedChannel.error) {
      return res
      .status(400)
      .json({ error: validatedChannel.error });
    }

    const sanitizedRequest = {
      name: _.trim(req.body.name),
      purpose: _.trim(req.body.purpose),
    };

    const create = data => {
      service.createChannel(data)
      .then(channel => {
        res.status(201).send(channelResponse(channel));
      })
      .catch(err => {
        res.status(401).json({ error: `Error persisting channel: ${err}` });
      });
    };
    create(sanitizedRequest);
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
