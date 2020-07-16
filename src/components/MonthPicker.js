import React, { Component, Fragment } from 'react'
import { range, padLeft } from '../utility'

class MonthPicker extends Component {

  constructor (props) {
    super(props)
    this.state = {
      isOpen: false,
      selectYear: props.year
    }
    this.toggleBtnDrop = this.toggleBtnDrop.bind(this)
    this.onSelectYear = this.onSelectYear.bind(this)
    this.onSelectMonth = this.onSelectMonth.bind(this)
  }

  render () {

    const { year, month } = this.props

    return (
      <Fragment>
        <div 
          className={this.state.isOpen ? 'dropdown show' : 'dropdown'}
          style={{textAlign: 'left'}}
        >
          <p style={{margin: '0'}}>选择月份</p>
          <button 
            className="btn btn-secondary dropdown-toggle" 
            type="button" 
            id="dropdownMenuButton" 
            data-toggle="dropdown" 
            aria-haspopup="true" 
            aria-expanded="false"
            onClick={this.toggleBtnDrop}
          >
            {`${year}年${padLeft(month)}月`}
          </button>
          <div 
            className={this.state.isOpen ? 'dropdown-menu show' : 'dropdown-menu'} 
            aria-labelledby="dropdownMenuButton"
            style={{padding: 0}}
          >
            <div className='d-flex flex-row'>
              <div className="p-2 d-flex flex-column border-right">
                {
                  range(new Date().getFullYear() - 4, new Date().getFullYear() + 4).map(item => {
                    return (
                      <a 
                        key={item} 
                        className={item === this.state.selectYear ? 'dropdown-item active' : 'dropdown-item'} 
                        href="/#"
                        onClick={e => {this.onSelectYear(e, item)}}
                      >
                        {item}年
                      </a>
                    )
                  })
                }
              </div>
              <div className="p-2 d-flex flex-column">
                {
                  range(1, 12).map(item => {
                    return (
                      <a 
                        key={item} 
                        className={item === month ? 'dropdown-item active' : 'dropdown-item'} 
                        href="/#"
                        onClick={e => {this.onSelectMonth(e, item)}}
                      >
                        {padLeft(item)}月
                      </a>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }

  toggleBtnDrop () {
    this.setState(() => ({
      isOpen: !this.state.isOpen
    }))
  }

  onSelectYear (e, item) {
    e.preventDefault()
    this.setState(() => ({
      selectYear: item
    }))
  }

  onSelectMonth (e, item) {
    e.preventDefault()
    this.setState(() => ({
      isOpen: false
    }))
    this.props.onChange(this.state.selectYear, item)
  }

}

export default MonthPicker
