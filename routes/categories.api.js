const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const Category = require('../models/Category')
const router = Router()


router.post(
  '/add',
  [
    check('name', 'name isEmpty').isLength({min:2})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Введите имя категории"
        })
      }

      const {name} = req.body

      const candidate = await Category.findOne({name})
      if(candidate) {
        return res.status(400).json({ message: "Такая категория уже есть" })
      }

      const category = new Category({name})
      await category.save()

      res.status(201).json({ message: "Новая категория создана", status: true  })

    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу" })
    }
  }
)

router.get(
  '/get',
  async (req, res) => {
    try {
      const data = await Category.find()
      res.json(data)
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу" })
    }
  }
)

router.post(
  '/del',
  async (req, res) => {
    const { id } = req.body
    try {
      await Category.findByIdAndDelete(id)
      res.json({ message: "Что-то пошло не так, перезагрузите страницу", status: true })
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу" })
    }
  }
)

module.exports = router