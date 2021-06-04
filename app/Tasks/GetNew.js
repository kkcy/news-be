"use strict";
const axios = require("axios");
const Task = use("Task");
const News = use("App/Models/News");
const moment = use("moment");

class GetNew extends Task {
  static get schedule() {
    return "0 */20 * * * *";
  }

  async handle() {
    this.info("Task GetNew handle");
    console.log("query news at : " + new Date());
    // https://gnews.io/api/v3/search?q=financial&token=0367e804756de2f49223ea55fe934a2d
    try {
      const result = await axios.get(
        "https://gnews.io/api/v3/search?token=0367e804756de2f49223ea55fe934a2d&max=100&q=forex"
      );
      const getNewsData = result.data.articles;
      for (let data of getNewsData) {
        const findData = await News.findBy("title", data.title);
        // console.log(data.publishedAt)
        if (findData == null) {
          await News.create({
            title: data.title,
            description: data.description,
            url: data.url,
            image: data.image,
            published_at: moment(data.publishedAt).format("YYYY-MM-DD HH:mm:ss")
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = GetNew;
