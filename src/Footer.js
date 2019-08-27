import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return  (
    <div className='footer'>
        <h4>&copy; 2019 JAERIAH</h4>
        <p>News fetched from: <a href="https://newsapi.org/"> News API</a></p>
    </div>
    ); 
  }
}
export default Footer;