const cheerio = require("cheerio");
const superagent = require("superagent"); // 用来抓取html页面
const fs = require("fs");

const weiboURL = "https://s.weibo.com";
const hotSearchURL = weiboURL + "/top/summary?cate=realtimehot";
const eventSearchURL = weiboURL + "/top/summary?cate=socialevent";

// 获取微博热点
function getWeiboHotSearch () {
  return new Promise((resolve, reject) => {
    superagent.get(hotSearchURL, (err, res) => {
      if (err) {
        reject(err);
        return console.error(err);
      }
      const $ = cheerio.load(res.text);
      let hotList = [];
      $("#pl_top_realtimehot table tbody tr").each(function (index) {
        if (index !== 0) {
          const $td = $(this).children().eq(1);
          const link = weiboURL + $td.find('a').attr('href');
          const text = $td.find('a').text();
          const hotValue = $td.find('span').text();
          const icon = $td.find('img').attr('src')
          hotList.push({
            index,
            link,
            text,
            hotValue,
            icon: icon ? 'https:' + icon : ''
          });
        }
      })
      hotList.length ? resolve(hotList) : reject(err)
    });
  })
}

getWeiboHotSearch().then(hotList => {
  fs.writeFileSync(
    `${__dirname}/hotSearch.json`,
    JSON.stringify(hotList),
    "utf-8"
  );
})
