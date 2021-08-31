import axios from 'axios'

export function getTopics(){
   return axios.get('https://news-app-anthony-mcgreal.herokuapp.com/api/topics')
    .then((response) => {
        return response.data.topics;
    })
}

export function getArticles(topic){
    return axios.get(`https://news-app-anthony-mcgreal.herokuapp.com/api/articles?topic=${topic}`)
    .then((response) => {
        return response.data.articles
    })
}

export function getArticle(article_id){
    return axios.get(`https://news-app-anthony-mcgreal.herokuapp.com/api/articles/${article_id}`)
    .then((response) => {
        return response.data.article
    })
}

export function getComments(article_id){
    return axios.get(`https://news-app-anthony-mcgreal.herokuapp.com/api/articles/${article_id}/comments`)
    .then((response) => {
        return response.data.comments
    })
}

export function getUsers(){
    return axios.get(`https://news-app-anthony-mcgreal.herokuapp.com/api/users`)
    .then((response) => {
        return response.data.users
    })
}

export function getUser(username){
    return axios.get(`https://news-app-anthony-mcgreal.herokuapp.com/api/users/${username}`)
    .then((response) => {
        return response.data.user
    })
}