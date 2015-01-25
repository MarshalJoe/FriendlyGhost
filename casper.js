var casper = require('casper').create();
var fs = require('fs');

// the default file to be read is "links.txt", if you use another file, change it here.
var file = "links.txt";
var output = "emails.txt";

var links = [];

var openStream = fs.open(file, 'r');

while(!openStream.atEnd()) {
    var line = openStream.readLine();
    links.push(line);
}

console.log("Sites to be searched:");

for (var l=0; l < links.length; l++) {
	console.log(links[l]);
}


casper.start().each(links, function (self, link) {
	self.thenOpen(link, function() {
		// print website title
		this.echo('Searching ' + this.getCurrentUrl());

		// GRAB EMAILS FROM LINKS
		// grab the "href" HTML attribute contents of every link and put them into an array
		var linkArray = this.getElementsAttribute('a', 'href');
		
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

		//GRAB EMAILS FROM HTML TEXT
		var text = this.getElementsInfo('p');

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
			console.log("No emails found on this page.");
		} else {
			for (email in emailArray) {
				console.log(emailArray[email]);
			}
		}

	});

});

casper.run();