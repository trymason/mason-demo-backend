module.exports = () => {

  // ----------------------------------------
  // Create Users
  // ----------------------------------------
  console.log('Creating Users')
  let users = []
  users.push( new User({
    fname: 'Tom',
    lname: 'Mclaughlin',
    email: 'tom@trymason.com',
    password: '111111',
    components: []
  }))
  users.push( new User({
    fname: 'Kareem',
    lname: 'Sabri',
    email: 'kareem@trymason.com',
    password: '111111',
    components: []
  }))

  // ----------------------------------------
  // Finish
  // ----------------------------------------
  let promises = [];
  [ users ].forEach(collection => {
    collection.forEach(model => {
      promises.push(model.save())
    })
  })
  return Promise.all(promises)
}
