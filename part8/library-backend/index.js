const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const { v1: uuid } = require('uuid')
const Author = require('./models/Author')
const User = require('./models/User')
const Book = require('./models/Book')

const url = "mongodb+srv://stefano_fullstack:helsinki@cluster0.z5bwd.mongodb.net/phonebook_app?retryWrites=true&w=majority"
const JWT_SECRET = "supersecret" // both should not be here

mongoose.connect(url)
.then(() => {
  console.log('connected to MongoDB')
})
.catch( err => {
  console.error('error connecting to MongoDB', err.message)
})

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }
  type Book {
    title: String!
    published: Int! 
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    authorCount: Int!
    countBooks(author: String): Int!
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    me: User
  }
  type Mutation {
    addBook (
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ) : Book
    updateBirthyear (
      name: String!
      born: Int!
    ) : Author
    createUser (
      username: String!
      favoriteGenre: String!
    ) : User
    login (
      username: String!
      password: String!
    ) : Token
  }
  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments,
    allBooks: async (root, args) => { // which is bookCount
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        const booksByAuthor = await Book.find({ $and: [{
          author: { $in: author.id },
          genre: { $in: args.genre }
        }]
      }).populate("author")
      console.log("IN ALLBOOKS", booksByAuthor)
        return booksByAuthor
      }

      else if (args.author) {
        const author = await Author.findOne({ name: args.author })

        const booksByAuthor = await Book.find({ author: { $in: author.id } }).populate("author")
        console.log("IN ALLBOOKS", booksByAuthor)
        return booksByAuthor
      }

      else if (args.genre) {
        const books = await Book.find({ genres: { $in: args.genre } }).populate("author")
        console.log("IN ALLBOOKS", books)
        return books
      }
      else
        return Book.find({}).populate("author")
    },
    allAuthors: async () => {
      const allAuthors = await Author.find({})
      const allAuthorsWithBookCount = allAuthors.map((author) => {
        return {
          name: author.name,
          born: author.born,
          bookCount: author.books.length,
          id: author._id
      }
      })
      return allAuthorsWithBookCount // populate bookcount?
    },
    countBooks: (root, args) => Book.collection.countDocuments,
    me: (root, args, {currentUser}) => {
      return currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, {currentUser}) => {

      let book // outside, or else it can't be returned

      try { 
      if (!currentUser)
        return null
      
      let author = await Author.findOne({ name: args.author })

      if (author) {
        book = new Book({ ...args, author: author._id })
        author.books = author.books.concat(book._id)
        await book.save()
        await author.save()
      }

      if (!author) {
        const newAuthor = new Author({
          name: args.author,
          born: null,
          bookCount: 1,
          books: args.book._id // DUNNO, check
        })
        await newAuthor.save()
        const newAuthorWithID = await Author.findOne({ name: args.author })
        book = new Book({ ...args, author: newAuthorWithID._id })
        await book.save()
      }
    } catch (error) {
      throw new UserInputError(error.message)
    }
      pubsub.publish('BOOK ADDED', { bookAdded: book })
      return book
    },
    updateBirthyear: async (root, args, {currentUser}) => {
      const author = await Author.findOne({ name: args.name })
      if (!currentUser || !author)
        return null
      
      author.born = args.born

      await author.save()

      return author
    },
    createUser: async (root, args) => {
      const user = new User(args.username, args.favoriteGenre)
      try {
        await user.save()
      } catch (error) {
        throw new UserInputError(error.message)
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== "root")
        throw new UserInputError("bad credentials")

      const tokenize = {
        username: user.username,
        id: user._id
      }

      const jwt_tokenized = jwt.sign(tokenize, JWT_SECRET)
      return {value: jwt_tokenized}
    }
    
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return currentUser
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})