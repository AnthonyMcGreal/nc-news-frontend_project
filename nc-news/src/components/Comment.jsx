import {patchVotes, deleteItem} from '../api'
import {useState} from 'react'

const Comment = ({comment, user, setCommentsCount}) => {

    const [upvotes, setUpvotes] =useState(comment.votes)
    const [isUpvoted, setIsUpvoted] = useState(false)
    const [isDownvoted, setIsDownvoted] = useState(false)
    const [commentDeleted, setCommentDeleted] = useState(false)


    function patchCommentsVotes(number, id){
        setUpvotes((currentVotes) => currentVotes += number);
        if(number>0) setIsUpvoted(true)
        if(number<0) setIsDownvoted(true)
        patchVotes('comments',id, number)
    }

    function deleteComment(comment_id){
        setCommentsCount((currentCount) => currentCount += 1)
        setCommentDeleted(true)
        deleteItem('comments', comment_id)
    }

    return (
        <li key={comment.comment_id} id="comment">
            {commentDeleted?
            "The comment has been deleted":<section>
                <p>{comment.author} on {comment.created_at}</p>  
                <p>{comment.body} </p>
                <button disabled={isUpvoted}onClick={()=>{patchCommentsVotes(1, comment.comment_id, comment)}}>Upvote</button>
                <p>Upvotes : {upvotes}</p>
                <button disabled={isDownvoted}onClick={()=>{patchCommentsVotes(-1, comment.comment_id, comment, comment.votes)}}>Downvote</button>
                {user === comment.author? <button onClick={() => {deleteComment(comment.comment_id)}}>Delete comment</button>:null}
                </section>}
        </li>
    );
};

export default Comment;