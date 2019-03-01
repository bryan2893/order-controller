import axios from 'axios';

export const getFoods = function(callback){
    axios.get('/obtenerComidas').then((response)=>{
        console.log("Data devuelta por /menu = "+JSON.stringify(response.data));
        callback(null,response.data);
    },error => {
    if (error.response) {
        console.log("error.response"+error.response);

        //this.setState({err:error.response.message});

        console.log(error.response.data);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
            callback(error,null);
        } else if (error.request) {
            console.log("error.request: "+error.request);
            //this.setState({err:'error inesperado :-( !'});
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
            callback(error,null);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            //this.setState({err:error.message});
            callback(error,null);
        }
    });
};