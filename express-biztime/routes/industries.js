import express from 'express'
import slugify from 'slugify'
import { ExpressError } from '../expressError.js'
import { client as db } from './../db.js'
const router = new express.Router()

router.get('/', async (req, res, next) => {
  try {
    const query = await db.query(`
      SELECT code, industry
      FROM industries
      ORDER BY code
    `)

    return res.json({ industries: query.rows })
  } catch (err) {
    return next(err)
  }
})

router.get('/:code', async (req, res, next) => {
  try {
    const industryCode = req.params.code
    const query = await db.query(`
      SELECT i.code, i.industry, c.code AS companies
      FROM industries AS i
      LEFT JOIN company_industries AS ci
      ON i.code = ci.industry_code
      LEFT JOIN companies AS c ON ci.comp_code = c.code
      WHERE i.code = $1`,
    [industryCode]
    )

    if (query.rows.length === 0) {
      throw new ExpressError(`Company not found: ${industryCode}`, 404)
    }

    const { code, industry } = query.rows[0]
    const companies = query.rows.map(c => c.companies)

    return res.json({ code, industry, companies })
  } catch (err) {
    return next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { code, industry } = req.body
    const slugCode = slugify(code, {
      lower: true,
      strict: true
    })

    const query = await db.query(`
      INSERT INTO industries (code, industry) 
      VALUES ($1, $2) 
      RETURNING code, industry`,
    [slugCode, industry]
    )

    return res.status(201).json({ industry: query.rows[0] })
  } catch (err) {
    return next(err)
  }
})

router.post('/:code', async (req, res, next) => {
  try {
    const indCode = req.params.code
    const { compCode } = req.body

    const query = await db.query(`
      INSERT INTO company_industries (comp_code, industry_code)
      VALUES ($1, $2)
      RETURNING comp_code, industry_code`,
    [compCode, indCode]
    )

    return res.status(201).json({ industry: query.rows[0] })
  } catch (err) {
    return next(err)
  }
})

export { router }
