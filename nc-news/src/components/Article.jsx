import {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { deleteItem, getArticle, patchVotes} from '../api';
import Comments from './Comments';

const Article = ({isLoggedIn, user}) => {

  const[article, setArticle] =useState({});
  const search = useLocation().search;
  const article_id = new URLSearchParams(search).get('article_id')

  useEffect(() => {
    getArticle(article_id).then((response)=>{
      setArticle(response)
    })
  },[article_id])
  if(!isLoggedIn) return <div>Please Log in to view this page</div>
  if(!article.hasOwnProperty('article_id')) return 'Loading article ...';

  function patchArticleVotes(votes){
    patchVotes('articles',article_id,votes)
  }

  function deleteArticle(article_id){
    deleteItem('articles',article_id)
  }

  return (
        <div className="Article">
          <h2>{article.title}</h2> 
          <h3>Written by: {article.author}</h3>
          {user === article.author? <button onClick={() => {deleteArticle(article.article_id)}}>Delete article</button>:null}
          <h4>Created on: {article.created_at}</h4>
          <p>{article.body}</p>
          <button onClick={()=>{patchArticleVotes(1)}}>Upvote</button>
          <p>Upvotes:{article.votes}</p>
          <button onClick={()=>{patchArticleVotes(-1)}}>Downvote</button>
          <Comments article={article} user={user}/>
        </div>
    );
};

export default Article;