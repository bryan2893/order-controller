//Verfica si existe storage y en caso de que si devuelve el objeto, sino devuelve null.
export const verifySessionStorage = function(){
    if (typeof sessionStorage !== 'undefined'){
        return sessionStorage;
    }else{
        return null;
    }
};

export const getSessionStorage = function(){
    if (typeof sessionStorage !== 'undefined'){
        return sessionStorage;
    }else{
        return null;
    }
}