"use strict";
const axios = require("axios");
const Task = use("Task");
const moment = use("moment");
let Parser = require("rss-parser");
let parser = new Parser();
const Rss = use("App/Models/Rss");

class GetRss extends Task {
  static get schedule() {
    return "0 0 1 * * *";
  }

  async handle() {
    this.info("Task GetRss handle");
    console.log("query rss at : " + new Date());
    const rssLinks = [
      "https://www.cnbc.com/id/19836768/device/rss/rss.html",
      "https://www.liteforex.com/rss-smm/blog/",
      "https://www.cnbc.com/id/15839069/device/rss/rss.html",
      "https://www.cnbc.com/id/10001054/device/rss/rss.html",
      "https://www.cnbc.com/id/19746125/device/rss/rss.xml",
      "https://www.cnbc.com/id/20910258/device/rss/rss.html",
      "https://www.ft.com/?format=rss",
      "https://www.cnbc.com/id/10000664/device/rss/rss.html",
      "https://economictimes.indiatimes.com/rssfeedsdefault.cms",
      "https://www.cnbc.com/id/100727362/device/rss/rss.html",
      "https://www.financemagnates.com/feed/",
      "https://www.cnbc.com/id/100003114/device/rss/rss.html",
      "https://news.instaforex.com/news",
    ];
    // https://gnews.io/api/v3/search?q=financial&token=0367e804756de2f49223ea55fe934a2d
    for (let url of rssLinks) {
      try {
        const newFeed = await parser.parseURL(url);
        if (!newFeed.hasOwnProperty("items")) continue;
        for (const item of newFeed.items) {
          await Rss.findOrCreate(
            { title: item.title, link: item.link },
            {
              title: item.title,
              link: item.link,
              content: item.content,
              content_snippet: item.contentSnippet,
              iso_date: moment(item.isoDate).format("YYYY-MM-DD HH:mm:ss"),
            }
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

module.exports = GetRss;
