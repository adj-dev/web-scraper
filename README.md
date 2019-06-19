# web-scraper
A simple web scraper app that uses **cheerio**, **mongoose**, and **axios**. 

## How to Use

Click on the scrape button to generate a list of articles from [infoworld.com](https://www.infoworld.com/category/web-development/). Once the articles are rendered you then have the option to save an article, which adds it to the "saved articles" page where you are free to make a note attached to each saved article. Only saved articles can have notes. Also, the app will no scrape for articles that have already been saved, this prevents duplicate articles and helps to keep the app cleaner. 

### Adding notes

When adding a note you will be asked to enter your name in addition to the note. Because there is no authentication anyone who visits the site has access to the note and can edit it at will: this is the nature of this application. Once a note is created, it can be edited or deleted. Unsaving an article will also delete a note.

### Additional mentions

Once a user hits the 'scrape' button there is no way to clear out the results unless I manually clear out the db. That being said, if there are no scrape results in the database then the user will see a message that says, "Scrape to populate this page". Likewise, the user will find a "Save some articles to populate this page" message on the page of saved articles if no articles have been saved. 
