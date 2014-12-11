var path = require('path');
var City = require('./models/city');

module.exports = function(app) {
  //// Server routes =========================================
  // Handles things like API calls and authentication

  // GET: INDEX
  app.get('/api/cities', function(req, res) {
    console.log("GET /api/cities");

    City.find(function(err, cities) {
      if (err)
        res.json(err);

      res.json(cities);
    });
  });

  // app.post('/api/things', function(req, res) {
  //   console.log("POST /api/things");
    
  //   var thing = new Game();
  //   thing.name = req.name;

  //   thing.save(function (err) {
  //     if (err) {
  //       return console.log(err);
  //     }
  //   });

  //   return res.json(thing);
  // });



  //// Client routes =========================================

  // 500px callback routes - bypass Angular entirely, just save the cookie and close.
  app.get('/500px/callback.html', function(req, res) {
    console.log("GET: 500px/callback.html");
    res.sendFile('callback.html', { root: path.join(__dirname, '../public') });    
  });

  // Angular will handle all front-end routes, SPA-style. Just send it there.
  app.get('*', function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../public') });
  });
};