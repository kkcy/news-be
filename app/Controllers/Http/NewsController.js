"use strict";
const axios = require("axios");
const News = use("App/Models/News");
const Rss = use("App/Models/Rss");
const moment = require("moment");
let Parser = require("rss-parser");
let parser = new Parser();
class NewsController {
  async getRss({ auth, response, request }) {
    try {
      const result = await axios.get(
        request.input("url", "https://www.liteforex.com/rss-smm/blog/")
      );
      // console.log(result)
      return response.status("200").send(result.data);
    } catch (error) {
      console.log(error);
      return response
        .status("400")
        .send({ success: false, message: "Get news failed" });
    }
  }

  async createRss({ auth, response, request }) {
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
      "https://news.instaforex.com/news"
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
              iso_date: moment(item.isoDate).format("YYYY-MM-DD HH:mm:ss")
            }
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    return response.status("200").send({ ok: true });
  }
  // https://gnews.io/api/v3/search?q=financial&token=0367e804756de2f49223ea55fe934a2d
  async getNews({ auth, response, request }) {
    try {
      const query = request.all();
      const limit = Number(query._limit) || 100;
      const offset = Number(query._offset) || 0;
      const getNews = await News.query().offset(offset).limit(limit).fetch();
      // console.log(result)
      return response
        .status("200")
        .send({ success: true, message: "Get news pass", data: getNews });
    } catch (error) {
      console.log(error);
      return response
        .status("400")
        .send({ success: false, message: "Get news failed" });
    }
  }

  async getNewsCount({ auth, response, request }) {
    try {
      const query = request.all();
      const limit = Number(query._limit) || 100;
      const getNewsCount = await News.query()
        .limit(limit)
        .count("id as count")
        .first();
      // console.log(result)
      return response.status("200").send({
        success: true,
        message: "Get news count pass",
        data: getNewsCount
      });
    } catch (error) {
      console.log(error);
      return response
        .status("400")
        .send({ success: false, message: "Get news count failed" });
    }
  }

  async getRss({ auth, response, request }) {
    try {
      const query = request.all();
      const limit = Number(query._limit) || 100;
      const offset = Number(query._offset) || 0;
      const getRss = await Rss.query().offset(offset).limit(limit).fetch();
      // console.log(result)
      return response
        .status("200")
        .send({ success: true, message: "Get rss pass", data: getRss });
    } catch (error) {
      console.log(error);
      return response
        .status("400")
        .send({ success: false, message: "Get rss failed" });
    }
  }

  async getRssCount({ auth, response, request }) {
    try {
      const query = request.all();
      const limit = Number(query._limit) || 100;
      const getRssCount = await Rss.query()
        .limit(limit)
        .count("id as count")
        .first();
      // console.log(result)
      return response.status("200").send({
        success: true,
        message: "Get rss count pass",
        data: getRssCount
      });
    } catch (error) {
      console.log(error);
      return response
        .status("400")
        .send({ success: false, message: "Get rss count failed" });
    }
  }
}

module.exports = NewsController;
