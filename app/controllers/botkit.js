//CONFIG===============================================

/* Uses the slack button feature to offer a real time bot to multiple teams */
var Botkit                = require('botkit');
var mongoUri              = process.env.MONGOLAB_URI || 'mongodb://localhost/demo'
var db                    = require('../../config/db')({mongoUri: mongoUri})

var controller = Botkit.facebookbot({
  debug: true,
  access_token: process.env.FACEBOOK_PAGE_TOKEN,
  verify_token: process.env.FACEBOOK_VERIFY_TOKEN,
  storage: db
})

var bot = controller.spawn({})

console.log('botkit')

// this is triggered when a user clicks the send-to-messenger plugin
controller.on('facebook_optin', function(bot, message) {
    bot.reply(message, 'Welcome, friend');
})

// user said hello
controller.hears(['hello'], 'message_received', function(bot, message) {

    bot.reply(message, 'Hey there.');

})

// user says anything else
controller.hears('(.*)', 'message_received', function(bot, message) {

    bot.reply(message, 'you said ' + message.match[1])

})



//this function processes the POST request to the webhook
var handler = function(obj){
  controller.debug('GOT A MESSAGE HOOK');
  if (obj.entry) {
    for (var e = 0; e < obj.entry.length; e++) {
      for (var m = 0; m < obj.entry[e].messaging.length; m++) {
        var facebook_message = obj.entry[e].messaging[m];

        console.log(facebook_message)

        //normal message
        if (facebook_message.message) {

          var message = {
              text: facebook_message.message.text,
              user: facebook_message.sender.id,
              channel: facebook_message.sender.id,
              timestamp: facebook_message.timestamp,
              seq: facebook_message.message.seq,
              mid: facebook_message.message.mid,
              attachments: facebook_message.message.attachments,
          }

          //save if user comes from m.me adress or Facebook search
          create_user_if_new(facebook_message.sender.id, facebook_message.timestamp)

          controller.receiveMessage(bot, message);
        }
        //clicks on a postback action in an attachment
        else if (facebook_message.postback) {

          // trigger BOTH a facebook_postback event
          // and a normal message received event.
          // this allows developers to receive postbacks as part of a conversation.
          var message = {
              payload: facebook_message.postback.payload,
              user: facebook_message.sender.id,
              channel: facebook_message.sender.id,
              timestamp: facebook_message.timestamp,
          };

          controller.trigger('facebook_postback', [bot, message]);

          var message = {
              text: facebook_message.postback.payload,
              user: facebook_message.sender.id,
              channel: facebook_message.sender.id,
              timestamp: facebook_message.timestamp,
          };

          controller.receiveMessage(bot, message);

        }
        //When a user clicks on "Send to Messenger"
        else if (facebook_message.optin) {

          var message = {
              optin: facebook_message.optin,
              user: facebook_message.sender.id,
              channel: facebook_message.sender.id,
              timestamp: facebook_message.timestamp,
          };

          //save if user comes from "Send to Messenger"
          create_user_if_new(facebook_message.sender.id, facebook_message.timestamp)

          controller.trigger('facebook_optin', [bot, message]);
        }
        //message delivered callback
        else if (facebook_message.delivery) {

          var message = {
              optin: facebook_message.delivery,
              user: facebook_message.sender.id,
              channel: facebook_message.sender.id,
              timestamp: facebook_message.timestamp,
          };

          controller.trigger('message_delivered', [bot, message]);

        }
        else {
          controller.log('Got an unexpected message from Facebook: ', facebook_message);
        }
      }
    }
  }
}

var create_user_if_new = function(id, ts){
  controller.storage.users.get(id, function(err, user){
    if(err){
      console.log(err)
    }
    else if(!user){
      controller.storage.users.save({id: id, created_at: ts})
    }
  })
}

exports.handler = handler
