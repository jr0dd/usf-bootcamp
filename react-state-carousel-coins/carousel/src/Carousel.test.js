import { render, fireEvent } from '@testing-library/react'
import Carousel from './Carousel'
import Card from './Card'
import TEST_IMAGES from './_testCommon.js'

// smoke
it('renders the carousel', () => {
  render(
    <Carousel
      photos={TEST_IMAGES}
      title='images for testing'
    />
  )
})

// snapshot
it('matches snapshot', () => {
  const { asFragment } =   render(
    <Carousel
      photos={TEST_IMAGES}
      title='images for testing'
    />
  )
  expect(asFragment()).toMatchSnapshot()
})

it('works when you click on the right arrow', () => {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title='images for testing'
    />
  )
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument()
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument()

  // move forward in the carousel
  const rightArrow = container.querySelector('.bi-arrow-right-circle')
  fireEvent.click(rightArrow)

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument()
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument()
})

// test left arrow
it('works when you click on the left arrow', () => {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title='images for testing'
    />
  )

  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument()
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument()


  // move forward in the carousel so arrow displays
  const rightArrow = container.querySelector('.bi-arrow-right-circle')
  fireEvent.click(rightArrow)

  // move backward in the carousel
  const leftArrow = container.querySelector('.bi-arrow-left-circle')
  fireEvent.click(leftArrow)

  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument()
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument()
})

it('left arrow missing on first image', () => {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title='images for testing'
    />
  )

  expect(
    container.querySelector('.bi-arrow-left-circle')
  ).not.toBeInTheDocument()
})

it('right arrow missing on last image', () => {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title='images for testing'
    />
  )

  const rightArrow = container.querySelector('.bi-arrow-right-circle')
  for (let i = 0; i < TEST_IMAGES.length; i++) {
    fireEvent.click(rightArrow)
  }

  expect(
    container.querySelector('.bi-arrow-right-circle')
  ).not.toBeInTheDocument()
})