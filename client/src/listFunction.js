import axios from 'axios';
const API = '/api/tasks';


export const getList = () => {

    return axios
    .get(API , {
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res =>{
        return res.data;
    })

}


export const addToList = (task) => {
    return axios
    .post(API, 
    {list: task},
    {
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res =>{
        console.log(res);
    })
}


export const deleteItem = (task) => {
    return axios
    .delete(`${API}/${task}`, {
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res =>{
        console.log(res);
    })
    .catch((error) => {
        console.log(error);
    })
}


export const updateItem = (task, id) => {
    return axios
    .put(`${API}/${id}`, 
    {list: task},
    {
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res =>{
        console.log(res);
    })
}
