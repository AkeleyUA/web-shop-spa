const { Router } = require('express')
const bcrypt = require('bcrypt')
const config = require('config')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = Router()


router.post(
  ///api/auth/register
  '/register',
  [
    check('email', 'email incorrect').isEmail(),
    check('password', 'password incorrect').isLength({ min:6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некоректные данные регистрации"
        })
      }
      const { email, password } = req.body
      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: "Данный email уже зарегестрирован", errors: "this email has been used" })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword })
      await user.save()

      res.status(201).json({message: "Запрос на создание пользователя отправлен"})

    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу" })
    }
  }
)

router.post(
  '/login',
  [
    check('email', 'enter correct email').isEmail().normalizeEmail(),
    check('password', 'password incorrect').isLength({ min:6 })
  ],
  async (req, res) => {
    try {
      const error = validationResult(req)
      if (!error.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Данные некорректные"
        })
      }

      const { email, password } = req.body

      console.log(email, password)

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: "Такой пользователь не найден", errors: "user not found"})
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({message: "Пароль не совпадает", errors: "incorrect password"})
      }

      const token = jwt.sign(
        { userId: user.id, userEmail: user.email},
        config.get('jwtKey'),
        { expiresIn: '1h'}
      )
      
      res.status(200).json({ token, userId: user.id })
    
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу", errors: "something is wrong" })
    }
  }
)

module.exports = router