var path = require('path');


module.exports = function(app) {
  // Server routes =========================================
  // Handles things like API calls and authentication

  // GET: INDEX
  // app.get('/api/things', function(req, res) {
  //   console.log("GET /api/things");
  //   Game.find(function(err, things) {
      
  //     // Nothing after 'res.send(err)' executes. It returns.
  //     if (err)
  //       res.json(err);

  //     res.json(things);
  //   });
  // });

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

  // 500px callback routes - bypass Angular entirely, just save the cookie and close.
  app.get('/500px/callback.html', function(req, res) {
    console.log("GET: 500px/callback.html");
    res.sendFile('callback.html', { root: path.join(__dirname, '../public') });    
  });


  // Client routes =========================================

  // Angular will handle all front-end routes, SPA-style. Just send it there.
  app.get('*', function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../public') });
  });
};