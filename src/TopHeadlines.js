import React from 'react';
import './App.css';
import CookieService from './CookieService';

import Moment from 'react-moment';
import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle } from '@ionic/react';


const API_KEY   = '2017f7a755664a0f928e3a94c634c468';
const BASE_URL  = 'https://newsapi.org/v2/everything?sortBy=popularity&pageSize=1&apiKey='
                + API_KEY + "&q=";
const MAIN_CATEGORY = "mainNewsCategory";
const COOKIE = new CookieService();


class TopHeadlines extends React.Component { 
    constructor(props) {
        super(props);
        this.state  = {
          apiKey : API_KEY,
          articles : [],
          defaultCategory: 'vancouver',
          category: ''
        };

        // Register functions of the class.
        this.getNews = this.getNews.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.setSearchInput = this.setSearchInput.bind(this);
    }

    handleSearch(e){
        this.setState({category: e.target.value})
    }

    setSearchInput(e){
        if(this.state.category !== ''){
            this.getNews(this.state.category);
            COOKIE.setCookie(MAIN_CATEGORY, this.state.category);
        }
    }

    // Called when constructor is finished building component.
    componentDidMount() {
        // Set main category from cookie if it does not exist.
        let mainCategory = COOKIE.getCookie(MAIN_CATEGORY);
        if(mainCategory === null || mainCategory === '') {
            COOKIE.setCookie(MAIN_CATEGORY, this.state.defaultCategory);
            mainCategory = this.state.defaultCategory;
        }
        this.getNews(mainCategory);
    }


    // ** This function does not need to be changed. **
    // Set cookie that expires 1000 days from now.
    // This can store the user's preferred news category.
    setCookie(cookieType, cookieValue) {
        var numDays = 1000;
        var d = new Date();
        d.setTime(d.getTime() + (numDays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cookieType + "=" + cookieValue 
                        + ";" + expires + ";path=/";
    }

    // ** This function does not need to be changed. **
    // Get category from cookie if one exists.
    getCookie(cookieType) {
        var name = cookieType + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            // Cookie found.
            return c.substring(name.length, c.length);
          }
        }
        return null;
      }

    getNews(category) {    
        const URL        = BASE_URL + category;

        // Request and wait for data from remote server.
        fetch(URL).then(response => response.json())
            // Data retrieved so parse it.
            .then((data) => {
                console.log(JSON.stringify(data));
                this.setState({articles:data.articles});
            })
            // Data is not retieved.
            .catch((error) => {
                alert(error);
            });         
    }

    render() {
        return (          
            <div className='wrapper'>
                <div className="topTitle">
                    <h3>Top News</h3>
                </div>
                <div className="card">
                        <IonCard>
                            {this.state.articles.map((article, index) => (
                                <IonCardContent key={index}>

                                    <IonCardTitle>{article.title}</IonCardTitle>
                                    <IonCardSubtitle className="author">By   {article.author}&nbsp;
                                        | &nbsp;From {article.source.name}</IonCardSubtitle>
                                    <Moment format="MMM DD, YYYY"><h4>{article.publishedAt}</h4></Moment>
                                    
                                    <div className="imgAndExcerpt">
                                  
                                    <img className="top-img" src={article.urlToImage} alt="news"></img>
                                    
                                    <p className='article-description'>{article.description}</p>
                                    <IonButton><a href={`${article.url}`} target="blank">Read More</a></IonButton>
                                    </div>
                                </IonCardContent>
                                
                            ))} 
                            
                        </IonCard> 
                    
                    </div>
        
            </div>
        )
    }
}
export default TopHeadlines;
