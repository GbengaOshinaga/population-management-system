'use strict'

const Factory = use('Factory')
const Location = use('App/Models/Location')
const { test, trait, before } = use('Test/Suite')('Location')

trait('Test/ApiClient')

let location

before(async () => {
  location = await Factory.model('App/Models/Location').make()
})

test('can store population data for a location', async ({ assert, client }) => {
  const response = await client.post('locations').send({
    name: location.name,
    number_of_males: location.number_of_males,
    number_of_females: location.number_of_females
  }).end()

  response.assertStatus(201)

  const savedLocation = await Location.findBy('id',response.body.data.id)
  assert.equal(savedLocation.name, location.name)
})

test('can get data for all locations', async ({ assert, client }) => {
  const response = await client.get('locations').end()

  response.assertStatus(200)
  assert.equal(response.body.data.length, 1)
})

test('can update data for a location', async ({ assert, client }) => {
  let savedLocation = await Location.firstOrFail()
  const response = await client.put(`locations/${savedLocation.id}`).send({
    number_of_males: 15,
    number_of_females: 35
  }).end()

  response.assertStatus(200)

  savedLocation = await Location.firstOrFail()

  assert.equal(savedLocation.number_of_males, 15)
  assert.equal(savedLocation.number_of_females, 35)
})

test('should return message for invalid id', async ({ assert, client }) => {
  const response = await client.put(`locations/id`).send({
    number_of_males: 15,
    number_of_females: 35
  }).end()
  
  response.assertStatus(400)
  assert.equal(response.body.message, 'Location id must be a number')
})

test('can delete a location', async ({ assert, client }) => {
  let savedLocation = await Location.firstOrFail()
  const response = await client.delete(`locations/${savedLocation.id}`).end()

  response.assertStatus(200)

  savedLocation = await Location.find(savedLocation.id)

  assert.isNull(savedLocation)
})