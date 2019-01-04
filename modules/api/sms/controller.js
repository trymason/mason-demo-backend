const _ = require('lodash');
const Service = require('./service');

const smsResponse = (sms) => ({ sms })

class SmsController {
  smsIndex(req, res) {
    const service = new Service(req);
    service.smsIndex()
    .then(result => {
      if (result.error) {
        return res.status(400).json({ error: result.error });
      } else {
        return res.status(200).send({
          data: _.forEach(result, (s) => (smsResponse(s)))
        });
      }
    });
  }

  smsCreate(req, res) {
    const service = new Service(req);
    const validatedSms = service.validateSmsCreateReq(req.body);
    if (validatedSms.error) {
      return res
      .status(400)
      .json({ error: validatedSms.error });
    }

    const sanitizedRequest = {
      message: _.trim(req.body.message),
      originatorPhone: _.trim(req.body.originatorPhone),
      recipientPhone: _.trim(req.body.recipientPhone),
      status: _.trim(req.body.status),
    };

    const create = data => {
      service.createSms(data)
      .then(sms => {
        res.status(201).send(smsResponse(sms));
      })
      .catch(err => {
        res.status(401).json({ error: `Error persisting sms: ${err}` });
      });
    };
    create(sanitizedRequest);
  }

}

module.exports = new SmsController;
