import { render } from '@testing-library/react'
import BoxList from './BoxList'

it('renders without crashing', () => {
  render(<BoxList />)
});

it('matches snapshot', () => {
  const { asFragment } = render(<BoxList />)
  expect(asFragment()).toMatchSnapshot()
})
