const _ = require('lodash');
const AccessToken = require('twilio').jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class TwilioController {
  generateChatToken(request, response) {
    /*
    Generate an Access Token for a chat application user - it generates a random
    username for the client requesting a token, and takes a device ID as a query
    parameter.
    */
    const appName = 'TwilioChatDemo';
    const identity = ['tom','joe','steve']
    const randomIdentity = identity[getRandomInt(0,2)];
    console.log("randomIdentity", randomIdentity)
    const deviceId = request.query.device;

    // Create a unique ID for the client on their current device
    const endpointId = appName + ':' + randomIdentity + ':' + deviceId;

    // Create a "grant" which enables a client to use Chat as a given user,
    // on a given device
    const chatGrant = new ChatGrant({
      serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
    });

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET
    );
    token.addGrant(chatGrant);
    token.identity = randomIdentity;

    // Serialize the token to a JWT string and include it in a JSON response
    response.send({
      identity: randomIdentity,
      token: token.toJwt(),
    });

  }
}

module.exports = new TwilioController;