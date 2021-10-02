import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import AddForm from './AddForm'

describe('addform firing events', () => {

        test('submits form', () => {
        
        const mockHandler = jest.fn()

        const component = render(
            <AddForm createBlog={mockHandler}/>
        )

        const title = component.container.querySelector('#title')
        const author = component.container.querySelector('#author')
        const url = component.container.querySelector('#url')
        const form = component.container.querySelector('form')

        fireEvent.change(title, {
            target: { value: "A fresh beginning"}
        })
        fireEvent.change(author, {
            target: { value: "Stefano Moscatelli"}
        })
        fireEvent.change(url, {
            target: {value: "http://127.0.0.1"}
        })
        fireEvent.submit(form)

        expect(mockHandler.mock.calls).toHaveLength(1)
        expect(mockHandler.mock.calls[0][0].content).toBe('A fresh beginning')
    })
    
})