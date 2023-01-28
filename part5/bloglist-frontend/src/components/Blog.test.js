import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('First render of the Blog component', () => {
  const blog = {
    title: 'Supposed to show in the beginning',
    url: 'Supposed to be hidden in the beginning',
    author: 'Supposed to show in the beginning as well',
    likes: 10
  }


  const { container } = render(<Blog blog={blog} />)

  expect(container.querySelector('hiddenLikes')).toBeDefined()
  expect(container.querySelector('hiddenURL')).toBeDefined()

})

test('Clicking the View button of the Blog component', async () => {
  const blog = {
    title: 'ReactJS',
    url: 'Supposed to be shown when user clicks on the view button',
    author: 'helsinki',
    likes: 10
  }

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(container.querySelector('likes')).toBeDefined()
  expect(container.querySelector('URL')).toBeDefined()
})

test('Clicking the Like button of the Blog component', async () => {
  const blog = {
    title: 'ReactJS',
    url: 'Supposed to be shown when user clicks on the view button',
    author: 'helsinki',
    likes: 10
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} updateBlog={mockHandler} />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)
  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})