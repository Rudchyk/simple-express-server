import { Request, Response, NextFunction } from 'express'

const express = require('express')
const app = express()
const port = 3011

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: '.'
  })
})

interface Params {
  name: string
  surname: string
  [key: string]: string | undefined
}

interface RequestWithParams extends Request {
  query: Params
  _parsedUrl: {
    query: string
  }
}

app.get('/text', (req: RequestWithParams, res: Response) => {
  if (!Object.keys(req.query).length) {
    res.status(200).send('You have sent nothing')
  } else {
    let str = ''
    for (const key in req.query) {
      str += req.query[key] + ' '
    }
    res.status(200).send(str)
  }
})

app.get('/json', (req: RequestWithParams, res: Response) => {
  res.status(200).json({
    name: 'Sergii'
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})