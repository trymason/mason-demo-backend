var mongoose = require("mongoose");

const SmsSchema = mongoose.Schema(
  {
    message: { type: String, required: true },
    originatorPhone: { type: String, required: true },
    recipientPhone: { type: String, required: true },
    status: { type: String, required: true },
  }, { timestamps: true }
);

const Sms = mongoose.model("Sms", SmsSchema);

module.exports = Sms;