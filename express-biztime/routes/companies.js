import express from 'express'
import { ExpressError } from '../expressError.js'
import { client as db } from './../db.js'
const router = new express.Router()

router.get('/', async (req, res, next) => {
  try {
    const query = await db.query(`
      SELECT code, name 
      FROM companies 
      ORDER BY name
    `)

    return res.json({ companies: query.rows })
  }
  catch (err) {
    return next(err)
  }
})

router.get('/:code', async (req, res, next) => {
  try {
    const code = req.params.code

    const compQuery = await db.query(`
      SELECT code, name, description
      FROM companies
      WHERE code = $1`,
      [code]
    )

    if (compQuery.rows.length === 0) {
      throw new ExpressError(`Company not found: ${code}`, 404)
    }

    const invQuery = await db.query(`
      SELECT id
      FROM invoices
      WHERE comp_code = $1`,
      [code]
    )

    const compData = compQuery.rows[0]
    const invData = invQuery.rows

    const company = {
      code: compData.code,
      name: compData.name,
      description: compData.description
    }
    company.invoices = invData.map(i => i.id)
    
    return res.json({ company })
  }
  catch (err) {
    return next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { code, name, description } = req.body

    const query = await db.query(`
      INSERT INTO companies (code, name, description) 
      VALUES ($1, $2, $3) 
      RETURNING code, name, description`,
      [code, name, description]
    )

    return res.status(201).json({ company: query.rows[0] })
  }
  catch (err) {
    return next(err)
  }
})

router.put('/:code', async (req, res, next) => {
  try {
    const { name, description } = req.body
    const code = req.params.code

    const query = await db.query(`
      UPDATE companies
      SET name=$1, description=$2
      WHERE code = $3
      RETURNING code, name, description`,
      [name, description, code]
    )

    if (query.rows.length === 0) {
      throw new ExpressError(`Company not found: ${code}`, 404)
    } else {
      return res.json({ company: query.rows[0] })
    }
  }
  catch (err) {
    return next(err)
  }
})

router.delete('/:code', async (req, res, next) => {
  try {
    const code = req.params.code

    const query = await db.query(`
      DELETE FROM companies
      WHERE code=$1
      RETURNING code`,
      [code]
    )

    if (query.rows.length == 0) {
      throw new ExpressError(`Company not found: ${code}`, 404)
    } else {
      return res.json({ status: 'deleted' })
    }
  }
  catch (err) {
    return next(err)
  }
})

export { router }
