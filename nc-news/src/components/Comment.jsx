import {patchVotes, deleteItem} from '../api'
import {useState} from 'react'
import moment from 'moment';

const Comment = ({comment, user, setCommentsCount}) => {

    const [upvotes, setUpvotes] =useState(comment.votes)
    const [hasVoted, setHasVoted] = useState(false)
    const [commentDeleted, setCommentDeleted] = useState(false)


    function patchCommentsVotes(number, id){
        setUpvotes((currentVotes) => currentVotes += number);
        setHasVoted(true)
        patchVotes('comments',id, number)
    }

    function deleteComment(comment_id){
        setCommentsCount((currentCount) => currentCount -= 1)
        setCommentDeleted(true)
        deleteItem('comments', comment_id)
    }

    return (
        <section>
            {commentDeleted?
            "The comment has been deleted":<section>
                <p>{comment.author} on {moment.utc(`${comment.created_at}`).format('DD/MM/YY')}</p>  
                <p>{comment.body} </p>
                <p>Upvotes : {upvotes}</p>
                <button disabled={hasVoted}onClick={()=>{patchCommentsVotes(1, comment.comment_id, comment)}}>Upvote</button>
                <button disabled={hasVoted}onClick={()=>{patchCommentsVotes(-1, comment.comment_id, comment, comment.votes)}}>Downvote</button>
                {user === comment.author? <button onClick={() => {deleteComment(comment.comment_id)}}>Delete comment</button>:null}
                </section>}
                </section>
    );
};

export default Comment;