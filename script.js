let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
  let { link, title, description } = result;

  let resultItemEl = document.createElement("div");
  resultItemEl.classList.add("result-item");

  let titleEl = document.createElement("a");
  titleEl.href = link;
  titleEl.target = "_blank";
  titleEl.textContent = title;
  titleEl.classList.add("result-title");
  resultItemEl.appendChild(titleEl);

  resultItemEl.appendChild(document.createElement("br"));

  let urlEl = document.createElement("a");
  urlEl.href = link;
  urlEl.target = "_blank";
  urlEl.textContent = link;
  urlEl.classList.add("result-url");
  resultItemEl.appendChild(urlEl);

  resultItemEl.appendChild(document.createElement("br"));

  let descriptionEl = document.createElement("p");
  descriptionEl.textContent = description;
  descriptionEl.classList.add("link-description");
  resultItemEl.appendChild(descriptionEl);

  searchResultsEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
  spinnerEl.classList.add("d-none");

  for (let result of searchResults) {
    createAndAppendSearchResult(result);
  }
}

function searchWikipedia(event) {
  // works in all environments
  if (event.key === "Enter" || event.keyCode === 13) {

    spinnerEl.classList.remove("d-none");
    searchResultsEl.innerHTML = "";

    let searchInput = searchInputEl.value.trim();

    if (searchInput === "") {
      spinnerEl.classList.add("d-none");
      return;
    }

    let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;

    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonData) {
        let { search_results } = jsonData;
        displayResults(search_results);
      })
      .catch(function(error) {
        console.log("Error:", error);
        spinnerEl.classList.add("d-none");
      });
  }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
