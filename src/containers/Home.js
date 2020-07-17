import React, { Component, Fragment } from 'react'
import logo from '../logo.svg'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import PriceList from '../components/PriceList'
import ViewTab from '../components/ViewTab'
import MonthPicker from '../components/MonthPicker'
import CreateBtn from '../components/CreateBtn'
import TotalPrice from '../components/TotalPrice'
import { LIST_VIEW, CHART_VIEW, parseToYearAndMonth, TYPE_INCOME, TYPE_OUTCOME, padLeft } from '../utility'

const category = {
  "1" : {
    id: 1,
    name: "旅行",
    type: "outcome",
    iconName: "ios-plane"
  },
  "2" : {
    id: 2,
    name: "理财",
    type: "income",
    iconName: "logo-yen"
  }
}

const items = [
  {
    id: 1,
    title: "去云南旅游",
    price: 200,
    date: "2020-07-14",
    cid: 1
  },
  {
    id: 2,
    title: "去海南旅游",
    price: 2200,
    date: "2020-08-08",
    cid: 1
  },
  {
    id: 3,
    title: "理财收入",
    price: 150,
    date: "2020-07-31",
    cid: 2
  }
]

class Home extends Component {

  constructor (props) {
    super(props)
    this.onModifyItem = this.onModifyItem.bind(this)
    this.onDeleteItem = this.onDeleteItem.bind(this)
    this.onTabChange = this.onTabChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.onCreateItem = this.onCreateItem.bind(this)
    this.state = {
      items,
      activeTab: LIST_VIEW,
      currentDate: parseToYearAndMonth()
    }
  }

  render () {
    let itemsWithCategory = this.state.items.map(item => {
      item['category'] = category[item['cid']]
      return item
    }).filter(item => {
      return item.date.includes(`${this.state.currentDate.year}-${padLeft(this.state.currentDate.month)}`)
    })
    let totalIncome = 0, totalOutcome = 0
    itemsWithCategory.forEach(item => {
      if (item.category.type === TYPE_INCOME) totalIncome += item.price
      if (item.category.type === TYPE_OUTCOME) totalOutcome += item.price
    })

    return (
      <Fragment>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div 
              className='row'
              style={{justifyContent: 'space-around', alignItems: 'center', width: '100%'}}
            >
              <div className='col'>
                <MonthPicker 
                  year={this.state.currentDate.year}
                  month={this.state.currentDate.month}
                  onChange={(selectYear, selectMonth) => {this.onDateChange(selectYear, selectMonth)}}
                />
              </div>
              <div className='col'>
                <TotalPrice 
                  income={totalIncome}
                  outcome={totalOutcome}
                />
              </div>
            </div>
          </header>
          <ViewTab
            activeTab={this.state.activeTab}
            onTabChange={this.onTabChange}
          />
          <CreateBtn 
            onClick={() => {}}
          />
          {
            this.state.activeTab === LIST_VIEW &&
            <PriceList
              items={itemsWithCategory}
              onModifyItem={this.onModifyItem}
              onDeleteItem={this.onDeleteItem}
            />
          }
          {
            this.state.activeTab === CHART_VIEW &&
            <h2 className='chart-title'>这里是图表区域</h2>
          }
      </Fragment>
    )
  }

  onModifyItem (item) {
    console.log(item)
  }

  onCreateItem () {

  }

  onDeleteItem (delItem) {
    const filterItems = this.state.items.filter(item => item.id !== delItem.id)
    this.setState(() => ({
      items: filterItems
    }))
  }

  onTabChange (view) {
    this.setState(() => ({
      activeTab: view
    }))
  }

  onDateChange (year, month) {
    this.setState(() => ({
      currentDate: { year, month }
    }))
  }

}

export { items, category }
export default Home
