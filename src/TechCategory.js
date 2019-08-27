import React from 'react';
import './App.css';

import Moment from 'react-moment';
import { IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle } from '@ionic/react';


const API_KEY   = '2017f7a755664a0f928e3a94c634c468';
const BASE_URL  = 'https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=4&apiKey='
                + API_KEY + "&q=";



class TechCategory extends React.Component { 
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
                <div className="techTitle">
                    <h3>Techology</h3>
                </div>  

                <div className="techSection">  
                
                    {this.state.articles.map((article, index) => (
                        <IonCard>
                        <div className="techArticles">   
                        <IonCardContent key={index}>
                            
                            <IonCardTitle>{article.title}</IonCardTitle>
                            <IonCardSubtitle className="author">By   {article.author}&nbsp;
                                | &nbsp;From {article.source.name}</IonCardSubtitle>
                            <Moment format="MMM DD, YYYY"><h4>{article.publishedAt}</h4></Moment>
                            
                            <img className="tech-img" src={article.urlToImage} alt="news"></img>
                            
                            <IonButton><a href={`${article.url}`} target="blank">Read More</a></IonButton>
                        </IonCardContent>
                        </div>
                        </IonCard>
                    ))} 
                    
                {/* </IonCard>  */}
                
                </div>
                
                    
            </div>
        )
    }
}
export default TechCategory;
