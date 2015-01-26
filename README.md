# Friendly Ghost
An command line web scraper for emails powered by [Casperjs](http://casperjs.org/), an extension of [Phantomjs](http://phantomjs.org/).

#### Setup

**Friendly Ghost** relies on Casperjs and Phantomjs.

The best way to install these is through [npm (node package manager)](https://www.npmjs.com/) via the terminal. The `-g` flag makes them accessible system-wide.

````sudo npm install -g phantomjs && sudo npm -g install casperjs````

Other installation options include [homebrew](http://brew.sh/) and [macports](https://www.macports.org/).

Check that the dependencies have installed by entering `which phantomjs` and `which casperjs`, which will tell you the locations of each binary.

Once you've downloaded casper and phantom, clone this repo with git or download its zipped contents using the link in the sidebar to the right.

#### Usage

First, add the sites you'd like to search for emails in the `links.txt` file, in the format:

````
http://www.somewebaddress.com
https://www.magazine.com/author/person/article/cool-stuff
http://ruleofthrees.net
````


(You can also save a `.csv` file as a `links.txt' and FG will read it correctly.)

Then using your terminal, navigate to the project's root directory with `cd` and enter this command to start the scraper:

````casperjs crawler.js````

That's it! FG will log updates on the search to the terminal while saving any discovered email addresses to an `emails.txt` file it will create in the project directory.

#### License

Copyright (c) 2015 Joe Marshall

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 