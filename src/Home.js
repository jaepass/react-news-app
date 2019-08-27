import React from 'react';
import './App.css';
import Image from './Image';
import BusinessCategory from './BusinessCategory';
import TopHeadlines from './TopHeadlines';
import TechCategory from './TechCategory';
import CookieService from './CookieService';


import Moment from 'react-moment';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';



const API_KEY   = '2017f7a755664a0f928e3a94c634c468';
const BASE_URL  = 'https://newsapi.org/v2/everything?sortBy=publishedAt&language=en&apiKey='
                + API_KEY + "&q=";
const MAIN_CATEGORY = "mainNewsCategory";
const COOKIE = new CookieService();


class Home extends React.Component { 
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
        
    // Set default when loaded.
        if(mainCategory === null || mainCategory === '') {
            COOKIE.setCookie(MAIN_CATEGORY, this.state.defaultCategory);
            mainCategory = this.state.defaultCategory;
        }
        this.getNews(mainCategory);
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
                <div className="search-bar">

                    <label>Search Topics</label>
                    <input type="text" value={this.state.category} onChange={this.handleSearch}/>
                    <button className='button-native' onClick={this.setSearchInput}>Search</button>

                </div>

                {/* Top Popular Article and Category Section */}
                <div className="topSection">
                    <div className="col-md-6">
                            <TopHeadlines />
                    </div>
                    <div className="col-md-6">
                            <BusinessCategory />
                    </div>
                </div>
                <div className="tech">
                     <TechCategory />
                </div>
                <div className="topicsTitle">
                    <h3>Your Topics</h3>
                </div>

                {/* Main News Section */}
                <div className="cardContainer">
                    
                        
                            {this.state.articles.map((article, index) => (
                                <IonCard>
                                <div className="cardContent">
                                <IonCardContent key={index}>
                                    {/* See  https://newsapi.org/ for more properties */}
                                    {/* <div className="col-md-8"> */}
                                    <IonCardHeader>
                                        <IonCardTitle>{article.title}</IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardSubtitle className="author">By   {article.author}&nbsp;
                                        | &nbsp;From {article.source.name}</IonCardSubtitle>
                                    <Moment format="MMM DD, YYYY"><h4>{article.publishedAt}</h4></Moment>
                                    
                                    <div className="imgDescBtn">
                                        <Image className='article-img'urlToImage={article.urlToImage} />
                                        <div className="descBtn">
                                        <p className='article-description'>{article.description}</p>
                                        <IonButton><a href={`${article.url}`} target="blank">Read More</a></IonButton>
                                        </div>
                                    </div>
                                </IonCardContent>
                                </div>
                                </IonCard> 
                            ))} 
                            
                        
                    
                    </div>

            </div>
        )
    }
}
export default Home;
