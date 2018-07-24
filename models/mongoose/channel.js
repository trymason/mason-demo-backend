var mongoose = require("mongoose");

const ChannelSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    purpose: { type: String },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    visibility: { type: String, default: 'public' },
  }, { timestamps: true }
);

ChannelSchema.methods.getPublicObject = function() {
  return {
    id: this.id,
    name: this.name,
    purpose: this.purpose,
    members: this.members,
    visibility: this.visibility,
  };
};

const Channel = mongoose.model("Channel", ChannelSchema);

module.exports = Channel;