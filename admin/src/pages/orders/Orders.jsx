import React, { useState, useEffect } from 'react';
import "./orders.css"
import axios from 'axios';
import { toast } from "react-toastify"
import { assets } from './../../assets/assets';

const Orders = () => {

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/order/status`, {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/order/list`)
    if (response.data.success) {
      setOrders(response.data.data)
      console.log(response.data.data);
    }
    else {
      toast.error('Error');
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt='//' />
            <div>
              <p className='order-icon-food'>
                {order.items.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return item.name + "x" + item.quantity
                  } else {
                    return item.name + "x" + item.quantity + ","
                  }
                })}
              </p>
              <div className="order-item-name">{order.address.firstName + " " + order.address.lastName}</div>
              <div className='order-item-address'>
                <p>{order.address.street + ","} </p>
                <p>{order.address.city + "," + order.address.state + "," + order.address.city + "," + order.address.zipcode} </p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount} </p>

            <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

          </div>
        ))}

      </div>
    </div>
  )
}

export default Orders
