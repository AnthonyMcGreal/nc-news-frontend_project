import {useState, useEffect} from 'react'
import { useLocation, Link } from 'react-router-dom';
import { getArticles, postNewArticle } from '../api';

const ArticlesList = () => {

  const[articles,setArticles] = useState([]);
  const[isNewArticleOpen, setIsNewArticleOpen] = useState(false)
  const[postArticleAuthor, setPostArticleAuthor] = useState('')
  const[postArticleTitle, setPostArticleTitle] = useState('')
  const[postArticleBody, setPostArticleBody] =useState('')
  const search = useLocation().search;
  const topic = new URLSearchParams(search).get('topic')


  useEffect(() => {
      getArticles(topic).then((response)=>{
        setArticles(response)
      })
  },[topic])

  if(articles.length ===0 ) return 'Loading articles....'

  const handleSubmit= (event) => {
    event.preventDefault();
    postNewArticle(postArticleAuthor, postArticleTitle, postArticleBody, topic)
  }

  const toggleNewArticle = () => setIsNewArticleOpen((currentToggle) => !currentToggle)


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

          <button onClick={toggleNewArticle}>Post a new article</button>
          {isNewArticleOpen? 
          <form onSubmit={handleSubmit} id='postArticle'>
            <label htmlFor='postArticleAuthor'>Author
            <input id='postArticleAuthor' type='text' required value={postArticleAuthor} onChange={(event) => {
              setPostArticleAuthor(event.target.value)
            }}/></label>
            <label htmlFor='postArticleTitle'>Title
            <input id='postArticleTitle' type='text' required value={postArticleTitle} onChange={(event) => {
              setPostArticleTitle(event.target.value)
            }}/></label>
            <label htmlFor='postArticleBody'>Article
            <input id='postArticleBody' type='text' required value={postArticleBody} onChange={(event) => {
              setPostArticleBody(event.target.value)
            }}/></label>
            <button type='submit'>Post article</button>
          </form>:null}
        </div>
    );
};

export default ArticlesList;