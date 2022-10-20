import express from 'express'
import { ExpressError } from '../expressError.js'
import { client as db } from './../db.js'
const router = new express.Router()

router.get('/', async (req, res, next) => {
  try {
    const query = await db.query(`
      SELECT id, comp_code
      FROM invoices 
      ORDER BY id
    `)

    return res.json({ invoices: query.rows })
  } catch (err) {
    return next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id

    const query = await db.query(`
      SELECT i.id, i.comp_code, i.amt, i.paid, i.add_date, i.paid_date, 
      c.name, c.description 
      FROM invoices AS i
      INNER JOIN companies AS c ON (i.comp_code = c.code)  
      WHERE id = $1`,
    [id]
    )

    if (query.rows.length === 0) {
      throw new ExpressError(`Invoice not found: ${id}`, 404)
    }

    const data = query.rows[0]

    const invoice = {
      id: data.id,
      amt: data.amt,
      paid: data.paid,
      add_date: data.add_date,
      paid_date: data.paid_date,
      company: {
        code: data.code,
        name: data.name,
        description: data.description
      }
    }

    return res.json({ invoice })
  } catch (err) {
    return next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { compCode, amt } = req.body

    const query = await db.query(`
      INSERT INTO invoices (comp_code, amt) 
      VALUES ($1, $2) 
      RETURNING id, comp_code, amt, paid, add_date, paid_date`,
    [compCode, amt]
    )

    return res.json({ invoice: query.rows[0] })
  } catch (err) {
    return next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const { amt, paid } = req.body

    const query = await db.query(`
      SELECT paid
      FROM invoices
      WHERE id = $1`,
    [id]
    )

    if (query.rows.length === 0) {
      throw new ExpressError(`No such invoice: ${id}`, 404)
    }

    let paidDate = null
    if (!query.rows[0].paid_date && paid) {
      paidDate = new Date()
    } else {
      paidDate = query.rows[0].paid_date
    }

    const update = await db.query(`
      UPDATE invoices
      SET amt = $2, paid = $3, paid_date = $4
      WHERE id = $1
      RETURNING id, comp_code, amt, paid, add_date, paid_date`,
    [id, amt, paid, paidDate]
    )

    return res.json({ invoice: update.rows[0] })
  } catch (err) {
    return next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id

    const result = await db.query(`
      DELETE FROM invoices
      WHERE id = $1
      RETURNING id`,
    [id]
    )

    if (result.rows.length === 0) {
      throw new ExpressError(`Invoice not found: ${id}`, 404)
    }

    return res.json({ status: 'deleted' })
  } catch (err) {
    return next(err)
  }
})

export { router }
