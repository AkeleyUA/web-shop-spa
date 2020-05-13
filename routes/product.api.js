const { Router } = require('express')
const config = require('config')
const { check, validationResult } = require('express-validator')
const Product = require('../models/Product')
const router = Router()


router.post(
  '/get-products-for-admin',
  async (req, res) => {
    const { limit, page } = req.body
    const skip = page * 18

    try {
      const products = await Product.find().limit(limit).skip(skip)
      const productsLength = (await Product.find()).length
      res.json({ products, status: true, productsLength })
    } catch (e) {
      console.log(e.message)
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу", status: false })
    }
  }
)

router.post(
  '/get-filtered-products',
  check('filterValue', 'filterValue isEmpty').isLength({ min: 1 }),
  async (req, res) => {
    const { filterValue } = req.body

    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Введите имя товара"
        })
      }
      const data = await Product.find()
      const newData = data.filter(item => item.name.toLowerCase().match(filterValue.toLowerCase()))
      if (newData.length > 0) {
        return res.json({ products: newData, status: true, productsLength: newData.length })
      } else {
        return res.json({ message: 'Товар не найден' })
      }
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу" })
    }
  }
)


router.post(
  '/get-products-for-cart',
  async (req, res) => {
    const { id } = req.body
    if (id.length < 1) {
      return res.json({ status: false, message: "Корзина пуста" })
    }
    try {
      const data = await Product.find({ _id: id })
      res.json({ status: true, data })
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу" })
    }
  }
)

router.post(
  '/get-products-for-clients',
  async (req, res) => {
    const { category, limit, page } = req.body
    const skip = page * 18

    try {
      const products = await Product.find({ category, show: true }).limit(limit).skip(skip)
      const productsLength = (await Product.find({ category, show: true })).length
      res.json({ products, status: true, productsLength })
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу", status: false })
    }
  }
)

router.post(
  '/add',
  [
    check('name', 'name isEmpty').isLength({ min: 2 }),
    check('category', 'category isEmpty').isLength({ min: 2 }),
    check('amount', 'amount isEmpty').isNumeric(),
    check('img', 'img isEmpty').isLength({ min: 2 }),
    check('description', 'description isEmpty').isLength({ min: 2 }),
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
        amount,
        img,
        description,
        price
      } = req.body

      const product = new Product({
        name,
        category,
        amount,
        img,
        description,
        price,
        show: false
      })

      await product.save()

      res.status(201).json({ message: "Новый товар добавлен", status: true })

    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу", status: false })
    }
  }
)

router.post(
  '/del',
  async (req, res) => {
    const { id } = req.body
    try {
      await Product.findByIdAndDelete({ _id: id })
      const products = await Product.find()
      res.json({ message: "Товар был удалён", status: true, products })
    } catch (e) {
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
        { $set: { "show": checked } }
      )
      const products = await Product.find()
      res.json({ message: "Данные обновлены", status: true, products })
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу", status: false })
    }
  }
)

router.post(
  '/edit',
  async (req, res) => {
    const { id } = req.body
    try {
      const product = await Product.findById(id)
      if (!product) {
        return res.json({ status: false, message: 'Продукт не найден, повторите попытку' })
      }
      setTimeout(() => {
        res.json({ status: true, product })
      }, 1000)
    } catch (e) {
      res.status(500).json({ message: "Что-то пошло не так, перезагрузите страницу", status: false })
    }
  }
)



// for (i = 11; i < 21; i++) {
//   const product = new Product({
//     name: `Продукт ${i}, небольшое описание P-${1}`,
//     category: 'Популярно',
//     amount: i,
//     img: 'https://u01.appmifile.com/images/2017/04/01/8cd9f177-84ee-4e7e-ad39-9e6750903b0a.png',
//     description: `Продукт ${i}, полное описание полное описание полное описание полное описание полное описание`,
//     price: i * 5 + 1.99,
//     show: true,
//     sale: 0
//   })
//   try {
//     product.save()
//   } catch (e) {
//     throw e
//   }
// }

module.exports = router