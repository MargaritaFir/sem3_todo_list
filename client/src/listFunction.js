import axios from 'axios';


export const getList = () => {

    return axios
    .get("api/getData" , {
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res =>{
        return res.data;
    })

}


export const addToList = (task) => {
    return axios
    .post("api/addData", 
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
    .delete(`api/deleteData/${task}`, {
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
    .put(`api/updateData/${id}`, 
    {list: task},
    {
        headers: {'Content-Type' : 'application/json'}
    })
    .then(res =>{
        console.log(res);
    })
}
