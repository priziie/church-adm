import axios from 'axios';

export const http = axios.create({
    baseURL: `http://localhost:8080/api/`
})

export const getCookie = (a)=>{
    var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    console.log(document.cookie)
    return b ? b.pop() : '';
}

export const setCookie = (cookieName, cookieValue)=>{
    document.cookie = cookieName+"="+cookieValue;
}