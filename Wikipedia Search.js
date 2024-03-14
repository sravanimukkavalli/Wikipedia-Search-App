let searchResultsContainerEle = document.getElementById("searchResults");
let searchInputEle = document.getElementById("searchInput");
let spinnerEle = document.getElementById("spinner");
let limitInputEle = document.getElementById('limit');


function createAndAppendResult(result) {
    let resultContainer = document.createElement("div");
    resultContainer.classList.add("result-item");
    searchResultsContainerEle.appendChild(resultContainer);
    let {
        title,
        link,
        description
    } = result;
    let titleEle = document.createElement("a");
    titleEle.href = link;
    titleEle.target = "_blank";
    titleEle.textContent = title;
    titleEle.classList.add("result-title");
    resultContainer.appendChild(titleEle);

    let breakEle = document.createElement("br");
    resultContainer.appendChild(breakEle);

    let linkEle = document.createElement("a");
    linkEle.href = link;
    linkEle.target = "_blank";
    linkEle.textContent = link;
    linkEle.classList.add("result-url");
    resultContainer.appendChild(linkEle);

    let breakElement = document.createElement("br");
    resultContainer.appendChild(breakElement);

    let descriptionEle = document.createElement("p");
    descriptionEle.classList.add("link-description");
    descriptionEle.textContent = description;
    resultContainer.appendChild(descriptionEle);
}

function displayResults(searchResults) {
    spinnerEle.classList.toggle("d-none");
    let limitVal = parseInt(limitInputEle.value);
    let searchResult = searchResults.slice(0, limitVal);
    for (let result of searchResult) {
        createAndAppendResult(result);
    }
    limitInputEle.value = '';
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEle.classList.toggle("d-none");
        searchResultsContainerEle.textContent = "";
        let inputVal = searchInputEle.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + inputVal;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputEle.addEventListener("keydown", searchWikipedia)