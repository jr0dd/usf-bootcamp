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
  }
  catch (err) {
    return next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id

    const invQuery = await db.query(`
      SELECT id, amt, paid, add_date, paid_date, comp_code
      FROM invoices
      WHERE id = $1`,
      [id]
    )

    if (invQuery.rows.length === 0) {
      throw new ExpressError(`Invoice not found: ${id}`, 404)
    }

    const invData = invQuery.rows[0]
    const company = invData.comp_code

    const compQuery = await db.query(`
      SELECT code, name, description
      FROM companies
      WHERE code = $1`,
      [company]
    )
    const compData = compQuery.rows[0]

    const invoice = {
      id: invData.id,
      amt: invData.id,
      paid: invData.paid,
      add_date: invData.add_date,
      paid_date: invData.paid_date,
      company: {
        code: compData.code,
        name: compData.name,
        description: compData.description
      }
    }
    
    return res.json({ invoice })
  }
  catch (err) {
    return next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { comp_code, amt } = req.body

    const query = await db.query(`
      INSERT INTO invoices (comp_code, amt) 
      VALUES ($1, $2) 
      RETURNING id, comp_code, amt, paid, add_date, paid_date`,
      [comp_code, amt]
    )

    return res.json({ invoice: query.rows[0] })
  }
  catch (err) {
    return next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const { amt } = req.body

    const query = await db.query(`
      UPDATE invoices
      SET amt = $2
      WHERE id = $1
      RETURNING id, comp_code, amt, paid, add_date, paid_date`,
      [id, amt]
    )

    if (query.rows.length === 0) {
      throw new ExpressError(`No such invoice: ${id}`, 404)
    } else {
      return res.json({ company: query.rows[0] })
    }
  }
  catch (err) {
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
  }
  catch (err) {
    return next(err)
  }
})

export { router }