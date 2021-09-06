import axios from 'axios'

export function getTopics(){
   return axios.get('https://news-app-anthony-mcgreal.herokuapp.com/api/topics')
    .then((response) => {
        return response.data.topics;
    })
}

export function getArticles(order,page,sortby,topic){
    if(topic){
    return axios.get(`https://news-app-anthony-mcgreal.herokuapp.com/api/articles?topic=${topic}&order=${order}&limit=5&page=${page}&sort_by=${sortby}`)
    .then((response) => {
        return response.data.articles
    })
} else {return axios.get(`https://news-app-anthony-mcgreal.herokuapp.com/api/articles?order=${order}&limit=5&page=${page}&sort_by=${sortby}`)
.then((response) => {
    return response.data.articles
})}}

export function getArticle(article_id){
    return axios.get(`https://news-app-anthony-mcgreal.herokuapp.com/api/articles/${article_id}`)
    .then((response) => {
        return response.data.article
    })
}

export function getComments(article_id, page){
    return axios.get(`https://news-app-anthony-mcgreal.herokuapp.com/api/articles/${article_id}/comments?limit=5&page=${page}`)
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

export function postNewComment(username, commentBody, article_id){
    return axios.post(`https://news-app-anthony-mcgreal.herokuapp.com/api/articles/${article_id}/comments`,{
        username:username,
        body:commentBody
    }).then((response)=> {
        return response
    })  
}

export function postNewArticle(author, title, body, topic){
    return axios.post(`https://news-app-anthony-mcgreal.herokuapp.com/api/articles`,{
        author:author,
        title:title,
        body:body,
        topic:topic
    }).then((response) => {
        return response
    })
}

export function postNewTopic(slug,description){
    return axios.post(`https://news-app-anthony-mcgreal.herokuapp.com/api/topics`,{
        slug:slug,
        description:description
    }).then((response) => {
        return response
    })
}

export function patchVotes(patchLocation,id,votes){
    return axios.patch(`https://news-app-anthony-mcgreal.herokuapp.com/api/${patchLocation}/${id}`,{
        inc_votes:votes
    }).then((response) => {
        return response
    })
}

export function deleteItem(deletePath,id){
    return axios.delete(`https://news-app-anthony-mcgreal.herokuapp.com/api/${deletePath}/${id}`)
}