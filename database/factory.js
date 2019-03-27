'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Location', (faker) => {
  return {
    name: faker.city(),
    number_of_males: faker.integer({ min: 20, max: 10000 }),
    number_of_females: faker.integer({ min: 20, max: 10000 })
  }
})
