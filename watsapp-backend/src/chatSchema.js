const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  message: {
    type: String,
  },
  name: {
    type: String,
  },
  timestamp: {
    type: String,
  },
  received: {
    type: Boolean,
  },
});

const messageContent = mongoose.model("messageContent", chatSchema);

module.exports = messageContent;
