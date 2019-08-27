import React from 'react';
import './App.css';


import Moment from 'react-moment';
import { IonButton, IonCard, IonCardContent,  IonCardSubtitle, IonCardTitle } from '@ionic/react';



const API_KEY   = '2017f7a755664a0f928e3a94c634c468';
const BASE_URL  = 'https://newsapi.org/v2/everything?sortBy=popularity&pageSize=1&apiKey='
                + API_KEY + "&q=";

class PopularArticle extends React.Component { 
    constructor() {
        super();
        this.state  = {
            apiKey : API_KEY,
            articles : [],
            defaultCategory: 'business',
            category: ''
        };

        // Register functions of the class.
        this.getNews = this.getNews.bind(this);
    }

    // Called when constructor is finished building component.
    componentDidMount() {
        this.getNews();
    }

    getNews() {    
        
        fetch(BASE_URL).then(response => response.json())
            // Data retrieved so parse it.
            .then((data) => {
                // alert(JSON.stringify(data));
                this.setState({articles:data.articles}) 
            })
            
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
export default PopularArticle;
