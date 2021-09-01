import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {getTopics, postNewTopic} from '../api'

const Topics = () => {

  const [topics, setTopics] = useState([]);
  const[isNewTopicOpen, setIsNewTopicOpen] = useState(false)
  const[postTopicSlug, setPostTopicSlug] = useState('')
  const[postTopicDescription, setPostTopicDescription] = useState('')

  
  useEffect(() => {
      getTopics().then((response)=> {
          setTopics(response)
      })
  },[])

  const handleSubmit= (event) => {
    event.preventDefault();
    console.log()
    postNewTopic(postTopicSlug,postTopicDescription).then((response) =>{
        console.log(response)
    }, (error) => {
        console.log(error)
    })
  }

  if(topics.length ===0 ) return 'Loading....'
  const toggleNewTopic = () => setIsNewTopicOpen((currentToggle) => !currentToggle)

    return (
        <div className="Topics">
            <ul>
                {topics.map((topic) => {
                    return (
                    <li key={topic.slug}>
                        <Link to={`/articlesList?topic=${topic.slug}`}>
                        {topic.slug}
                        </Link>
                        {topic.description}
                    </li>
                )})}
            </ul>

         <button onClick={toggleNewTopic}>Post a new topic</button>
         {isNewTopicOpen? 
         <form onSubmit={handleSubmit} id='postTopicSlug'>
         <label htmlFor='postTopicSlug'>Topic Name
         <input id='postTopicSlug' type='text' required value={postTopicSlug} onChange={(event) => {
           setPostTopicSlug(event.target.value)
         }}/></label>
         <label htmlFor='postTopicDescription'>Topic description
         <input id='postTopicDescription' type='text' required value={postTopicDescription} onChange={(event) => {
           setPostTopicDescription(event.target.value)
         }}/></label>
         <button type='submit'>Post topic</button>
         </form>:null}
        </div>
    );
};

export default Topics;