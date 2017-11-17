var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(3978, function () {
  console.log('bot server running on port 3978');
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
  appId: 'f3151b11-609e-42fe-9d70-7d2005ad40d8',
  appPassword: 'we8xGd0hk6Yt8sHUTRe1fpP'
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector, [
  function (session) {
    builder.Prompts.text(session, 'What is your name?');
  },
  function (session, results) {
    session.userData.name = results.response;
    session.endDialog('Hello %s', session.userData.name);
  }
]);
