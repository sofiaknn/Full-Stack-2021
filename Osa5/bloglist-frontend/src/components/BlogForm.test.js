/* eslint-disable linebreak-style */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm />', () => {

  const addBlog = jest.fn()

  const component = render(<BlogForm createBlog={addBlog} />)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Hannan Soppa' },
  })
  fireEvent.change(author, {
    target: { value: 'Hanna' },
  })
  fireEvent.change(url, {
    target: { value: 'https://hannansoppa.com/' },
  })
  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Hannan Soppa')
  expect(addBlog.mock.calls[0][0].author).toBe('Hanna')
  expect(addBlog.mock.calls[0][0].url).toBe('https://hannansoppa.com/')
})