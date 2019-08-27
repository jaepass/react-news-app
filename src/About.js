import React, { Component } from 'react';
import './App.css';
import { IonCard } from '@ionic/react';

class About extends Component {
  render() {
    return  (
      <div>
        
        <div className="about" style={{height: '80vh'}}>
          <IonCard>
          <div className="about-content">
            <h1>About</h1>
            <div className="about-paragraph">
            <p>OrbNews provides the latest top headlines from around the world. </p>
            <p>This product uses the newsapi.org API but is not endorsed or certified by newsapi.</p>
            <p>Visit <a href='https://newsapi.org/'>NewsAPI</a> for more information.</p>
          </div>
          </div>
        </IonCard>
        </div>
        
      </div>
    
    ); 
  }
}
export default About;