import {useState, useEffect} from 'react'
import { getComments } from '../api';

const Comments = ({article}) => {
    
    const[comments, setComments] =useState([]);
    const[openComments, setOpenComments] = useState(false);

    useEffect (() => {
        getComments(article.article_id).then((response)=> {
            setComments(response)
    })
},[article.article_id])

    const toggleComments = () => setOpenComments((currentToggle) => !currentToggle)
    
    return (
        <div>
            <button onClick={toggleComments}>{article.comment_count} Comments</button>
            {openComments? <ul>
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