import {useState, useEffect} from 'react'
import { useLocation, useHistory} from 'react-router-dom';
import { deleteItem, getArticle, patchVotes} from '../api';
import Comments from './Comments';

const Article = ({isLoggedIn, user}) => {

  const[article, setArticle] =useState({});
  const[articleVotes, setArticleVotes] =useState(article.votes)
  const[hasVotedArticle, setHasVotedArticle] = useState(false)
  const[isArticleDeleted, setIsArticleDeleted] = useState(false);
  const search = useLocation().search;
  const article_id = new URLSearchParams(search).get('article_id')
  const history = useHistory()

  useEffect(() => {
    getArticle(article_id).then((response)=>{
      setArticle(response)
      setArticleVotes(article.votes)
    })
  },[article_id, article.votes])
  if(!isLoggedIn) return <div>Please Log in to view this page</div>
  if(!article.hasOwnProperty('article_id')) return 'Loading article ...';

  function patchArticleVotes(votes){
    setArticleVotes((currentVotes) => currentVotes += votes);
    setHasVotedArticle(true)
    patchVotes('articles',article_id,votes)
  }

  function deleteArticle(article_id){
    setIsArticleDeleted(true)
    console.log(article_id)
    deleteItem('articles',article_id).then((response)=> {}).catch((error)=>console.log(error))
  }

  console.log(articleVotes, typeof articleVotes)
  return (
    <div className="Article">
      {isArticleDeleted?<div>
      Article deleted<button onClick={() => history.push(`/articlesList?topic=${article.topic}`)}>Return to articles</button></div>: <section>
      <button onClick={() => history.push(`/articlesList?topic=${article.topic}`)}>Return to articles</button>
      <h2>{article.title}</h2> 
      <h3>Written by: {article.author}</h3>
      {user === article.author? <button onClick={() => {deleteArticle(article.article_id)}}>Delete article</button>:null}
      <h4>Created on: {article.created_at}</h4>
      <p>{article.body}</p>
      <button disabled={hasVotedArticle} onClick={()=>{patchArticleVotes(1)}}>Upvote</button>
      <p>Upvotes:{articleVotes}</p>
      <button disabled={hasVotedArticle} onClick={()=>{patchArticleVotes(-1)}}>Downvote</button>
      <Comments article={article} user={user}/>
      </section>}
      </div>
    );
};

export default Article;