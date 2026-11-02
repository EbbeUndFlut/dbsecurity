import express from 'express'
import 'dotenv/config'
import { router } from './src/router/user.router.js'

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use('/api/v1', router)



app.listen(PORT, () => console.log('Mein Server läuft auf Port', PORT))