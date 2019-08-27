import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Link, Switch } 
                    from "react-router-dom";
import Home         from "./Home";
import About        from "./About";
import NotFound        from "./NotFound";
import TopHeadlines from './TopHeadlines';
import BusinessCategory from './BusinessCategory';


class App extends React.Component {

    render() {
        return (          
          
            <Router>
              <div className="mainApp" >
                <div className="logo">
                    <h1>OrbNews</h1>
                </div>
                <ul className="mainNav">
                  <li><Link to="/orbnews-app/">Home</Link></li>
                  <li><Link to="/orbnews-app/about">About</Link></li>
                  <li><Link to="/orbnews-app/topheadlines">Top Headlines</Link></li>
                  <li><Link to="/orbnews-app/businesscategory">Business</Link></li>
                </ul>

                {/* Our router goes here */}
                <Switch> 
                <Route exact path="/orbnews-app/" component={Home} />

                <Route path={'/orbnews-app/about'} exact component={About} />
                <Route path={'/orbnews-app/topheadlines'} exact component={TopHeadlines} />
                <Route path={'/orbnews-app/businesscategory'} exact component={BusinessCategory} />

                {/* Shows an error page. */}
                <Route path="/orbnews-app/*" component={NotFound} />
                </Switch>
              </div>
            </Router> 
            
        );
    }
}
export default App;

