const _ = require('lodash');
const Service = require('./service');



class ChannelsController {
  channelsIndex(req, res) {
    const service = new Service(req);
    service.channelsIndex()
    .then(result => {
      if (result.error) {
        return res.status(400).json({ error: result.error });
      } else {
        return res.status(201).send((result));
      }
    });
  }
}

module.exports = new ChannelsController;
