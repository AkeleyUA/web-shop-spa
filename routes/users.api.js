const { Router } = require('express')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()


router.get(
  '/get',
  async (req, res) => {
    try {
      const users = await User.find({ сonfirm: true })
      res.json({ users, status: true })
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу", status: false })
    }
  }
)

router.get(
  '/get/not-confirm',
  async (req, res) => {
    try {
      const users = await User.find({ сonfirm: false })
      res.json({ users, status: true })
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу", status: false })
    }
  }
)

router.post(
  '/confirm',
  async (req, res) => {
    const { id } = req.body
    try {
      await User.updateOne({ _id: id }, { $set: { сonfirm: true } })
      const user = await User.findOne({ _id: id })
      res.json({ status: true, message: `Доступ пользователю ${user.email} предоставлен` })
    } catch (e) {
      console.log(e.message)
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу", status: false })
    }
  }
)

router.post(
  '/change/level',
  async (req, res) => {
    const { id, level } = req.body
    try {
      await User.findOneAndUpdate({ _id: id }, { $set: { accessLevel: level } })
      res.json({ status: true, message: 'Уровень пользователя обновлён' })
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу", status: false })
    }
  }
)

router.post(
  '/delete',
  async (req, res) => {
    const { id } = req.body
    try {
      await User.findOneAndDelete({ _id: id })
      res.json({ status: true, message: 'Пользователь удалён' })
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу", status: false })
    }
  }
)


module.exports = router