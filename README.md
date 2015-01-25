# Friendly Ghost
An Email Web Scraper powered by Casperjs and Phantomjs

#### Setup

**Friendly Ghost** uses [Casperjs](http://casperjs.org/), an extension of [Phantomjs](http://phantomjs.org/), an open-source headless browser using Webkit built in Javascript, to search sites for email addresses.

The best way to install these is npm via the terminal. The `-g` flag installs the packages system-wide.

````sudo npm install -g phantomjs && sudo npm -g install casperjs````

Other installation options include [homebrew](http://brew.sh/) and [macports](https://www.macports.org/).

Check that the dependencies have installed by entering `which phantomjs` and `which casperjs`, which will tell you their current location.

Once you've downloaded casper and phantom, clone this repo with git or download its zipped contents using the link in the sidebar to the right.

#### Usage

First, add the sites you'd like to scrape for email addresses in the `links.txt` file, in the format:

````
http://www.somewebaddress.com
https://www.magazine.com/author/person/article/cool-stuff
http://ruleofthrees.net
````

You can also save a `.csv` file as a `links.txt' and it will format it correctly.

Then using your terminal, navigate to the project's root directory with `cd` and enter this command to start the scraper:

````casperjs crawler.js````

That's it! FG will log updates on the search to the terminal while saving any discovered email addresses to an `emails.txt` file it will create in the project directory.
 