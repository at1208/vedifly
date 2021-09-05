export const random_categories = () => {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/categories/${process.env.NEXT_PUBLIC_DOMAIN_ID}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const category_by_slug = (slug) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/category/${process.env.NEXT_PUBLIC_DOMAIN_ID}/${slug}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const category_list_by_domain = (data) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/categoryList/${process.env.NEXT_PUBLIC_DOMAIN_ID}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
