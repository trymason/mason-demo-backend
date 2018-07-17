const _ = require('lodash');
const faker = require('faker');

const User = require('../user');
const Conversation = require('../conversation');
const Channel = require('../channel');

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports = () => {
  // ----------------------------------------
  // Create Users
  // ----------------------------------------

  console.log('Creating Users');
  const users = [];
  users.push( new User({
    email: 'tom@trymason.com',
    name: 'tom mclaughlin',
    password: '11111111',
    photoUrl: 'https://randomuser.me/api/portraits/men/4.jpg'
  }));
  _.times(10, (i) => {
    let fname = faker.name.firstName()
    let lname = faker.name.lastName()
    users.push( new User({
      name: `${fname} ${lname}`,
      email: `${fname}_${lname}@trymason.com`,
      password: '11111111',
      photoUrl: `https://randomuser.me/api/portraits/men/${i+5}.jpg`
    }));
  });
  _.times(10, (i) => {
    let fname = faker.name.firstName()
    let lname = faker.name.lastName()
    users.push( new User({
      name: `${fname} ${lname}`,
      email: `${fname}_${lname}@trymason.com`,
      password: '11111111',
      photoUrl: `https://randomuser.me/api/portraits/women/${i+5}.jpg`
    }));
  })
  // ----------------------------------------
  // Create Channels
  // ----------------------------------------

  console.log('Creating Public Channels');
  const channels = [];
  _.forEach(['general', 'random', 'product', 'engineering'], (name) => {
    channels.push( new Channel({
      name,
      visibility: 'public'
    }))
  })

  // ----------------------------------------
  // Finish
  // ----------------------------------------
  const conversations = [];
  console.log('Adding conversations for all users')
  _.forEach(users, (user) => {
    _.times(20, () => {
      // Add conversations in random channels to all users
      // Put these conversations into one of the 4 randomly created channels
      const channel = channels[Math.floor(Math.random() * 3) + 0]
      conversations.push( new Conversation({
        channelId: channel._id,
        message: faker.lorem.sentence(),
        userId: user._id,
        createdAt: randomDate(new Date(2018, 6, 1), new Date())
      }))
      channel.members = _.uniq(_.concat(channel.members, user._id))
    })
  })

  const promises = [];
  [ users, channels, conversations ].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};
