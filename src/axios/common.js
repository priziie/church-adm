import axios from 'axios';

export const http = axios.create({
    baseURL: `api/`
})

export const getCookie = (a)=>{
    var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    console.log(document.cookie)
    return b ? b.pop() : '';
}