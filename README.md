Node-FB-Connect
===============

Demo project that allows users to login to Facebook via the JavaScript API. 
The authToken is then passed to a Node.js server (utilizing the Express framework) 
where the authToken is used to call the Facebook Graph API to retrieve some
information about the user. This data is then passed back to the client and 
injected into the page.

Rest assured, none of your FB data is saved or analyzed in any way. Check the [routes/index.js](https://github.com/rjhilgefort/Node-FB-Connect/blob/master/routes/index.js) to see what parts of the FB profile is consumed.

Resources used: Node.js, Express, Swig, Heroku, criso/fbgraph, jQuery, Bootstrap 3, Font Awesome 3.2, Facebook APIs.

Demo
----
http://evening-escarpment-8472.herokuapp.com/
