# Botkit demo for Messenger, using Express and Mongo

This app is a demo of using [Botkit](https://github.com/howdyai/botkit) to create a Facebook Messenger bot, using the MongoDB [adapter](https://github.com/howdyai/botkit-storage-mongo) for storage and [Express](http://expressjs.com) to serve webpages.

The same demo for Slack bots can be found [here](https://github.com/mvaragnat/botkit-express-demo)

## Features

* Serves webpages through standard express routes
``` app/routes/routes.js ```

* Uses Monkii as MongoDB driver

* Stores users ID when a new user clicks on "Send to Messenger"

* Offers a welcome message when user clicks on "Send to Messenger", replies to Hello, and generally just repeats what you just said

## Configuration

* For local deployment

There are quite a number of steps to set up a Facebook bot

1) Create a Facebook page. Add Page ID in .env file (rename the .env-demo file)

2) Create a Facebook app. Add App ID in .env file

3) Add Messenger to your App, then select the Page, to generate a Page Access token. Add Token in .env file

4) install localtunnel to your computer, then use this command to make it available for webhooks
```
lt --subdomain yourappname --port 5000
```

5) Add Webhooks to your app

5.1) Choose a verify token, add it to the .env file as well

5.2) Set the app webhook url to https://yourappname.localtunnel.me/webhook

5.3) Restart your server and click verify

* For Heroku deployment

Add Page ID, App ID, and token as environement variables.
Change the webhook route to match your deployed domain name.

You can use MongoLab add-on to add Mongo storage, they have a free tier.

## Contributions & style
Contributions are more than welcome!
In terms of style, I use [standard style](https://github.com/feross/standard) with camelcase and brace-style disabled.

## Author
[Matthieu Varagnat](https://twitter.com/MVaragnat)

## Licence
Shared under [MIT licence](http://choosealicense.com/licenses/mit/)
