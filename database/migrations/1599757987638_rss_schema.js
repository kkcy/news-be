'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RssSchema extends Schema {
  up () {
    this.create('rsses', (table) => {
      table.increments()
      table.string('title')
      table.string('link')
      table.text('content')
      table.text('content_snippet')
      table.datetime('iso_date')
      table.timestamps()
    })
  }

  down () {
    this.drop('rsses')
  }
}

module.exports = RssSchema
