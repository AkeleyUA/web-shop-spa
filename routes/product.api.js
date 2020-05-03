const { Router } = require('express')
const config = require('config')
const { check, validationResult } = require('express-validator')
const Product = require('../models/Product')
const router = Router()


router.get(
  '/get-products',
  async (req, res) => {
    try {
      const data = await Product.find()
      setTimeout(() => {
        res.json(data)
      }, 3000)
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу" })
    }
  }
)

router.post(
  '/get-products-for-cart',
  async (req, res) => {
    const { id } = req.body
    if(id.length < 1) {
      return res.json({status: false, message:"Корзина пуста"})
    }
    try {
      const data = await Product.find({_id: id})
      res.json({status:true, data})
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу" })
    }
  }
)

router.post(
  '/get-products',
  async (req, res) => {
    const { category } = req.body
    try {
      const data = await Product.find({category, show: true})
      res.json(data)
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу" })
    }
  }
)

router.post(
  '/add',
  [
    check('name', 'name isEmpty').isLength({min:2}),
    check('category', 'category isEmpty').isLength({min:2}),
    check('model', 'model isEmpty').isLength({min:2}),
    check('amount', 'amount isEmpty').isNumeric(),
    check('img', 'img isEmpty').isLength({min:2}),
    check('description', 'description isEmpty').isLength({min:2}),
    check('price', 'price isEmpty').isNumeric(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Недостаточно данных"
        })
      }

      const {
        name,
        category,
        model,
        amount,
        img,
        description,
        price
      } = req.body

      const product = new Product({
        name,
        category,
        model,
        amount,
        img,
        description,
        price,
        show: false
      })
      
      await product.save()

      res.status(201).json({message: "Новый товар добавлен"})

    } catch (e) {
      console.log(e)
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу" })
    }
  }
)

router.post(
  '/del-products',
  async (req, res) => {
    const { id } = req.body
    try {
      await Product.findByIdAndDelete(id)
      res.json({message: "Товар был удалён", status: true})
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу" })
    }
  }
)

router.post(
  '/show',
  async (req, res) => {
    const { id, checked } = req.body
    try {
      await Product.findByIdAndUpdate(
        { _id: id },
        { $set: {"show": checked}}
      )
      const products = await Product.find()
      setTimeout(() => {
        res.json({message: "Данные обновлены", status: true, products})
      }, 3000)
    } catch (e) {
      console.log(e)
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу", status: false })
    }
  }
)

module.exports = router