const _ = require('lodash');
const Service = require('./service');

const conversationResponse = (conversation) => ({ conversation })

class ConversationsController {
  conversationsCreate(req, res) {
    const service = new Service(req);
    const validatedConversation = service.validateConversationCreate(req.body);

    if (validatedConversation.error) {
      return res.json({ error: validatedConversation.error });
    }

    const sanitizedRequest = {
      message: _.trim(req.body.message),
      channelId: req.body.channelId,
      userId: req.body.userId,
    };

    const create = data => {
      service.conversationsCreate(data)
      .then(channel => {
        res.status(201).send(conversationResponse(channel));
      })
      .catch(err => {
        res.status(401).json({ error: `Error persisting message: ${err}` });
      });
    };
    create(sanitizedRequest);
  }
}

module.exports = new ConversationsController;
