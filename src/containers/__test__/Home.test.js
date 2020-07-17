import React from 'react'
import { mount } from 'enzyme'
import Home, { items } from '../Home'

import PriceList from '../../components/PriceList'
import ViewTab from '../../components/ViewTab'
import MonthPicker from '../../components/MonthPicker'
import CreateBtn from '../../components/CreateBtn'
import TotalPrice from '../../components/TotalPrice'
import { LIST_VIEW, CHART_VIEW, parseToYearAndMonth, TYPE_INCOME, TYPE_OUTCOME, padLeft } from '../../utility'
import ViewTabs from '../../components/ViewTab'

let wrapper

describe('test Home container component', () => {
  beforeEach(() => {
    wrapper = mount(<Home />)
  })
  it('should render the default layout', () => {
    expect(wrapper.find(PriceList).length).toEqual(1)
    expect(wrapper.find(ViewTabs).first().props().activeTab).toEqual(LIST_VIEW)
    expect(wrapper.find(MonthPicker).first().props().year).toEqual(parseToYearAndMonth().year)
    expect(wrapper.find(MonthPicker).first().props().month).toEqual(parseToYearAndMonth().month)
  })
  it('click the anonther view tab, should change the default view', () => {
    wrapper.find('.nav-item a').last().simulate('click')
    expect(wrapper.find(PriceList).length).toEqual(0)
    expect(wrapper.find('.chart-title').length).toEqual(1)
    expect(wrapper.find(ViewTabs).first().props().activeTab).toEqual(CHART_VIEW)
  })
  it('click the new month item, should switch to the correct items', () => {
    // 点击 2020 年 7 月，出现 2 个条目（这个测试随着年份的增加会失效报错）
    wrapper.find('.dropdown-toggle').first().simulate('click')
    wrapper.find('.month-range .dropdown-item').at(6).simulate('click')
    expect(wrapper.find(MonthPicker).props().month).toEqual(7)
    expect(wrapper.find(PriceList).props().items.length).toEqual(2)
  })
})
