const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.afro.who.int/countries/ghana/news';

axios.get(url)
  .then(response => {
    const $ = cheerio.load(response.data);
    const articleContainers = $('article.news');
    const articles = [];

    articleContainers.each((i, container) => {
      const title = $(container).find('h3.teaser-full__title').text().trim();
      const date = $(container).find('div.date').text().trim();
      const content = $(container).find('div.content').text().trim();
      const readMoreRelUrl = $(container).find('div.read_more a').attr('href');
      const readMoreFullUrl = 'https://www.afro.who.int' + readMoreRelUrl;
      const imageUrl = $(container).find('div.teaser-long__thumb img').attr('src');

      articles.push({ title, date, content, readMoreFullUrl, imageUrl });
    });

    console.log(JSON.stringify(articles));
  })
  .catch(error => console.log(error));