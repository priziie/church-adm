
export const getCookie = (a)=>{
    var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

export const setCookie = (cookieName, cookieValue)=>{
    document.cookie = cookieName+"="+cookieValue;
}

export const deleteCookie = (cookieName)=>{
    document.cookie = cookieName+"= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
}
