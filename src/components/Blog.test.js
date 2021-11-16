/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'This is a test title',
  url: 'thisisatest.com',
  likes: 0,
  author: 'This is a test author',
  user: {
    name: 'Koh Jun Jie',
  }
}

test('renders content', () => {

  const mockHandler = jest.fn()
  const component = render(
    <Blog
      blog={blog}
      incrementLikes={mockHandler}
      nameOfCreator='test creator'
      removeBlog={mockHandler} />
  )

  expect(component.container).toHaveTextContent('This is a test title')
  expect(component.container).toHaveTextContent('This is a test author')
  expect(component.container).not.toHaveTextContent('thisisatest.com')
  expect(component.container).not.toHaveTextContent(0)
})

test('clicking the view button renders url and likes', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog
      blog={blog}
      incrementLikes={mockHandler}
      nameOfCreator='test creator'
      removeBlog={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('This is a test title')
  expect(component.container).toHaveTextContent('This is a test author')
  expect(component.container).toHaveTextContent('thisisatest.com')
  expect(component.container).toHaveTextContent(0)
})