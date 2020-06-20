import React from 'react'
import { render } from 'enzyme'
import toJSON from 'enzyme-to-json'
import Spinner from '../../components/Spinner'

describe('test <Spinner /> component', () => {

  it('it renders if loading is true', () => {
    const wrapper = render(
      <Spinner
        loading={true}
      />
    )
    const Ring = wrapper.find('img')

    expect(Ring.length).toBe(1)
    expect(Ring['0'].attribs.width).toBe('40')
    expect(toJSON(wrapper)).toMatchSnapshot()
  })

  it('it set the height and width to 50', () => {
    const wrapper = render(
      <Spinner
        loading={true}
        height={50}
      />
    )
    const Ring = wrapper.find('img')

    expect(Ring.length).toBe(1)
    expect(Ring['0'].attribs.height).toBe('50')
    expect(Ring['0'].attribs.width).toBe('50')
    expect(toJSON(wrapper)).toMatchSnapshot()
  })

  it('not renders if loading is true', () => {
    const wrapper = render(
      <Spinner
        loading={false}
      />
    )
    const Ring = wrapper.find('img')

    expect(Ring.length).toBe(0)
    expect(toJSON(wrapper)).toMatchSnapshot()
  })

})
