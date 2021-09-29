import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Topics from './components/Topics';
import ArticlesList from './components/ArticlesList';
import Article from './components/Article';
import Users from './components/Users';
import User from './components/User';
import Home from './components/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState('tickle122');

  return (
    <BrowserRouter>
      <div className="app">
        <Header user={user} />
        <div className="contentContainer">
          <Nav user={user} setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
          <div className="right">
            <Switch>
              <Route exact path="/home">
                <Home
                  setIsLoggedIn={setIsLoggedIn}
                  setUser={setUser}
                  isLoggedIn={isLoggedIn}
                  user={user}
                />
              </Route>
              <Route exact path="/topics">
                <Topics isLoggedIn={isLoggedIn} />
              </Route>
              <Route exact path="/users">
                <Users isLoggedIn={isLoggedIn} />
              </Route>
              <Route exact path="/user">
                <User isLoggedIn={isLoggedIn} />
              </Route>
              <Route exact path="/articlesList">
                <ArticlesList isLoggedIn={isLoggedIn} user={user} />
              </Route>
              <Route exact path="/article">
                <Article isLoggedIn={isLoggedIn} user={user} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
