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

import puppeteer from 'puppeteer';

const checkBtn = (page: any) => {
  return new Promise(async (resolve, reject) => {
    await page.evaluate(() => {
      const res = document.evaluate(
        '//*[@id="__next"]/div[2]/div[1]/main/div[2]/div/div[2]/div/div[3]/div[2]/button',
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;
      if (res !== null) {
        reject('eroare');
      } else {
        resolve(true);
      }
    });
  });
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const url = 'https://altex.ro/telefoane/cpl/';

  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    // args: ['--proxy-server=http://localhost:3128'],
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });

  while (true) {
    try {
      await checkBtn(page);

      break;
    } catch {
      console.log('Retry....');
      await sleep(200);
    }
  }

  let data = await page.evaluate(() => {
    let size = document.querySelectorAll('a.Product');
    let phones: any = [];

    for (let i = 0; i < size.length; i++) {
      const photo = document.getElementsByClassName('Product-photo')[i];
      const name = document.getElementsByClassName('Product-nameHeading')[i];
      const priceInt = document.getElementsByClassName('Price-int')[i];
      const priceDec = document.getElementsByClassName('Price-dec')[i];
      const price =
        (priceInt as HTMLSpanElement).innerText +
        (priceDec as HTMLSpanElement).innerText;
      phones.push({
        id: i,
        photo: (photo as HTMLImageElement).src,
        name: (name as HTMLHeadElement).innerText,
        price: price,
      });
    }

    return phones;
  });

  console.log(data);

  await browser.close();
})();
