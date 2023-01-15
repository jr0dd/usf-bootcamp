import { render, fireEvent } from '@testing-library/react'
import Card from './Card'
import Carousel from './Carousel'
import TEST_IMAGES from './_testCommon.js'

// smoke
it('renders the card', () => {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title='images for testing'
    />
  )
  render(
    <Card
      caption={container.caption}
      src={container.src}
      currNum={container.currNum}
      totalNum={container.totalNum}
    />
  )
})

// snapshot
it('matches snapshot', () => {
  const { asFragment } = render(
    <Card
      caption='test image'
      src='test1.com'
      currNum={1}
      totalNum={1}
    />
  )
  expect(asFragment()).toMatchSnapshot()
})
