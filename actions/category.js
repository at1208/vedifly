export const random_categories = () => {
   return fetch(`${process.env.NEXT_PUBLIC_SERVER_API}/categories/${process.env.NEXT_PUBLIC_DOMAIN_ID}`, {
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
