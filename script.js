SearchBar();

function bar(text) {
	console.log(text);
	var searchResultsContainer = document.querySelector("#searchResultsContainer");
	if (searchResultsContainer) {
		searchResultsContainer.remove(); // Remove previous search results
	}
	var div = document.createElement("div");
	div.className = "container";
	div.setAttribute("style", "margin-top:2em");
	div.id = "searchResultsContainer";

	var row = document.createElement("div");
	row.className = "row";

	for (var i = 0; i < text.length; i++) {
		var col = document.createElement("div");
		col.className = "col-lg-12";

		var word = text[i].word || "Word not found";
		var definition =
				text[i].meanings && text[i].meanings.length > 0
				? text[i].meanings[0].definitions[0].definition
				: "Definition not found";
		
		var phonetics = text[i].phonetics && text[i].phonetics.length > 0
			       ? text[i].phonetics[0].text
			       : "Phonetics not found";
		console.log(text[i].meanings[0].synonyms[0]);
		var partOfSpeech = text[i].meanings[0].partOfSpeech && text[i].meanings[0].partOfSpeech.length > 0
			       ? text[i].meanings[0].partOfSpeech
			       : "partOfSpeech not found";
		
		var synonyms = text[i].meanings[0].synonyms[0] && text[i].meanings[0].synonyms[0].length > 0
				  ? text[i].meanings[0].synonyms[0]
				  : "Synonyms not found";
		
		var sourceUrls =
				text[i].sourceUrls && text[i].sourceUrls.length > 0
				? text[i].sourceUrls[0]
				: "Source URL not found";

		col.innerHTML += `
				 <div class="card">
					    <h5 class="card-header">${word}</h5>
			<div class="card-body">
				   <h5 class="card-title">Phonetics: <span style="color:red">${phonetics}</span></h5>
					     <p class="card-text">Definition: <span style="color:red">${definition}</span></p>
			<p class="card-text">partOfSpeech: <span style="color:red">${partOfSpeech}</span></p>
				 <p class="card-text">Synonyms: <span style="color:red">${synonyms}</span></p>
			<p class="card-text">Source URL: <span style="color:red"><a href="${sourceUrls}">${sourceUrls}</a></span></p>
				 </div>
				 </div>`;

		row.append(col);
		div.append(row);
		document.body.appendChild(div);
	}
}

function SearchBar() {
	var searchDiv = document.createElement("div");
	searchDiv.className = "container mt-3";

	var searchRow = document.createElement("div");
	searchRow.className = "row justify-content-center";

	var searchBarCol = document.createElement("div");
	searchBarCol.className = "col-lg-6";

	var searchBar = document.createElement("input");
	searchBar.setAttribute("type", "text");
	searchBar.setAttribute("placeholder", "Enter a word to search");
	searchBar.setAttribute("id", "searchInput");

	var searchButton = document.createElement("button");
	searchButton.className = "btn btn-primary ml-2";
	searchButton.innerHTML = "Search";
	searchButton.addEventListener("click", searchWord);

	searchBarCol.appendChild(searchBar);
	searchBarCol.appendChild(searchButton);
	searchRow.appendChild(searchBarCol);
	searchDiv.appendChild(searchRow);
	document.body.appendChild(searchDiv);
}

function searchWord() {
	var searchInput = document.getElementById("searchInput").value;
	if (searchInput.trim() === "") {
		alert("Please Enter a word to search.");
		return;
	}
	fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`)
	      .then((data) => data.json())
	      .then((data) => {
		bar(data);
	})
	      .catch((error) => console.error("Error fetching data:", error));
}
