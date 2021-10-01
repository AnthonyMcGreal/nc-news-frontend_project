import {useState, useEffect} from 'react'
import { getComments, postNewComment } from '../api';
import Comment from './Comment'
import moment from 'moment';

const Comments = ({article, user}) => {
    
    const[comments, setComments] =useState([]);
    const[openComments, setOpenComments] = useState(false);
    const[postCommentBody, setPostCommentBody] = useState('');
    const[commentsPage, setCommentsPage] = useState(1);
    const[isMoreArticles, setIsMoreArticles] = useState(false);
    const[displayNewComment, setDisplayNewComment] = useState (false)
    const[commentsCount, setCommentsCount] = useState (+article.comment_count)

    useEffect (() => {
        getComments(article.article_id, commentsPage).then((response)=> {
            if(response<5) setIsMoreArticles(true)
            setComments((currentComments) =>{
                let array = [...currentComments]
                return array.concat(response)
            })
    })
    },[article.article_id, commentsPage])

    const handleSubmitNewComment = (event) =>{
        event.preventDefault();
        setCommentsCount((currentCount) => currentCount += 1)
        setDisplayNewComment(true)
        postNewComment(user, postCommentBody, article.article_id)
        setPostCommentBody('')
    }

    const moreComments = () => {
        setCommentsPage((currentPage) => currentPage+1)
    }

    const newComment = {created_at: new Date().toString(), body:postCommentBody,author:user,votes:0}
    
    const toggleComments = () => setOpenComments((currentToggle) => !currentToggle)
    
    return (
      <div className='Comments'>
          
        {openComments?<button onClick={toggleComments}>Hide Comments</button>:<button onClick={toggleComments}>View Comments ({commentsCount})</button>}
        {openComments?<div>
            <form onSubmit={handleSubmitNewComment} id='postComment'>
                <label className="postCommentBodyLabel" htmlFor='postCommentBody'> New comment : 
                    <textarea id='postCommentBody' type='text' required value={postCommentBody} onChange={(event) => {
                        setPostCommentBody(event.target.value)
                    }}/>
                </label>
            <button type="submit">Post a new comment</button>
            </form>
       
        {displayNewComment? <div id="comment">
            <p>{newComment.author} on {moment.utc(`${newComment.created_at}`).format('DD/MM/YY')} </p>
            <p>{newComment.body} </p>
            <p>{newComment.votes}</p>
        </div>:null} 
        <ul>  
        {comments.map((comment) => {
         return (<li key={comment.comment_id} id="comment">
            <Comment comment={comment} user={user} setCommentsCount={setCommentsCount}/>
            </li>
            )})} 
        </ul>         
         <button hidden={isMoreArticles} disabled={isMoreArticles} onClick={() => {moreComments()}}>Load more comments</button> 
         {isMoreArticles? <p>No more comments</p>: null}
         </div>
        : null}
     </div>
    );
};

export default Comments;