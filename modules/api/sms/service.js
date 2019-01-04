const mongoose = require('mongoose')
class SmsService {

    constructor(req) {
      this.req = req;
      this.Sms = req.models.Sms;
    }

    smsIndex(data) {
      return this.Sms.find().sort({ createdAt: 1 })
    }

    createSms(data) {
      return this.Sms.create(data);
    }

    validateSmsCreateReq(data) {
      if (!data.originatorPhone) {
        return { error: "You must provide a originatorPhone." };
      }

      if (!data.recipientPhone) {
        return { error: "You must provide a recipientPhone." };
      }

      if (!data.message) {
        return { error: "You must provide a message." };
      }

      return true;
    }
}

module.exports = SmsService;