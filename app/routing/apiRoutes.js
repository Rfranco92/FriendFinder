// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends, etc.
// ===============================================================================

var friends = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a form of questions
  // Then the server saves the data to the friends array and shows who is most compatible with that user.)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {

    var topscore = 40;
    var topName = "";
    var topPhoto = "";
    var userData = {
      name: req.body.name,
      photo: req.body.photo,
      scores: req.body['scores[]']
    };

    for (var i = 0; i < userData.scores.length; i++){
          var result = parseInt(userData.scores[i]);
          userData.scores[i] = result;
        }

    console.log(userData)
    friends.push(userData);
    //var userScores = userData.scores;
    //console.log(userScores);
    for(var i = 0; i < friends.length-1; i++){
      var currentscore = 0;
      for(var j = 0; j < userData.scores.length; j++){
        if (friends[i].scores[j] > userData.scores[j]){
          currentscore += (friends[i].scores[j] - userData.scores[j]);
        }
        else{
          currentscore += (userData.scores[j] - friends[i].scores[j]);
        }
      }
      if (currentscore < topscore){
        topscore = currentscore;
        topName = friends[i].name;
        topPhoto = friends[i].photo;
      }
    }
    console.log(topName);
    console.log(topPhoto);
    var topfigure = [{
              name: topName,
              photo: topPhoto,
            }
    ]

    res.json(topfigure);
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware
  });
};
