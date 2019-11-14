const express = require('express')
const db = require('../data/dbConfig.js')
const router = express.Router()

router.get('/', (req, res) => {
  db('accounts')
    .select('*')
    .then(account => res.status(200).json(account))
    .catch(err => res.status(500).json({ message: 'error retrieving data' }))
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  db('accounts')
    .select('*')
    .where({ id })
    .then(account =>
      account[0]
        ? res.status(200).json(account)
        : res.status(404).json({ message: 'invalid id' })
    )
    .catch(err => res.status(500).json({ message: 'error retrieving data' }))
})

router.post('/', (req, res) => {
  const accountData = req.body

  db('accounts')
    .insert(accountData)
    .then(account => res.status(201).json(account))
    .catch(err =>
      res.status(500).json({ message: 'problem with the database' })
    )
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body

  db('accounts')
    .where({ id })
    .update(changes)
    .then(count =>
      count
        ? res.status(200).json({ update: count })
        : res.status(404).json({ message: 'invalid id' })
    )
    .catch(err =>
      res.status(500).json({ message: 'problem with the database' })
    )
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  db('accounts')
    .where({ id })
    .del()
    .then(count =>
      count
        ? res.status(200).json({ deleted: count })
        : res.status(404).json({ message: 'invalid id' })
    )
    .catch(err =>
      res.status(500).json({ message: 'problem with the database' })
    )
})

module.exports = router
