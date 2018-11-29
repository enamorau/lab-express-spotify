const express = require('express')
const app     = express()
const hbs     = require('hbs') 
const path     = require("path")

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public'))); // <------------- i don't understand these three lines


// spotify API
var SpotifyWebApi = require('spotify-web-api-node');


var clientId = '4d42b7b10aed4b3ba067b8e3f77135ef',
    clientSecret = 'c2ca53d020134e52aed14059b36b6026';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});


app.get('/', function (req, res) {
  res.render("home")
})

var results;

app.get('/artists', function (req, res) {
    
    //res.send(req.query.artist)


    spotifyApi.searchArtists(req.query.artist)
    .then(data => {
      console.log("wouhou") 
      
      let results = {
        artists: data.body.artists.items
      }
      console.log(results)
      res.render('artists',results);
      
    })
    .catch(err => {
        console.log("ouha")
    })
    
})


hbs.registerPartials(__dirname + '/views/partials');




app.listen(3000, () => console.log('Example app listening on port 3000!'))