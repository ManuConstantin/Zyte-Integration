// const puppeteer = require('zyte-smartproxy-puppeteer');

// (async () => {
//     const browser = await puppeteer.launch({
//         spm_apikey: '095dee430d06407e8bb1656547d839a4'
//     });
//     console.log('Before new page');
//     const page = await browser.newPage();

//     console.log('Opening page ...');
//     try {
//         await page.goto('https://scrapeme.live/shop/', {timeout: 180000});
//     } catch(err) {
//         console.log(err);
//     }
//     console.log(await page.content())
//     // console.log('Taking a screenshot ...');


//     // await page.screenshot({path: 'screenshot.png'});
//     await browser.close();
// })();

// const puppeteer = require('puppeteer');

import puppeteer from 'puppeteer'


(async() => {
  const browser = await puppeteer.launch({
     ignoreHTTPSErrors: true,
    //  args: [ '--proxy-server=http://localhost:3128' ],
     headless: false 
  });
  const page = await browser.newPage();
  await page.goto('https://www.ebay.com/');
  // console.log(page.body);
  // await browser.close();
})();