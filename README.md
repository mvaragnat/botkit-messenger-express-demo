# Botkit demo for Messenger, using Express and Mongo

This app is a demo of using [Botkit](https://github.com/howdyai/botkit) to create a Facebook Messenger bot, using the MongoDB [adapter](https://github.com/howdyai/botkit-storage-mongo) for storage and [Express](http://expressjs.com) to server webpages.

The same demo for Slack bots can be found [here]()

## Features

* Serves webpages through standard express routes
``` app/routes/routes.js ```

* Uses Monkii as MongoDB driver
* Stores users ID when a new user clicks on "Send to Messenger"

## Configuration


Then, you need to set up several environment variables before using this app.

* For local deployment

Create a .env file at the root of the project with the following infos (you can modify and rename the existing .env-example file:

```

```

* For Heroku deployment

You can use MongoLab add-on to add Mongo storage, they have a free tier.

## Author
[Matthieu Varagnat](https://twitter.com/MVaragnat)

## Licence
Shared under [MIT licence](http://choosealicense.com/licenses/mit/)
