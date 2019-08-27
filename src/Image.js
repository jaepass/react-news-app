import React from 'react';
import './App.css';

const Image = (props) => {

    return (
        <div>
            <img className="article-img" src={props.urlToImage} alt="news"></img>
        </div>);
}
export default Image;