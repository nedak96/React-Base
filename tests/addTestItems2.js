const randomWords = require('random-words');
const _ = require('lodash');
const axios = require('axios');

const main = async () => {
  let categories = await axios.get('http://localhost:2100/api/v1/categories')
    .then((res) => res.data.docs);
  categories = categories.filter((category) => (
    !categories.some((cat) => cat.parentId === category._id)
  ));
  console.log('Going to delete current items in DB');
  await axios.delete('http://localhost:2100/api/v1/items')
    .then((res) => console.log(res.status))
    .catch((error) => console.log(error.response.status));
  console.log('Going to create new items');
  _.times(100, async () => {
    const category = _.sample(categories);
    axios.post('http://localhost:2100/api/v1/items', {
      title: randomWords({ min: 3, max: 5 }).join(' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
      author: randomWords({ exactly: 2 }).join(' ').replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
      description: `${randomWords({ min: 4, max: 5, wordsPerString: 10 }).join('. ')}.`,
      image: await axios.get(`https://source.unsplash.com/1600x900/?${category.name}`).then((res) => res.request.res.responseUrl),
      category: category._id,
    })
      .then((res) => console.log(res.status))
      .catch((error) => console.log(error.response.status));
  });
};

main();
