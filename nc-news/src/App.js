import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Topics from './components/Topics';
import ArticlesList from './components/ArticlesList';
import Article from './components/Article';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Nav />
        <Switch>
          <Route exact path="/">
            <Topics />
          </Route>
          <Route exact path="/articlesList">
            <ArticlesList />
          </Route>
          <Route exact path="/article">
            <Article />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
