const listHelper = require('../utils/list_helper')

describe('dummy test that returns one', () => {
    test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
    })
})

describe('blog operations', () => {
    test('sum of likes', () => {
    const blogs = [
        {
          title: 'None',
          author: 'Edsger W. Dijkstra',
          likes: 5
        },
        {
            title: 'Buh',
            author: 'Edsger W. Dijkstra',
            likes: 5
          },
          {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
          },
          {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
          }
      ]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(27)
    })

    test('blog with most likes', () => {
    const blogs = [
        {
          title: 'None',
          author: 'Edsger W. Dijkstra',
          likes: 5
        },
        {
            title: 'Buh',
            author: 'Edsger W. Dijkstra',
            likes: 5
          },
          {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5
          },
          {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
          }
      ]

    const result = listHelper.maxLikes(blogs)
    expect(result).toEqual({
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      })
    })

    test('author with most likes', () => {
      const blogs = [
          {
            title: 'None',
            author: 'Arto Hellas',
            likes: 5
          },
          {
              title: 'Buh',
              author: 'Edsger W. Dijkstra',
              likes: 5
            },
            {
              title: 'Go To Statement Considered Harmful',
              author: 'Stefano Moscatelli',
              likes: 5
            },
            {
              title: "Canonical string reduction",
              author: "Edsger W. Dijkstra",
              likes: 12
            }
        ]
  
      const result = listHelper.topAuthorForLikes(blogs)
      expect(result).toEqual([
          "Edsger W. Dijkstra",
          17
        ])
      })

      test('author with most blogs', () => {
        const blogs = [
            {
              title: 'None',
              author: 'Arto Hellas',
              likes: 5
            },
            {
                title: 'Buh',
                author: 'Edsger W. Dijkstra',
                likes: 5
              },
              {
                title: 'Go To Statement Considered Harmful',
                author: 'Stefano Moscatelli',
                likes: 5
              },
              {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                likes: 12
              }
          ]
    
        const result = listHelper.topAuthorForBlogs(blogs)
        expect(result).toEqual([
            "Edsger W. Dijkstra",
            2
          ])
        })
})