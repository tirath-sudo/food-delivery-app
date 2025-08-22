import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
           <img src={assets.logo}></img>
           <p>Savor your favorite meals delivered straight to your 
            doorstep with just a few clicks. Our platform connects 
            you to the best local restaurants, fresh ingredients, and 
            quick service — all at your convenience. Whether 
            it’s a quick snack, a hearty meal, or a sweet dessert, 
            we bring flavor to your table anytime, anywhere. Order now 
            and enjoy fast, reliable, and delicious food delivery you can trust.</p>
           <div className='footer-social-icons'>
            <img src={assets.facebook_icon}></img>
            <img src={assets.twitter_icon}></img>
            <img src={assets.linkedin_icon}></img>
           </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
           <h2>Get In Touch</h2>
           <ul>
            <li>+91-98989-98989</li>
            <li>stirath462002@gmail.com</li>
           </ul>
        </div>
      </div>
      <hr/>
      <p className='footer-copyright'>
       Copyright 2025 © Tirath Singh - All Rights Reserved
      </p>
    </div>
  )
}

export default Footer
