/* eslint-disable brace-style */
/* eslint-disable camelcase */
var Request = require('request')

module.exports = function (controller) {
  // subscribe to page events
  Request.post('https://graph.facebook.com/me/subscribed_apps?access_token=' + process.env.FACEBOOK_PAGE_TOKEN,
    function (err, res, body) {
      if (err) {
        controller.log('Could not subscribe to page messages')
      }
      else {
        controller.log('Successfully subscribed to Facebook events:', body)
        console.log('Botkit can now receive messages')

        // start ticking to send conversation messages
        controller.startTicking()
      }
    })

  var url = 'https://graph.facebook.com/v2.6/me/thread_settings?access_token=' + process.env.FACEBOOK_PAGE_TOKEN

  // set up CTA for FB page
  var form1 = {
    'setting_type': 'call_to_actions',
    'thread_state': 'new_thread',
    'call_to_actions': [
      {
        'payload': 'optin'
      }
    ]
  }

  Request.post(url, {form: form1}, function (err, response, body) {
    if (err) {
      console.log(err)
    }
    else {
      console.log('CTA added', body)
    }
  })

  // set up persistent menu
  var form2 = {
    'setting_type': 'call_to_actions',
    'thread_state': 'existing_thread',
    'call_to_actions': [
      {
        'type': 'postback',
        'title': 'Item 1',
        'payload': 'Item 1'
      },
      {
        'type': 'postback',
        'title': 'Item 2',
        'payload': 'Item 2'
      }
    ]
  }

  Request.post(url, {form: form2}, function (err, response, body) {
    if (err) {
      console.log(err)
    }
    else {
      console.log('permanent menu added', body)
    }
  })

  // set up greetings
  var form3 = {
    'setting_type': 'greeting',
    'greeting': {
      'text': 'Your greetings message'
    }
  }

  Request.post(url, {form: form3}, function (err, response, body) {
    if (err) {
      console.log(err)
    }
    else {
      console.log('greetings added', body)
    }
  })
}

/* eslint-disable brace-style */
/* eslint-disable camelcase */
