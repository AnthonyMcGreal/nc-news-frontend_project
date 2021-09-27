import {useState, useEffect} from 'react'
import { Link, useHistory} from 'react-router-dom'
import {getTopics, postNewTopic} from '../api'

const Topics = ({isLoggedIn}) => {

  const[topics, setTopics] = useState([]);
  const[isNewTopicOpen, setIsNewTopicOpen] = useState(false)
  const[postTopicSlug, setPostTopicSlug] = useState('')
  const[postTopicDescription, setPostTopicDescription] = useState('')

  const history = useHistory()

  
  useEffect(() => {
      getTopics().then((response)=> {
          setTopics(response)
      })
  },[])

  const handleSubmit= (event) => {
    event.preventDefault();
    setTopics((currentTopics) => {
      let array = [...currentTopics]
      array.push({slug:postTopicSlug, description:postTopicDescription})
      return array
    })
    postNewTopic(postTopicSlug,postTopicDescription)
  }
  
  if(!isLoggedIn) return <div>Please Log in to view this page</div>
  if(topics.length ===0 ) return 'Loading....'
  const toggleNewTopic = () => setIsNewTopicOpen((currentToggle) => !currentToggle)

    return (
        <div className="Topics">
          <h1>Choose A Topic To Browse Below</h1>
          <section>
            <button onClick={() => history.push(`/articlesList`)}>Browse all articles</button>
          </section>
            <section className="topicsList">
                {topics.map((topic) => {
                    return (
                        <Link to={`/articlesList?topic=${topic.slug}`}>
                        <p>{topic.slug}</p>
                        <p>{topic.description}</p>
                        </Link>
                )})}
            </section>

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