//Install express server
const sslRedirect = require('heroku-ssl-redirect');
const express = require('express');
const path = require('path');

const app = express();

// enable ssl redirect
app.use(sslRedirect());

// Serve only the static files form the dist directory
app.use(express.static('./dist/trauxweb'));

app.get('/*', (req,res)=>{
  res.sendFile(path.join(__dirname, '/dist/trauxweb/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
