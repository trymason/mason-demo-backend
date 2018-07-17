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

  channelsConversationsCreate(req, res) {
    const service = new Service(req);
    const validatedConversation = service.validateConversationCreate(req.body);
    if (validatedConversation.error) {
      return res.json({ error: validatedConversation.error });
    }

    const sanitizedRequest = {
      message: _.trim(req.body.message),
      channelId: req.body.channelId,
    };

    const create = data => {
      service.channelsConversationsCreate(data)
      .then(channel => {
        res.status(201).send(channelResponse(channel));
      })
      .catch(err => {
        res.status(401).json({ error: `Error persisting message: ${err}` });
      });
    };
    create(sanitizedRequest);
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
