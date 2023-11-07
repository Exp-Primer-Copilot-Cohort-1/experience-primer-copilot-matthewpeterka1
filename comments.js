// Create web server for comment
// 2019-07-15

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var template = require('./lib/template.js');
var compression = require('compression');
var helmet = require('helmet');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var flash = require('connect-flash');
var db = require('./lib/db');
var topicRouter = require('./routes/topic');
var authRouter = require('./routes/auth');

// middleware
app.use(helmet());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}))
app.use(flash());

// custom middleware
app.get('*', function(request, response, next) {
  fs.readdir('./data', function(error, filelist) {
    request.list = filelist;
    next();
  });
});

// route, routing
// app.get('/', function(request, response) {
//   var title = 'Welcome';
//   var description = 'Hello, Node.js';
//   var list = templateList(request.list);
//   var html = template.HTML(title, list,
//     `<h2>${title}</h2>${description}`,
//     `<a href="/create">create</a>`
//   );
//   response.send(html);
// });

// app.get('/page/:pageId', function(request, response) {
//   var filteredId = path.parse(request.params.pageId).base;
//   fs.readFile(`data/${filteredId}`, 'utf8', function(err, description) {
//     var title = request.params.pageId;
//     var sanitizedTitle = sanitizeHtml(title);
//     var sanitizedDescription = sanitizeHtml(description, {
//       allowedTags:['h1']
//     });
//     var list = templateList(request.list);
//     var html = template.HTML(sanitizedTitle, list,
//       `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
//       `<a href="/create">create</a>
//        <a href="/update/${sanitizedTitle}">update</a>
//        <form action="/delete_process"