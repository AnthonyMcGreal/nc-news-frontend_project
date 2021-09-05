import {useState, useEffect} from 'react'
import { getComments, postNewComment } from '../api';
import Comment from './Comment'

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
        postNewComment(user, postCommentBody, article.article_id)}

    const moreComments = () => {
        setCommentsPage((currentPage) => currentPage+1)
        console.log(comments)
    }

    const newComment = {created_at: new Date(), body:postCommentBody,author:user,votes:0}

    const toggleComments = () => setOpenComments((currentToggle) => !currentToggle)

    return (
      <div className='Comments'>
        <button onClick={toggleComments}>{commentsCount} Comments</button>
        {openComments?<div>
            <form onSubmit={handleSubmitNewComment} id='postComment'>
                <label htmlFor='postCommentBody'> Comment:
                    <input id='postCommentBody' type='text' required value={postCommentBody} onChange={(event) => {
                        setPostCommentBody(event.target.value)
                    }}/>
                </label>
            <button type="submit">Post a new comment</button>
            </form>
        <ul>
        {displayNewComment? <div id="comment">
            <p>{newComment.author}, now </p>
            <p>{newComment.body} </p>
            <p>{newComment.votes}</p>
        </div>:null}   
        {comments.map((comment) => {
         return (
            <Comment comment={comment} user={user} setCommentsCount={setCommentsCount}/>
            )})}          
         <button disabled={isMoreArticles} onClick={() => {moreComments()}}>Load more comments</button>
         </ul>  
         </div>
        : null}
     </div>
    );
};

export default Comments;