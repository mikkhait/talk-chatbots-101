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
var bot = new builder.UniversalBot(connector);

var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/03aaf970-05b3-4dfe-b022-d00613f1e69b?subscription-key=46895040aaef4be2a828b15b22253c44&staging=true&verbose=true&timezoneOffset=0&q='

bot.recognizer(new builder.LuisRecognizer(model));

bot.dialog('aboutMe', [
  function (session) {
    // var msg = new builder.Message(session)
    //   .attachments([{
    //     contentType: "image/jpeg",
    //     contentUrl: "http://www.theoldrobots.com/images62/Bender-18.JPG"
    //   }]);
    // session.send(msg);
    session.endDialog('My name is Michael and I know how to build bots!');
  }
]).triggerAction({
  matches: 'about-me'
});

bot.dialog('myWork', [
  function (session) {
    session.endDialog('I am currently building bot platform Turbo.ai');
  }
]).triggerAction({
  matches: 'my-work'
});

bot.dialog('contactMe', [
  function (session) {
    session.endDialog('You can alway contact me at mkhait@gmail.com to tweet at me @mikkhait');
  }
]).triggerAction({
  matches: 'contact-me'
});
