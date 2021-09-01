import {useState, useEffect} from 'react'
import { getComments, postNewComment } from '../api';

const Comments = ({article}) => {
    
    const[comments, setComments] =useState([]);
    const[openComments, setOpenComments] = useState(false);

    const[postUsername, setPostUsername] = useState('');
    const[postCommentBody, setPostCommentBody] = useState('')

    useEffect (() => {
        getComments(article.article_id).then((response)=> {
            setComments(response)
    })
},[article.article_id])

    const handleSubmit = (event) =>{
        event.preventDefault();

        console.log(postUsername, postCommentBody, article.article_id)
            postNewComment(postUsername, postCommentBody, article.article_id).then((response) => {
                console.log(response)
            }, (error) => {
                console.log(error)
            })
    }

    const toggleComments = () => setOpenComments((currentToggle) => !currentToggle)
    
    return (
        <div>
            <button onClick={toggleComments}>{article.comment_count} Comments</button>
            {openComments? <ul>
                <form onSubmit={handleSubmit} id='postComment'>
                    <label htmlFor='postUsername'> Username:
                        <input id='postUsername' type='text' required  value={postUsername} onChange={(event) => {
                            setPostUsername(event.target.value)
                        }}/></label>
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
                        <p>{comment.author} on {comment.created_at}</p>  
                        <p>{comment.body} </p>
                        <p>Upvotes:{comment.votes}</p>
                      </li>
                  )
              })}
            </ul> : null}
        </div>
    );
};

export default Comments;