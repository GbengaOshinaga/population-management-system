'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UserController {
  async store({ auth, request, response }) {
    try {
      const { email, password } = request.all()
      const user = await User.create({
        email,
        password
      })

      const token = await auth.generate(user)

      return response.send({ message: 'Sign up successful', token })  
      
    } catch (error) {
      return response.status(400).send({ error })
    }
  }

  async login({ auth, request, response }) {
    try {
      const { email, password } = request.all()
      const user = await User.findBy('email', email)

      if (!user) return response.unauthorized({ message: 'Invalid email or password' })

      const isTheSamePassword = await Hash.verify(password, user.password)

      if (isTheSamePassword) {
        const token = await auth.generate(user)
        return response.send({ message: 'Login successful', token })
      }

      return response.unauthorized({ message: 'Invalid phone number or password' }) 
    } catch (error) {
      return error
    }
  }
}

module.exports = UserController
