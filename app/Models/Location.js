'use strict'

const Model = use('Model')

class Location extends Model {
  static get computed () {
    return ['total_number_of_residents']
  }

  getTotalNumberOfResidents ({ number_of_males, number_of_females }) {
    return number_of_males + number_of_females
  }
  /**
   * A relationship to get the locations nested within this location
   * 
   * @method locations
   * 
   * @return {Object}
   */
  locations () {
    return this.hasMany('App/Models/Location')
  }
}

module.exports = Location
