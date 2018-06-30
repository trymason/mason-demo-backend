const User = require('../user');
module.exports = () => {

  // ----------------------------------------
  // Create Users
  // ----------------------------------------

  console.log('Creating Users');
  const users = [];
  users.push( new User({
    email: 'tom@trymason.com',
    password: '111111'
  }));
  users.push( new User({
    email: 'kareem@trymason.com',
    password: '111111'
  }));

  // ----------------------------------------
  // Finish
  // ----------------------------------------
  const promises = [];
  [ users ].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save());
    });
  });
  return Promise.all(promises);
};
