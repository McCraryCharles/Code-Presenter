if (typeof updateInterval === 'undefined') { // If the update interval has not been defined before loading this AJAX JS library
	updateInterval = 5000; // Go ahead and define the update interval as 500ms (5sec)
}

function ajax (file, data, cb) { // Uses AJAX to load a php file, data is optional, Data is formatted as var=data&var2=data2
	var xmlhttp; // Declares the xmlhttp object
	if (window.XMLHttpRequest) { // Code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else { // Code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	// AJAX created
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200) { // When AJAX request has been served
			if ( typeof cb === 'function' ) { // If arg "cb" was a function (which it should be)
				//alert('Is a function!');
				cb(xmlhttp.responseText); // Run the function assigned to "cb" with the AJAX response as the argument
			}
		}
	};
	var location = file + "?t=" + Math.random(); // Apending random time to end of request URL to avoid caching
	xmlhttp.open("POST",location,true); // Opens the request, sets method to POST, sets location per input, sets asynchronous mode to true
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // Sets content type
	xmlhttp.send(data); // Sends POST data
}

function ajaxToId(file, data, id) { // Uses AJAX to load a file into the InnerHTML of an element by ID, rate is based on DB config
	ajax(file, data, function(response){  // Calls the ajax() function
			document.getElementById(id).innerHTML = response; // Assigns AJAX response to the element by ID
		});
}

function loadPage(page, data) { // Uses AJAX to load a page
	ajaxToId('php/pages/' + page + '.php', data, 'page-container');
}

function contentToId(id){
	ajaxToId('php/assetList.php','',id); // Immediately runs an AJAX call to load the content ASAP
	if (window.updateInterval !== 0) { // If config updateInterval is 0, ajax call will be made once and not repeat
		window.setInterval(function(){ // Sets the JS interval to repeat the AJAX call
			ajax('php/db/ajaxCallHandler.php', 'content=lastUpdate', function(response){ // Calls the ajax() function
				var existing = document.getElementById('contentUpdateRef').innerHTML;
				if (response != existing) {
					ajaxToId('php/assetList.php','',id);
				}
			});
			
		},updateInterval); // Last arg is the interval (in ms) to run the AJAX call
	}
}