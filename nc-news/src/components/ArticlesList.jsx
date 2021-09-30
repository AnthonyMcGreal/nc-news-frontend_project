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
  const[articlePosted,setArticlePosted] =useState(false)
  const[sortby, setSortby] = useState('created_at')
  const search = useLocation().search;
  const topic = new URLSearchParams(search).get('topic')
  const history = useHistory()
  
  useEffect(() => {
      getArticles(order, page, sortby, topic).then((response)=>{
        setArticles(response)
      })
  },[topic, order, page, sortby])

  if(!isLoggedIn) return <div>Please Log in to view this page</div>
  if(articles.length ===0 ) return 'Loading articles....'

  const handleSubmitArticle= (event) => {
    event.preventDefault();
    toggleNewArticle()
    setArticlePosted(true)
    setPostArticleTitle('')
    setPostArticleBody('')
    postNewArticle(user, postArticleTitle, postArticleBody, topic)
  }

  const handleSortByChange = (sortby) => {
    setSortby(sortby);
    getArticles(order, page, sortby, topic).then((response)=>{
    setArticles(response)
    })

  }

  const toggleNewArticle = () => {
    setIsNewArticleOpen((currentToggle) => !currentToggle)
    setArticlePosted(false)
  }

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
        <div className="articleListContainer">
          <div className="ArticleList">

          <button className="articlesListReturnButton"onClick={() => history.push("/topics")}>Return to topics</button>
          <label htmlFor="sort_by"> Sort results by :</label>
          <select onChange={(event) => {handleSortByChange(event.target.value)}} name="sort_by" id="sort_by">
            <option value="created_at">Date created</option>
            <option value="author">Author</option>
            <option value="votes">Votes</option>
            <option value="title">Title</option>
            </select>
          {order ==='asc'?<button className="articlesListOrderByButton" onClick={changeOrder}>Order by : Desc</button>:<button className="articlesListOrderByButton" onClick={changeOrder}>Order by : Asc</button>}
          <section>
            <button hidden={page===1} disabled={page===1} onClick={() => {changePage(-1)}}> {'<'} </button>
            {`Page ${page}`}
            <button hidden={articles.length<5} disabled={articles.length<5} onClick={() => {changePage(1)}}> {'>'} </button>
          </section>
          <section className="articleLinks">
            {articles.map((article) => {
              return (
                <Link key={article.article_id} to={`/article?article_id=${article.article_id}`}>
                  {article.title}
                </Link>
              )})} 
          </section>
          </div>

          <button onClick={toggleNewArticle}>Post a new article</button>
          {isNewArticleOpen? 
          <form onSubmit={handleSubmitArticle} id='postArticle'>
            <label htmlFor='postArticleTitle' id='postArticleTitle'>Title
            <input id='postArticleTitle' type='text' required value={postArticleTitle} onChange={(event) => {
              setPostArticleTitle(event.target.value)
            }}/></label>
            <label htmlFor='postArticleBody' id='postArticleBody'>Article
            <input id='postArticleBody' type='text' required value={postArticleBody} onChange={(event) => {
              setPostArticleBody(event.target.value)
            }}/></label>
            <button type='submit'>Post article</button>
          </form>:null}
          {articlePosted?"New article has been created":null}
        </div>
    );
};

export default ArticlesList;