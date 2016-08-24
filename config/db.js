/* eslint-disable brace-style */
/* eslint-disable camelcase */
var db = require('monkii')
/**
 * botkit-storage-mongo - MongoDB driver for Botkit
 *
 * @param  {Object} config
 * @return {Object}
 */
module.exports = function (config) {
  if (!config || !config.mongoUri) {
    throw new Error('Need to provide mongo address.')
  }

  var Teams = db(config.mongoUri).get('teams')
  var Users = db(config.mongoUri).get('users')
  var Channels = db(config.mongoUri).get('channels')

  var unwrapFromList = function (cb) {
    return function (err, data) {
      if (err) return cb(err)
      cb(null, data)
    }
  }

  return {
    teams: {
      get: function (id, cb) {
        Teams.findOne({id: id}, unwrapFromList(cb))
      },
      save: function (data, cb) {
        Teams.findAndModify({
          id: data.id
        }, data, {
          upsert: true,
          new: true
        }, cb)
      },
      all: function (cb) {
        Teams.find({}, cb)
      }
    },
    users: {
      get: function (id, cb) {
        Users.findOne({id: id}, unwrapFromList(cb))
      },
      save: function (data, cb) {
        Users.findAndModify({
          id: data.id
        }, data, {
          upsert: true,
          new: true
        }, cb)
      },
      find_or_create: function (data, cb) {
        Users.findOne({
          id: data.id
        }, function (err, user) {
          if (err) {
            cb(err)
          }
          else if (!user) {
            Users.findAndModify({
              id: data.id
            }, data, {
              upsert: true,
              new: true
            }, cb)
          }
                    else {
            cb(null, user)
          }
        })
      },
      all: function (cb) {
        Users.find({}, cb)
      }
    },
    channels: {
      get: function (id, cb) {
        Channels.findOne({id: id}, unwrapFromList(cb))
      },
      save: function (data, cb) {
        Channels.findAndModify({
          id: data.id
        }, data, {
          upsert: true,
          new: true
        }, cb)
      },
      all: function (cb) {
        Channels.find({}, cb)
      }
    }
  }
}
/* eslint-disable brace-style */
/* eslint-disable camelcase */
