/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlogForm from './CreateBlogForm'

test('correct details are received when a new blog is created', () => {

  const mockCreateNewBlogHandler = jest.fn()

  const component = render(
    <CreateBlogForm createNewBlog={mockCreateNewBlogHandler} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'John Doe' }
  })
  fireEvent.change(title, {
    target: { value: 'Diary of John Doe' }
  })
  fireEvent.change(url, {
    target: { value: 'diaryofjohndoe.com' }
  })
  fireEvent.submit(form)

  expect(mockCreateNewBlogHandler.mock.calls).toHaveLength(1)
  expect(mockCreateNewBlogHandler.mock.calls[0][0].title).toBe('Diary of John Doe')
  expect(mockCreateNewBlogHandler.mock.calls[0][0].author).toBe('John Doe')
  expect(mockCreateNewBlogHandler.mock.calls[0][0].url).toBe('diaryofjohndoe.com')

})