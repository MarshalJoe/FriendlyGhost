var casper = require('casper').create();



casper.start('http://bughunting.guide/', function() {
	this.echo(this.getTitle());
})

casper.thenOpen('http://bughunting.guide/the-bug-hunt-intro-to-cross-site-scripting-xss/', function() {
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

	// print all the emails found
	for(var j=0; j < emailArray.length; j++) {
		this.echo(emailArray[j]);
	}

})

casper.run();