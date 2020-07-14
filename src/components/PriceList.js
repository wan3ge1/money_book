import React from 'react'
import Ionicon from 'react-ionicons'

const PriceList = ({ items, onModifyItem, onDeleteItem }) => {
  return (
    <ul className="list-group">
      {
        items.map(item => {
          return (
            <li key={item.id} className="list-group-item d-flex flex-row justify-content-between align-items-center">
              <Ionicon
                icon={item.category.iconName} 
                fontSize="30px" 
                color="#fff" 
                style={{backgroundColor: '#007bff'}} 
              />
              <span>{item.title}</span>
              <span>{item.category.type === 'outcome' && '-'}{item.price}元</span>
              <span>{item.date}</span>
              <div>
                <Ionicon
                  className='rounded-circle' 
                  icon='ios-create-outline' 
                  fontSize="30px" 
                  color="#fff" 
                  style={{backgroundColor: '#28a745', padding: '5px'}} 
                />
                <Ionicon
                  className='rounded-circle' 
                  icon='ios-close' 
                  fontSize="30px" 
                  color="#fff" 
                  style={{backgroundColor: '#dc3545', padding: '5px'}} 
                />
              </div>
            </li>
          )
        })
      }
      
    </ul>
  )
}

export default PriceList
