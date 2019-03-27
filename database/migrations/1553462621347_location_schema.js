'use strict'

const Schema = use('Schema')

class LocationSchema extends Schema {
  up () {
    this.create('locations', (table) => {
      table.increments()
      table.string('name')
      table.integer('number_of_males')
      table.integer('number_of_females')
      table.integer('location_id').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('locations')
  }
}

module.exports = LocationSchema
