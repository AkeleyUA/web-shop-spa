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
    check('email', 'email incorrect').isEmail().normalizeEmail(),
    check('password', 'password incorrect').isLength({ min:6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные",
          status: false
        })
      }
      const { email, password } = req.body
      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: "Данный email уже зарегестрирован", status: false })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ email, password: hashedPassword, accessLevel: 0 })
      await user.save()

      res.status(201).json({message: "Запрос на создание пользователя отправлен", status: true})

    } catch (e) {
      res.status(500).json({ message: e.message, status: false })
    }
  }
)

router.post(
  '/login',
  [
    check('email', 'Некорретный email').isEmail().normalizeEmail(),
    check('password', 'Пароль не заполнен').isLength({ min:6 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: (errors.errors.length === 1 ? errors.errors[0].msg : "Данные некорректные")
        })
      }
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: "Такой пользователь не найден", status: false})
      }
      
      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({message: "Пароль не совпадает", status: false})
      }

      const token = jwt.sign(
        { userId: user.id, userEmail: user.email, accessLevel: user.accessLevel},
        config.get('jwtKey'),
        { expiresIn: '1h'}
      )
      
      res.status(200).json({ token, userId: user.id, status: true, accessLevel: user.accessLevel })
    
    } catch (e) {
      console.log(e.message)
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу", status: false})
    }
  }
)

module.exports = router