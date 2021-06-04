'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const User = use("App/Models/User");

class DatabaseSeeder {
  async run () {
    await User.create({
      username: "admin",
      email: "admin@news.com",
      password: "abcd1234",
      is_active: true,
      is_confirmed: true
    });
  }
}

module.exports = DatabaseSeeder
