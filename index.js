/*import puppeteer from "puppeteer";

const url = "https://www.trainwell.net/exercises";

const main = async () => {
   const browser = await puppeteer.launch();
   const page = await browser.newPage();
   await page.goto(url);

   const allExercises = await page.evaluate(() => {
      const exercises = document.querySelectorAll('.collection-item-10');

      return Array.from(exercises).map((exercise) => {
         const title = exercise.querySelector('.text-block-12').innerText;
         const description = exercise.querySelector('.author-job-8').innerText;
         const url = exercise.querySelector('a.link-block-33').href;
         return { title, description, url }
      });
   });

   console.log(allExercises);
}

main();*/

// import the required library
import puppeteer from "puppeteer";
 
async function scrapeExercises(page) {
    // use page.$$ to find all matching elements on the current page
    const exerciseElementsHandle = await page.$$('.collection-item-10');
 
    // check if the elements are present
    if (exerciseElementsHandle.length > 0) {
        // iterate through each element and extract text content

        /*for (const exerciseElementHandle of exerciseElementsHandle) {
            const exerciseText = await page.evaluate(exerciseElement => exerciseElement.textContent, exerciseElementHandle);
            console.log(exerciseText);
        }*/
        
        const allExercises = await page.evaluate(() => {
         const exercises = document.querySelectorAll('.collection-item-10');
   
         return Array.from(exercises).map((exercise) => {
            const title = exercise.querySelector('.text-block-12').innerText;
            const description = exercise.querySelector('.author-job-8').innerText;
            const url = exercise.querySelector('a.link-block-33').href;
            return { title, description, url }
         });
      });
   
      console.log(allExercises);
    } else {
        console.log('No exercise elements found');
    }
}
 
(async () => {
    // launch the headless browser instance
    const browser = await puppeteer.launch({ headless: 'new' });
 
    // create a new page instance
    const page = await browser.newPage();
 
    // visit the target website
    await page.goto('https://www.trainwell.net/exercises', { timeout: 120000 });
 
    // call the function to scrape products on the current page
    await scrapeExercises(page);
 
    // set last page reached to false
    let lastPageReached = false;
 
    // keep scraping if not the last page
    while (!lastPageReached) {
        const nextPageLink = await page.$('.w-pagination-next');
 
        if (!nextPageLink) {
            console.log('No more pages. Exiting.');
            lastPageReached = true;
        } else {
            // click the next page link
            await nextPageLink.click();
 
            // wait for navigation to complete
            await page.waitForNavigation();
 
            // track the current URL
            const URL = page.url();
            console.log(URL);
 
            // call the function to scrape products on the current page
            await scrapeExercises(page);
        }
    }
 
    // close the browser
    await browser.close();
})();
