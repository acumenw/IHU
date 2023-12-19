var authorNameDefault;
var authorName;
var totalHits;
var url;

function startSearch() {
  clearContent();
  authorNameDefault = document.getElementById("authorName").value;
  authorName = authorNameDefault.split(" ").join("_");
  getAuthor(authorName);
}
function clearContent() {
  const publDataElement = document.getElementById("publData");
  const searchInfoElement = document.getElementById("searchInfo");

  if (publDataElement) {
    publDataElement.remove();
  }

  if (searchInfoElement) {
    searchInfoElement.innerHTML = "";
  }
}
function authorNotFound() {
  document
    .getElementById("searchInfo")
    .setAttribute("class", "warningMessages");
  document.getElementById("searchInfo").textContent =
    "No author found with the name: " + authorName + ", please try again";
}

function authorFound() {
  document
    .getElementById("searchInfo")
    .setAttribute("class", "successMessages");
  document.getElementById("searchInfo").textContent = "Author Found";
}

function setTable(authorList) {
  //create table
  var table = document.createElement("table");

  //create header row
  var headerRow = document.createElement("tr");

  //create title cell and append to row
  var title = document.createElement("th");
  var titleContent = document.createTextNode("Title");
  title.append(titleContent);

  //create venue cell and append to row
  var venue = document.createElement("th");
  var venueContent = document.createTextNode("Venue");
  venue.append(venueContent);

  //create year cell and append to row
  var year = document.createElement("th");
  var yearContent = document.createTextNode("Year");
  year.append(yearContent);

  //create type cell and append to row
  var type = document.createElement("th");
  var typeContent = document.createTextNode("Type");
  type.append(typeContent);

  //append cells to the header row
  headerRow.append(title, venue, year, type);

  //append header row to the table
  table.append(headerRow);

  //add data to table
  for (var i = 0; i < totalHits; i++) {
    //create new row
    var newRow = document.createElement("tr");

    //add title value to the row
    var newRowTitle = document.createElement("td");
    var newRowTitleContent = document.createTextNode(
      authorList.result.hits.hit[i].info.title
    );
    newRowTitle.append(newRowTitleContent);

    //add venue value to the row
    var newRowVenue = document.createElement("td");
    var newRowVenueContent = document.createTextNode(
      authorList.result.hits.hit[i].info.venue
    );
    newRowVenue.append(newRowVenueContent);

    //add year value to the row
    var newRowYear = document.createElement("td");
    var newRowYearContent = document.createTextNode(
      authorList.result.hits.hit[i].info.year
    );
    newRowYear.append(newRowYearContent);

    //add year value to the row
    var newRowType = document.createElement("td");
    var newRowTypeContent = document.createTextNode(
      authorList.result.hits.hit[i].info.type
    );
    newRowType.append(newRowTypeContent);

    //append values to the new row
    newRow.append(newRowTitle, newRowVenue, newRowYear, newRowType);

    //append new row to the table
    table.append(newRow);
  }

  //apend table to the body
  document.body.append(table);

  //set table attributes
  table.setAttribute("id", "publData");
}

function getAuthor(name) {
  url = "https://dblp.org/search/publ/api?q=author:" + name + ":&format=json";

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((authorList) => {
      totalHits = authorList.result.hits["@total"];
      if (totalHits <= 0) {
        authorNotFound();
      } else {
        authorFound();
        setTable(authorList);
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}
