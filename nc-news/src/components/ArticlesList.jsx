import {useState, useEffect} from 'react'
import { useLocation, Link } from 'react-router-dom';
import { getArticles } from '../api';

const ArticlesList = () => {

  const[articles,setArticles] = useState([]);
  const search = useLocation().search;
  const topic = new URLSearchParams(search).get('topic')


  useEffect(() => {
      getArticles(topic).then((response)=>{
        setArticles(response)
      })
  },[topic])

  if(articles.length ===0 ) return 'Loading articles....'

    return (
        <div className="ArticleList">
          <ul>
            {articles.map((article) => {
              return (
              <li key={article.article_id}>
                <Link to={`/article?article_id=${article.article_id}`}>
                  {article.title}
                </Link>
              </li>
              )})}
          </ul>
        </div>
    );
};

export default ArticlesList;