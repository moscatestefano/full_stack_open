import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('blog rendering tests', () => {

        test('renders content', () => {
        const blog = {
            title: "A fresh beginning",
            author: "Stefano Moscatelli",
            url: "http://127.0.0.1",
            likes: 0,
            userId: "65123322885g6nbc"
        }

        const component = render(
            <Blog blog={blog} />
        )

        const div = component.container.querySelector('.togglableContent')

        expect(div).toHaveStyle('display: none')
    })

    test('clicking the Details button once shows div', () => {
        const blog = {
            title: "A fresh beginning",
            author: "Stefano Moscatelli",
            url: "http://127.0.0.1",
            likes: 0,
            userId: "65123322885g6nbc"
        }

        const mockHandler = jest.fn()

        const component = render(
            <Blog blog={blog} toggleVisible={mockHandler} />
        )

        const button = component.getByText("View details")
        expect(button).toBeDefined()

        fireEvent.click(button)
        
        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: block')
        
    })

    test('like button clicked twice', () => {
        const blog = {
            title: "A fresh beginning",
            author: "Stefano Moscatelli",
            url: "http://127.0.0.1",
            likes: 0,
            userId: "65123322885g6nbc"
        }

        const mockHandler = jest.fn()

        const component = render(
            <Blog blog={blog} toggleVisible={mockHandler} updateBlog={mockHandler} />
        )

        const button = component.getByText("View details")
        expect(button).toBeDefined()

        fireEvent.click(button)

        const likeButton = component.getByText("Like")
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})