'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.boolean('is_confirmed').notNullable().defaultTo(false)
      table.boolean('is_active').notNullable().defaultTo(false)
    })
  }

  down () {
    // this.drop('users')
  }
}

module.exports = UserSchema
