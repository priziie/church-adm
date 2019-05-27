
export const getCookie = (a)=>{
    var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

export const setCookie = (cookieName, cookieValue)=>{
    document.cookie = cookieName+"="+cookieValue;
}