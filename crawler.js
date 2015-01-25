var casper = require('casper').create();
var fs = require('fs');

// the default file to be read is "links.txt", if you use another file, change it here.
var file = "links.txt";
var output = "emails.txt";

var links = [];

var openStream = fs.open(file, 'r');


console.log("The Friendly Ghost is a PR-bot that scrapes and saves email addresses into an emails.txt file. Sites to search:");

// read, log, and save links in an array
while(!openStream.atEnd()) {
    var line = openStream.readLine();
    links.push(line);
    console.log(line);
}

openStream.flush();
openStream.close();


casper.start().each(links, function (self, link) {
		self.thenOpen(link, function() {
			
			// GRAB EMAILS FROM LINKS AND HTML
			// grab the "href" HTML attribute and text content and put them into arrays
			try {
			var linkArray = this.getElementsAttribute('a', 'href');
			var text = this.getElementsInfo('p');
			this.echo('Searching ' + this.getCurrentUrl());

			} catch (e) {
				var text =[];
				var linkArray =[];
				console.log("Problem accessing page " + link + ' ' + e);
				return;
			}

			// regular expression for matching emails
			var emailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

			// Array containing the emails found
			var emailArray = [];

			// loop through every href, searching for an email address
			for(var i=0; i <= linkArray.length; i++) {
				
				var attribute = linkArray[i];
				
				// if it finds an email, save it
				if (emailRegex.test(attribute)) {
					var email = attribute;
					// first stripping any 'mailto's
					if (attribute.substring(0,7) === 'mailto:'); {
						email = attribute.substring(7);
					}
					emailArray.push(email);
				}

			}

			// check text snippets for emails, then save
			for(var k=0; k < text.length; k++) {
				var elementText = text[k].text
				if (emailRegex.test(elementText)) {
					var emailMatches = elementText.match(emailRegex);			
					emailArray.push(emailMatches[0]);
				}
			}

			// print out and write to file all the emails discovered for that url 
			if (emailArray.length == 0) { 
				console.log("No emails found.");
			} else {
				var downloadStream = fs.open('emails.txt', 'w');
				for (email in emailArray) {
					downloadStream.writeLine(emailArray[email]);
					console.log(emailArray[email]);
				}
				downloadStream.flush();
				downloadStream.close();
			}


		});

});

casper.run();