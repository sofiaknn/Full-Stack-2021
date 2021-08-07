/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  beforeEach(() => {
    component = render(
      <Blog
        user={user}
        remove={mockHandlerRemove}
        updateLike={mockHandlerUpdate}
        blog={blog}
      />,
    )
  })
  const blog = {
    title: 'Liemessä',
    author: 'Hans Välimäki',
    url: 'https://liemessa.fi/',
    likes: 45,
  }

  const user = {
    username: 'soffe',
    name: 'Sofia K',
  }

  const mockHandlerUpdate = jest.fn()
  const mockHandlerRemove = jest.fn()

  test('renders content, title and author', () => {


    const div = component.container.querySelector('.blog')
    expect(div).toHaveTextContent('Liemessä Hans Välimäki'
    )
  })

  test('renders content, rest of the blog info', () => {

    const button = component.getByText('view')

    fireEvent.click(button)

    expect(component.container).toHaveTextContent('likes'
    )
    expect(component.container).toHaveTextContent(45
    )
    expect(component.container).toHaveTextContent('https://liemessa.fi/'
    )
  })

  test('clicking the like button twice calls event handler twice', () => {
    const button = component.getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandlerUpdate.mock.calls).toHaveLength(2)
  })
})