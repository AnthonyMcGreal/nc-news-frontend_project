import {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { getArticle } from '../api';
import Comments from './Comments';

const Article = () => {

  const[article, setArticle] =useState({});
  const search = useLocation().search;
  const article_id = new URLSearchParams(search).get('article_id')

  useEffect(() => {
    getArticle(article_id).then((response)=>{
      setArticle(response)
    })
  },[article_id])
  
  if(!article.hasOwnProperty('article_id')) return 'Loading article ...';

  return (
        <div className="Article">
          <h2>{article.title}</h2> 
          <h3>Written by: {article.author}</h3>
          <h4>Created on: {article.created_at}</h4>
          <p>{article.body}</p>
          <Comments article={article}/>
        </div>
    );
};

export default Article;