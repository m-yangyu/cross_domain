import Axios from 'axios';


const Server = Axios.create({
    baseURL: '/',
    timeout: 3000,
    responseType: 'json',
})

Server.interceptors.request.use(function(options){

    return options;

})

Server.interceptors.response.use(function(data){

    return data;

})

export default Server;