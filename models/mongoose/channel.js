var mongoose = require("mongoose");

const ChannelSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    members: { type: Array },
    visibility: { type: String },
  }, { timestamps: true }
);

ChannelSchema.methods.getPublicObject = function() {
  return {
    id: this.id,
    name: this.name,
    members: this.members,
    visibility: this.visibility,
  };
};

const Channel = mongoose.model("Channel", ChannelSchema);

module.exports = Channel;