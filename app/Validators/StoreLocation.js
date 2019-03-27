'use strict'

class StoreLocation {
  get rules () {
    return {
      name: 'required|unique:locations',
      number_of_males: 'required|integer',
      number_of_females: 'required|integer'    }
  }
}

module.exports = StoreLocation
