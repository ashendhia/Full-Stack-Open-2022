import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('Clicking the Add button of the BlogForm component', async () => {
  const blog = {
    title: 'ReactJS',
    url: 'mooc.fi',
    author: 'helsinki'
  }

  const mockHandler = jest.fn()

  render(
    <BlogForm createBlog={mockHandler} />
  )

  const user = userEvent.setup()
  await userEvent.type(screen.getByPlaceholderText('title'), blog.title)
  await userEvent.type(screen.getByPlaceholderText('author'), blog.author)
  await userEvent.type(screen.getByPlaceholderText('url'), blog.url)
  const createButton = screen.getByText('Create')
  await user.click(createButton)

  expect(mockHandler.mock.lastCall[0].title).toBe('ReactJS')
  expect(mockHandler.mock.lastCall[0].url).toBe('mooc.fi')
  expect(mockHandler.mock.lastCall[0].author).toBe('helsinki')



})