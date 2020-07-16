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
      <ul className="nav nav-tabs nav-fill">
        <li className="nav-item">
          <a 
            className={generateLinkClass(LIST_VIEW, activeTab, 'header')}
            onClick={e => {e.preventDefault(); onTabChange(LIST_VIEW)}}
            href='/#'
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
        <li className="nav-item">
          <a 
            className={generateLinkClass(CHART_VIEW, activeTab, 'header')}
            onClick={e => {e.preventDefault(); onTabChange(CHART_VIEW)}}
            href='/#'
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
    </Fragment>
  )
}

ViewTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired
}

export default ViewTabs
