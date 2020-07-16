import React, { Fragment } from 'react'
import { LIST_VIEW, CHART_VIEW } from '../utility'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'

const generateLinkClass = (current, activeTab, type) => {
  if (type === 'header') return current === activeTab ? 'nav-link active' : 'nav-link'
  if (type === 'content') return current === activeTab ? 'tab-pane fade show active' : 'tab-pane fade'
}

const ViewTabs = ({ activeTab, onTabChange }) => {
  return (
    <Fragment>
      <ul className="nav nav-tabs nav-fill" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <a 
            className={generateLinkClass(LIST_VIEW, activeTab, 'header')}
            id="list-tab" 
            data-toggle="tab" 
            href="#list" 
            role="tab" 
            aria-controls="list" 
            aria-selected="true"
            onClick={e => {e.preventDefault(); onTabChange(LIST_VIEW)}}
          >
            <Ionicon
              icon='ios-paper'
              className='rounded-circle'
              fontSize="30px" 
              color="#007bff"
            />
            列表模式
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a 
            className={generateLinkClass(CHART_VIEW, activeTab, 'header')}
            id="chart-tab" 
            data-toggle="tab" 
            href="#chart" 
            role="tab" 
            aria-controls="chart" 
            aria-selected="false"
            onClick={e => {e.preventDefault(); onTabChange(CHART_VIEW)}}
          >
            <Ionicon
              icon='ios-pie'
              className='rounded-circle'
              fontSize="30px" 
              color="#007bff" 
            />
            图表模式
          </a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className={generateLinkClass(LIST_VIEW, activeTab, 'content')} id="list" role="tabpanel" aria-labelledby="list-tab">列表模式内容</div>
        <div className={generateLinkClass(CHART_VIEW, activeTab, 'content')} aria-labelledby="chart-tab">图表模式内容</div>
      </div>
    </Fragment>
  )
}

ViewTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired
}

export default ViewTabs
