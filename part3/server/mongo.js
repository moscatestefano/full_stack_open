const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String
  })
  
const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} else if (process.argv.length === 3) {
    const password = process.argv[2]
    const url =
    `mongodb+srv://stefano_fullstack:${password}@cluster0.z5bwd.mongodb.net/phonebook_app?retryWrites=true&w=majority`
  
  mongoose.connect(url)

  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else {
    const password = process.argv[2]
    const url =
    `mongodb+srv://stefano_fullstack:${password}@cluster0.z5bwd.mongodb.net/phonebook_app?retryWrites=true&w=majority`
  
  mongoose.connect(url)

  const person = new Person({
      name: process.argv[3],
      number: process.argv[4]
  })

  person.save().then(result => {
      console.log('person saved', person)
      mongoose.connection.close()
  })
}


/* const person = new Person({
  name: 'Bumblebee',
  number: '123-456789222'
}) */

/*person.save().then(result => {
  console.log('person saved!', result)
  mongoose.connection.close()
})*/