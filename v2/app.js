var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
server.listen(3978, function() {
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
  function(session) {
    builder.Prompts.text(session,'What is your name?');
  },
  function(session, results) {
    session.send('hello %s', results.response);
    builder.Prompts.choice(session, 'What can I help you with today?', 'About Me|My Work|Contact Me');
  },
  function(session, results) {
    switch(results.response.index) {
      case 0:
        session.endDialog('My name is Michael and I know how to build bots!');
        break;
      case 1:
        session.endDialog('I am currently building bot platform Turbo.ai');
        break;
      case 2:
        session.endDialog('You can alway contact me at mkhait@gmail.com to tweet at me @mikkhait');
        break;
    }
  }
]);
