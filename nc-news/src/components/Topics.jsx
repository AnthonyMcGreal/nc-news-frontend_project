import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {getTopics} from '../api'

const Topics = () => {

  const [topics, setTopics] = useState([]);

  
  useEffect(() => {
      getTopics().then((response)=> {
          setTopics(response)
      })
  },[])

  if(topics.length ===0 ) return 'Loading....'

    return (
        <div className="Topics">
            <ul>
                {topics.map((topic) => {
                    return (
                    <li key={topic.slug}>
                        <Link to={`/articlesList?topic=${topic.slug}`}>
                        {topic.slug}
                        </Link>
                    </li>
                )})}
                </ul>
        </div>
    );
};

export default Topics;