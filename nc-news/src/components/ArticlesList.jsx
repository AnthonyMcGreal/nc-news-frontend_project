import {useState, useEffect} from 'react'
import { useLocation, Link, useHistory } from 'react-router-dom';
import { getArticles, postNewArticle } from '../api';

const ArticlesList = ({isLoggedIn, user}) => {

  const[articles,setArticles] = useState([]);
  const[isNewArticleOpen, setIsNewArticleOpen] = useState(false);
  const[postArticleTitle, setPostArticleTitle] = useState('');
  const[postArticleBody, setPostArticleBody] =useState('');
  const[page, setPage] = useState(1);
  const[order, setOrder] =useState('asc');
  const search = useLocation().search;
  const topic = new URLSearchParams(search).get('topic')
  const history = useHistory()
  
  useEffect(() => {
      getArticles(topic, order, page).then((response)=>{
        setArticles(response)
      })
  },[topic, order, page])

  if(!isLoggedIn) return <div>Please Log in to view this page</div>
  if(articles.length ===0 ) return 'Loading articles....'

  const handleSubmitArticle= (event) => {
    event.preventDefault();
    postNewArticle(user, postArticleTitle, postArticleBody, topic)
  }

  const toggleNewArticle = () => setIsNewArticleOpen((currentToggle) => !currentToggle)

  const changeOrder = () => {
    if (order === 'asc') {
      setOrder('desc')
    } else {
      setOrder('asc')
    }
  }

  const changePage = (value) => {
    setPage((cPage) => {
     return cPage + value
    })
  }


    return (
        <div className="ArticleList">
          <button onClick={() => history.push("/topics")}>Return to topics</button>
          {order==='asc'?<button onClick={changeOrder}>Order by:Desc</button>:<button onClick={changeOrder}>Order by:Asc</button>}
          <section>
            <button disabled={page===1}onClick={() => {changePage(-1)}}> {'<'} </button>
            {`Page ${page}`}
            <button disabled={articles.length<5}onClick={() => {changePage(1)}}> {'>'} </button>
          </section>
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
          <form onSubmit={handleSubmitArticle} id='postArticle'>
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