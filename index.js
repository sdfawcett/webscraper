import puppeteer from "puppeteer";

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

main();