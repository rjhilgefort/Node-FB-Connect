
/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', {});
};

/*
 * GET channel.html for facebook
 */
exports.channel = function(req, res){
  res.render('channel', {});
};

/*
 * POST ajax call to get facebook info from user auth token
 */
exports.getFacebookInfo = function(req, res){
  var graph = require('fbgraph');
  var authResponse = req.body.authResponse; //shortcut
  var user = {}; // return object

  //check the request object
  // console.log(authResponse);

  graph.setAccessToken(authResponse.accessToken);
  graph.get("/me", function(err, graphResponse) {

    //
    // do databse transactions
    //

    //assign return values
    user.name = graphResponse.name;
    user.id = graphResponse.id;
    user.home = graphResponse.link;

    //send response
    res.contentType('json');
    res.send(JSON.stringify(user));
  });
};