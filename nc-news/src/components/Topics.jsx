import {useState, useEffect} from 'react'
import axios from 'axios'

const Topics = () => {

  const [topics, setTopics] = useState([]);

  const getTopics = useEffect(() => {
      axios.get('https://news-app-anthony-mcgreal.herokuapp.com/api/topics')
      .then((response) => {
          let array = response.data.topics
          console.log(response, 'array')
          setTopics(array)
      })
  },[])
  console.log(topics)
    return (
        <div className="Topics">
            <ul>
                {topics.map((topic) => {
                    return <p>{topic.slug}</p>
                })}
            </ul>
        </div>
    );
};

export default Topics;