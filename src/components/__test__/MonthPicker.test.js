import React from 'react'
import { mount } from 'enzyme'
import MonthPicker from '../MonthPicker'

let props = {
  year: 2020,
  month: 7,
  onChange: jest.fn()
}

let wrapper

describe('test MonthPicker component', () => {
  beforeEach(() => {
    wrapper = mount(<MonthPicker {...props} />)
  })
  it('should render the component to match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('should render correct year and month, show correct dropdown status', () => {
    // 测试按钮上展示出来的年和月是否正确
    const text = wrapper.find('.dropdown-toggle').first().text()
    expect(text).toEqual('2020年07月')
    // 测试没有点击按钮的时候下拉菜单是没有展开的
    expect(wrapper.find('.dropdown-menu').first().hasClass('show')).toEqual(false)
    // 测试没有点击按钮的时候 MonthPicker 组件的 state 的 isOpen 为 false
    expect(wrapper.state('isOpen')).toEqual(false)

    // 测试组件的 state 的 selectYear 等于 props 传入的 year
    expect(wrapper.state('selectYear')).toEqual(props.year)
  })
  it('after click the button, dropdown should showm year list & month list should have the correct item', () => {
    wrapper.find('.dropdown-toggle').first().simulate('click')
    expect(wrapper.state('isOpen')).toEqual(true)
    expect(wrapper.find('.dropdown-menu').first().hasClass('show')).toEqual(true)
    // 测试年有 10 个条目（4+1+4），月有 12 个条目（1-12月）
    expect(wrapper.find('.year-range .dropdown-item').length).toEqual(9)
    expect(wrapper.find('.month-range .dropdown-item').length).toEqual(12)
    // 测试下拉列表中默认选中的是 2020年07月
    expect(wrapper.find('.year-range .dropdown-item.active').first().text()).toEqual(`${props.year}年`)
    expect(wrapper.find('.month-range .dropdown-item.active').first().text()).toEqual(`0${props.month}月`)
    // 测试下拉列表中年月的第一项为 2016年 1月
    expect(wrapper.find('.year-range .dropdown-item').first().text()).toEqual(`${props.year - 4}年`)
    expect(wrapper.find('.month-range .dropdown-item').first().text()).toEqual('01月')
  })
  it('click the year & month item, should trigger correct status change', () => {
    wrapper.find('.dropdown-toggle').first().simulate('click')
    wrapper.find('.year-range .dropdown-item').first().simulate('click')
    expect(wrapper.find('.year-range .dropdown-item').first().hasClass('active')).toEqual(true)
    expect(wrapper.state('selectYear')).toEqual(props.year - 4)
    wrapper.find('.month-range .dropdown-item').first().simulate('click')
    expect(wrapper.state('isOpen')).toEqual(false)
    expect(props.onChange).toHaveBeenCalledWith(props.year - 4, 1)
  })

  it('after the dropdown is shown, click the document should close the dropdown', () => {
    // 要测试在 componentDidMount 中的函数，最好另起一个组件，因为之前的组件在 beforeEach 里面，不太好
    /**
     * 先 mock 一下 addEventListener 函数，后面 mount 组件的时候，就会捕获到 componentDidmount 里面的 
     * addEventListener 函数了
     */
    let eventMap = {}
    document.addEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb
    })
    const wrapper = mount(<MonthPicker {...props} />)
    // console.log(eventMap)
    wrapper.find('.dropdown-toggle').first().simulate('click')
    expect(wrapper.state('isOpen')).toEqual(true)
    expect(wrapper.find('.dropdown-menu').first().hasClass('show')).toEqual(true)
    // 点击除了按钮和菜单以外的地方，按钮的菜单收起
    eventMap['click']({
      target: document
    })
    expect(wrapper.state('isOpen')).toEqual(false)
  })
})
