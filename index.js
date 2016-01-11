var express = require('express');
app = express();
var pg = require('pg');
app.use(express.static(__dirname + '/public'));
require('dotenv').load();

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'jade');

var router = express.Router();

var connectionString = 'postgres://localhost/food';

function runQuery (query, callback) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) { done() ; console.log(err); return; }
    client.query(query, function (err, results) {
      done();
      if (err) { console.log(err); return; }
      callback(results);
    });
  });
}

app.get('/', function (req, res) {
  runQuery("SELECT * FROM restaurants", function (results) {

    var restaurants = [];
    console.log(results.rows);
    for(var i = 0; i < results.rows.length; i++){
      var thisRestaurant = {
        id: results.rows[i]["id"],
        name: results.rows[i]["name"],
        location: results.rows[i]["location"],
        description: results.rows[i]["description"],
        rating: results.rows[i]["rating"],
        type: results.rows[i]["type"],
        url: results.rows[i]["url"]
      }

      var stars = "";
      for(var i = 0; i < thisRestaurant["rating"]; i++){
        stars += "<i class='fa fa-star'></i> "
      }

      thisRestaurant['stars'] = stars;

      restaurants.push(thisRestaurant);
    }
    console.log(restaurants);
    res.render("index", {allRestaurants:restaurants});
  });
})

app.get('/index', function (req, res) {
  runQuery("SELECT * FROM restaurants", function (results) {

    var restaurants = [];
    console.log(results.rows);
    for(var i = 0; i < results.rows.length; i++){
      var thisRestaurant = {
        id: results.rows[i]["id"],
        name: results.rows[i]["name"],
        location: results.rows[i]["location"],
        description: results.rows[i]["description"],
        rating: results.rows[i]["rating"],
        type: results.rows[i]["type"],
        url: results.rows[i]["url"]
      }

      var stars = "";
      for(var i = 0; i < thisRestaurant["rating"]; i++){
        stars += "<i class='fa fa-star'></i> "
      }

      thisRestaurant['stars'] = stars;

      restaurants.push(thisRestaurant);
    }
    console.log(restaurants);
    res.render("index", {allRestaurants:restaurants});
  });
})

app.get('/new', function (req, res) {
  res.render('new');
});

app.post('/new', function (req, res, next) {
  console.log(req.body.name);
  runQuery("INSERT INTO restaurants VALUES(DEFAULT,'"+req.body.name+"','"+req.body.location+"','"+req.body.description+"','"+req.body.rating+"','"+req.body.cuisine+"','"+req.body.image+"')", function (results) {
    res.redirect('/index');
  });
});

app.get('/edit/:id', function (req, res) {
  runQuery("SELECT * FROM restaurants WHERE id="+req.params.id, function (results) {

    var restaurants = [];
    for(var i = 0; i < results.rows.length; i++){
      var thisRestaurant = {
        id: results.rows[i]["id"],
        name: results.rows[i]["name"],
        location: results.rows[i]["location"],
        description: results.rows[i]["description"],
        rating: results.rows[i]["rating"],
        type: results.rows[i]["type"],
        url: results.rows[i]["url"]
      }

      restaurants.push(thisRestaurant);
    }
    res.render("edit", {allRestaurants:restaurants[0]});
  });
})

app.post('/edit/:id', function (req, res, next) {
  console.log(req.body.location);
  runQuery("UPDATE restaurants SET(name, location, description, type, url, rating)=('"+req.body.name+"','"+req.body.location+"','"+req.body.description+"','"+req.body.cuisine+"','"+req.body.image+"','"+req.body.rating+"') WHERE id = '"+ req.params.id + "'", function (results) {
    res.redirect('/index');
  });
  //UPDATE books SET("Author", "Title", "rating", "description") = (\''+req.body.author+'\',\''+req.body.title+'\',\''+req.body.rating+'\',\''+req.body.description+'\') WHERE id = \''+req.params.id+"\'",
})

app.get('/show/:id', function (req, res) {
  runQuery("SELECT * FROM restaurants WHERE id="+req.params.id, function (results) {

    var restaurants = [];
    for(var i = 0; i < results.rows.length; i++){
      var thisRestaurant = {
        id: results.rows[i]["id"],
        name: results.rows[i]["name"],
        location: results.rows[i]["location"],
        description: results.rows[i]["description"],
        rating: results.rows[i]["rating"],
        type: results.rows[i]["type"],
        url: results.rows[i]["url"]
      }

      var stars = "";
      for(var i = 0; i < thisRestaurant["rating"]; i++){
        stars += "<i class='fa fa-star'></i> "
      }

      thisRestaurant['stars'] = stars;

      restaurants.push(thisRestaurant);
    }
    res.render("show", {allRestaurants:restaurants[0]});
  });
});

app.get('/delete/:id', function (req, res) {
  runQuery('DELETE FROM restaurants WHERE id = \''+req.params.id+"\'", function (results1) {
    res.redirect('/index')
  })
});


app.listen(3000, function () {
  console.log("starting a server on localhost:3000");
});
