const axios = require('axios');

const categories = [
  {
    name: 'Animals',
    children: [
      {
        name: 'Mammals',
        children: [
          {
            name: 'Lions',
          },
          {
            name: 'Elephants',
          },
          {
            name: 'Giraffe',
          },
        ],
      },
      {
        name: 'Birds',
        children: [
          {
            name: 'Penguins',
          },
          {
            name: 'Ostrich',
          },
        ],
      },
    ],
  },
  {
    name: 'Plants',
    children: [
      {
        name: 'Trees',
      },
      {
        name: 'Flowers',
      },
    ],
  },
];

const addCategory = async (parentId, category) => {
  axios.post('http://localhost:2100/api/v1/categories', {
    parentId,
    name: category.name,
  })
    .then((res) => {
      console.log(res.status);
      if (category.children) {
        category.children.forEach((child) => addCategory(res.data._id, child));
      }
    })
    .catch((error) => console.log(error.response.status));
};

const main = async () => {
  console.log('Going to delete current categories in DB');
  await axios.delete('http://localhost:2100/api/v1/categories')
    .then((res) => console.log(res.status))
    .catch((error) => console.log(error.response.status));
  console.log('Going to create new categories');
  categories.forEach((category) => addCategory(null, category));
};

main();
