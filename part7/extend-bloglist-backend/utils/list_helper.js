const blog = require('../models/blog')
const User = require('../models/user')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    
      return blogs.length === 0
        ? 0
        : blogs.reduce((sum, blog) => {
            return sum + blog.likes
        }, 0)
}

const maxLikes = (blogs) => {

    const likes = blogs.length === 0
    ? null
    : blogs.reduce((like, blog) => {
        return Math.max(like, blog.likes)
    }, 0)

    let finalBlog = 0
    
    blogs.forEach((blog, i) => {
        if (blog.likes === likes) {
            finalBlog = i
        }
    })

    return blogs[finalBlog]
}

const topAuthorForLikes = (blogs) => {
    const dict = {}

    blogs.forEach(blog => {
        dict[blog.author] === undefined
        ? dict[blog.author] = blog.likes
        : dict[blog.author] += blog.likes
    })
    
    let maxKey, maxValue = 0
    for (const [key, value] of Object.entries(dict)) {
        if (value > maxValue) {
            maxValue = value
            maxKey = key
        }
    }
    const newArray = []

    newArray.push(maxKey)
    newArray.push(maxValue)
    
    return newArray
}

const topAuthorForBlogs = (blogs) => {
    
    const dict = {}

    blogs.forEach(blog => {
        dict[blog.author] === undefined
        ? dict[blog.author] = 1
        : dict[blog.author] += 1
    })
    
    let maxKey, maxValue = 0
    for (const [key, value] of Object.entries(dict)) {
        if (value > maxValue) {
            maxValue = value
            maxKey = key
        }
    }
    const newArray = []

    newArray.push(maxKey)
    newArray.push(maxValue)
    
    return newArray
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    dummy,
    totalLikes,
    maxLikes,
    topAuthorForLikes,
    topAuthorForBlogs,
    usersInDb
}