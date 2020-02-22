document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  //console.log(value);
  //fetch the weather

    let today = new Date();
    let year = today.getFullYear()
    let month = today.getMonth()+1
    if(month < 10) {
      month = "0" + month
    }

    let days = today.getDate();
    let todayDate = year + month + days;

    const url3 = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=" + value + "&facet_field=day_of_week&facet=true&begin_date=" + todayDate + "&end_date=" + todayDate +"&api-key=A9GvUQ0sCKiROdI0LvnAvLPfwVVQAPEZ";
    fetch(url3)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
       // console.log(json);
       let results = "";
       if(json.response.docs.length !== 0) {
         for (let i=0; i < json.response.docs.length; i++) {
           results += "<div id=\"aticle\">";

           results += "<a href=\"" + json.response.docs[i].web_url +"\">";
           results += "<h2>" + json.response.docs[i].headline.main + "</h2>";
           results += "</a>";


           results += "<p>" + json.response.docs[i].lead_paragraph + "</p>";
           results += "<p>catagory: " + json.response.docs[i].section_name;
           if(json.response.docs[i].subsection_name !== undefined) {
             results += " " + json.response.docs[i].subsection_name+"</p>";
           }
           results += "<a href=\"" + json.response.docs[i].web_url +"\">";
           results += "<h5>" + json.response.docs[i].web_url + "</h5>";
           results += "</a>";


           results += "</div>";
         }
         results += "<div id=\"resultsOfSearch\">";
         results += "<p>" + json.response.docs.length + " articles found</p>";
         results += "</div>";
       }
       else {
         results += "<div id=\"resultsOfSearch\">";
         results += "<p>No articles found with \'" + value + "\'</p>";
         results += "<p>Please search again!</p>";
         results += "</div>";
       }

        document.getElementById("allArticles").innerHTML = results;
      });
});
