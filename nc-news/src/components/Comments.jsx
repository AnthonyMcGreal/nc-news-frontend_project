import {useState, useEffect} from 'react'
import { getComments, postNewComment, patchVotes, deleteItem } from '../api';

const Comments = ({article, user}) => {
    
    const[comments, setComments] =useState([]);
    const[openComments, setOpenComments] = useState(false);
    const[postCommentBody, setPostCommentBody] = useState('');

    useEffect (() => {
        getComments(article.article_id).then((response)=> {
            setComments(response)
    })
},[article.article_id, comments])

    const handleSubmitNewComment = (event) =>{
        event.preventDefault();
            postNewComment(user, postCommentBody, article.article_id)}

    function patchCommentsVotes(number, id, comment){
        console.log(comment)
        comment.votes += number
        patchVotes('comments',id, number)
    }

    function deleteComment(comment_id){
        deleteItem('comments', comment_id)
    }

    const toggleComments = () => setOpenComments((currentToggle) => !currentToggle)

    return (
      <div>
        <button onClick={toggleComments}>{article.comment_count} Comments</button>
        {openComments? <ul>
            <form onSubmit={handleSubmitNewComment} id='postComment'>
                <label htmlFor='postCommentBody'> Comment:
                    <input id='postCommentBody' type='text' required value={postCommentBody} onChange={(event) => {
                        setPostCommentBody(event.target.value)
                    }}/>
                </label>
                <button type="submit">Post a new comment</button>
            </form>

        {comments.map((comment) => {
            return (
                <li key={comment.comment_id}>
                <p>{comment.author} on {new Date(comment.created_at)}</p>  
                <p>{comment.body} </p>
                <button onClick={()=>{patchCommentsVotes(1, comment.comment_id, comment)}}>Upvote</button>
                <p>Upvotes:{comment.votes}</p>
                <button onClick={()=>{patchCommentsVotes(-1, comment.comment_id, comment, comment.votes)}}>Downvote</button>
                {user === comment.author? <button onClick={() => {deleteComment(comment.comment_id)}}>Delete comment</button>:null}
                 </li>
        )
              })}
            </ul> : null}
        </div>
    );
};

export default Comments;