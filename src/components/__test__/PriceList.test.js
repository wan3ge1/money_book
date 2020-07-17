import React from 'react'
import { shallow } from 'enzyme'
import PriceList from '../PriceList'
import Ionicon from 'react-ionicons'
import { items, category } from '../../containers/Home'

let itemsWithCategory = items.map(item => {
  item['category'] = category[item['cid']]
  return item
})

const props = {
  items: itemsWithCategory,
  // mock 回调函数
  onModifyItem: jest.fn(),
  onDeleteItem: jest.fn()
}

let wrapper
describe('test PriceList component', () => {
  /**
   * 在此文件中的每个测试运行之前运行一个函数。 
   * 如果函数返回承诺，Jest在运行测试之前等待该承诺解决。
   * 如果要重置许多测试将使用的全局状态，这通常很有用。
   */
  beforeEach(() => {
    wrapper = shallow(<PriceList {...props} />)
  })
  /**
   * 配置快照，此后对该组件代码做的任何修改都会在进行测试
   * 的情况下进行触发，并在命令行中展示修改过的地方与原来
   * 代码的对比（感觉很鸡肋）
   */
  it('should render the component to match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('should render correct price items length', () => {
    // expect(wrapper.find('.list-group-item').length).toBe(itemsWithCategory.length)
    expect(wrapper.find('.list-group-item').length).toEqual(itemsWithCategory.length)
  })
  it('should render correct icon and price for each item', () => {
    // 拿到列表中第一条项目的所有 icon （种类、修改和删除 icon）
    const iconList = wrapper.find('.list-group-item').first().find(Ionicon)
    // 测试共有 3 种类型的 icon
    expect(iconList.length).toEqual(3)
    // 测试种类 icon 来自 category 中的 iconName
    expect(iconList.first().props().icon).toEqual(itemsWithCategory[0].category.iconName)
  })
  it('should trigger the correct function callbacks', () => {
    // 测试点击列表中第一条项目中的修改 icon 的情况，看它的回调函数是否使用第一个 item 作为参数传入
    const iconList = wrapper.find('.list-group-item').first().find(Ionicon)
    iconList.at(1).simulate('click')
    expect(props.onModifyItem).toHaveBeenCalledWith(itemsWithCategory[0])
    // 测试点击列表中第一条项目中的删除 icon 的情况，看它的回调函数是否使用第一个 item 作为参数传入
    iconList.last().simulate('click')
    expect(props.onDeleteItem).toHaveBeenCalledWith(itemsWithCategory[0])
  })
})
