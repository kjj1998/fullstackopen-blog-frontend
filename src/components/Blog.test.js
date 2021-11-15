/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'This is a test title',
    url: 'thisisatest.com',
    likes: 0,
    author: 'This is a test author'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      incrementLikes={mockHandler}
      nameOfCreator='test creator'
      removeBlog={mockHandler} />
  )

  expect(component.container).toHaveTextContent(
    'This is a test title'
  )

  expect(component.container).toHaveTextContent(
    'This is a test author'
  )

  expect(component.container).not.toHaveTextContent(
    'thisisatest.com'
  )

  expect(component.container).not.toHaveValue(
    0
  )
})