'use strict'

const Location = use('App/Models/Location')

class LocationController {
  async index ({ response }) {
    try {
      const locations = await Location.query().with('locations').fetch()
    
      return response.send({ data: locations })
    } catch (error) {
      return response.send({ error })
    }
  }

  async store ({ request, response }) {
    try {
      const location = await Location.create(
        request.only(['name', 'number_of_males', 'number_of_females', 'location_id']))
        
      return response.created({ data: location })
    } catch (error) {
      return response.send({ error })
    }
  }

  async update ({ params, request, response }) {
    try {
      const { id } = params
      if (isNaN(id)) {
        return response.status(400).send({ message: 'Location id must be a number' })
      }
      const location = await Location.findBy('id', id)
        
      location.name = request.input('name') || location.name
      location.number_of_males = request.input('number_of_males') || location.male_count
      location.number_of_females = request.input('number_of_females') || location.female_count
        
      await location.save()
    
      return response.ok({ data: location })

    } catch (error) {
      return response.send({ error })
    }
    }

    async destroy ({ params, response }) {
      try {
        const { id } = params
        if (isNaN(id)) {
          return response.status(400).send({ message: 'Location id must be a number' })
        }
        const location = await Location.findBy('id', id)
      
        await location.delete()
        return response.send({ message: 'Location deleted successfully' })  
      } catch (error) {
        return response.send({ error })
      }
    }
    
}

module.exports = LocationController
