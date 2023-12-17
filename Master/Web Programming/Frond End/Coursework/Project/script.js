function searchAuthor() {
  var authorName = document.getElementById("authorName").value;
  //console.log(authorName);
}

function getAuthor() {
  //var authorName = document.getElementById("authorName");
  var authorName = "Christoph_Meinel";
  var url =
    "https://dblp.org/search/publ/api?q=author:" +
    authorName +
    ":&format=jsonp";

  console.log(authorName.value);
  fetch(url)
    .then((response) => {
      return response.text();
    })
    .then((authorList) => {
      document.getElementById("content").innerHTML = authorList;
      console.log(authorList);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}
