import fetch from 'isomorphic-fetch';
import cookie from 'js-cookie';


export const one_tap_login = (data) => {
   return fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/google/onetap/login`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
   })
   .then(response => {
       return response.json();
   })
   .catch(error => {
       console.log(error)
   });
}



export const signout = next => {
    removeCookie('token');
    removeLocalStorage('user');
    next();
};


export const setCookie = (key, value) => {
    if (process.browser) {
        cookie.set(key, value, {
            expires: 1
        });
    }
};


export const removeCookie = key => {
    if (process.browser) {
        cookie.remove(key, {
            expires: 1
        });
    }
};


export const getCookie = key => {
    if (process.browser) {
        return cookie.get(key);
    }
};


export const setLocalStorage = (key, value) => {
    if (process.browser) {
        localStorage.setItem(key, JSON.stringify(value));
    }
};


export const removeLocalStorage = key => {
    if (process.browser) {
        localStorage.removeItem(key);
    }
};


export const authenticate = (data, next) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
};


export const isAuth = () => {
    if (process.browser) {
        const cookieChecked = getCookie('token');
        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};
