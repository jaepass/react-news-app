import React from 'react';
import './App.css';

import Moment from 'react-moment';
import { IonButton, IonCard, IonCardContent,  IonCardSubtitle, IonCardTitle } from '@ionic/react';



const API_KEY   = '2017f7a755664a0f928e3a94c634c468';
const BASE_URL  = 'https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=3&apiKey='
                + API_KEY + "&q=";


class BusinessCategory extends React.Component { 
    constructor() {
        super();
        this.state  = {
            apiKey : API_KEY,
            articles : [],
            defaultCategory: 'vancouver',
            category: '',
            
        };

        // Register functions of the class.
        this.getNews = this.getNews.bind(this);
        
    }

    // Called when constructor is finished building component.
    componentDidMount() {
        this.getNews();
    }


    getNews() {    
        // Request and wait for data from remote server.
        fetch(BASE_URL).then(response => response.json())
            // Data retrieved so parse it.
            .then((data) => {
                // alert(JSON.stringify(data));
                this.setState({articles:data.articles})
                
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
                    <h3>Business</h3>
                </div>        
                    <div className="businessSection">
                    {this.state.articles.map((article, index) => (
                        <IonCard>
                        <IonCardContent key={index}>
                            {/* See  https://newsapi.org/ for more properties */}
                            {/* <div className="col-md-8"> */}
                            <IonCardTitle>{article.title}</IonCardTitle>
                            <IonCardSubtitle className="author">By   {article.author}&nbsp;
                                | &nbsp;From {article.source.name}</IonCardSubtitle>
                            <Moment format="MMM DD, YYYY"><h4>{article.publishedAt}</h4></Moment>
                            
                            <div className="imgAndExcerpt">
                            
                            <p className='article-description'>{article.description}</p>
                            <IonButton><a href={`${article.url}`} target="blank">Read More</a></IonButton>
                            </div>
                        </IonCardContent>
                        </IonCard> 
                    ))} 
                    </div>
            </div>
        )
    }
}
export default BusinessCategory;
