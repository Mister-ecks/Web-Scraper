//Requiring our packages
const axios = require("axios");
const express = require("express");
const cheerio = require("cheerio");
const PORT = 8000;
const app = express();

//Web scraping
const url = "https://punchng.com/";
axios(url)
  .then((res) => {
    const data = res.data;
    const $ = cheerio.load(data);
    const articles = [];
    $(".entry-title", data).each(function () {
      const headline = $(this).text();
      const url = $(this).find("a").attr("href");
      articles.push({
        headline,
        url,
      });
    });
    console.log(articles);
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(() => {
  console.log(`Server is currently running on port ${PORT}`);
});
