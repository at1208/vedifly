import fetch from 'isomorphic-fetch';

export const blog_list = (data) => {
   return fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/blog/list/domain/${process.env.NEXT_PUBLIC_DOMAIN_ID}`, {
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

export const author_list = () => {
   return fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/author/list/${process.env.NEXT_PUBLIC_DOMAIN_ID}`, {
    method: 'GET',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
   })
   .then(response => {
       return response.json();
   })
   .catch(error => {
       console.log(error)
   });
}

export const read_blog = (slug) => {
   return fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/blog/${slug}`, {
    method: 'GET',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
   })
   .then(response => {
       return response.json();
   })
   .catch(error => {
       console.log(error)
   });
}


export const trending_list = () => {
   return fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/blog/trending/list/${process.env.NEXT_PUBLIC_DOMAIN_ID}`, {
    method: 'GET',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
   })
   .then(response => {
       return response.json();
   })
   .catch(error => {
       console.log(error)
   });
}

export const related_blogs = (data) => {
   return fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/blog/related/list/${process.env.NEXT_PUBLIC_DOMAIN_ID}`, {
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


export const blogs_list_for_sitemap = () => {
   return fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/blog/list/sitemap/${process.env.NEXT_PUBLIC_DOMAIN_ID}`, {
    method: 'GET',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
   })
   .then(response => {
       return response.json();
   })
   .catch(error => {
       console.log(error)
   });
}

export const blogs_list_by_category = (data) => {
   return fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/blog/list/category/${process.env.NEXT_PUBLIC_DOMAIN_ID}`, {
    method: 'POST',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category: data })
   })
   .then(response => {
       return response.json();
   })
   .catch(error => {
       console.log(error)
   });
}
