/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const other = {
  own: true,
  handleRemove: () => {},
  handleLike: () => {}
}

const blog = {
  author: 'Ron Jeffries',
  title: 'You’re NOT gonna need it!',
  url: 'https://ronjeffries.com/xprog/articles/practices/pracnotneed/',
  likes: 3,
  id: 1,
  user: {
    name: 'Arto Hellas'
  }
}

describe.only('Blog', () => {
  test('renders only author and title by default', () => {

    const component = render(
      <Blog blog={blog} {...other} />
    )

    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).not.toHaveTextContent(blog.url)
  })

  test('renders url and likes when expanded', () => {

    const component = render(
      <Blog blog={blog} {...other} />
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(`likes ${blog.likes}`)
  })

  test('when liked twice, the event handler gets called twice', () => {
    other.handleLike = jest.fn()

    const component = render(
      <Blog blog={blog} {...other} />
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(other.handleLike.mock.calls.length).toBe(2)
  })
})

/*
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

test('clicking the like button twice results in the event handler being called twice', () => {
  const mockIncrementLikesHandler = jest.fn()
  const mockRemoveBlogHandler = jest.fn()
  const component = render(
    <Blog
      blog={blog}
      incrementLikes={mockIncrementLikesHandler}
      nameOfCreator='test creator'
      removeBlog={mockRemoveBlogHandler} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockIncrementLikesHandler.mock.calls).toHaveLength(2)
})
*/