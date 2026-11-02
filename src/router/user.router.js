import express from 'express'
import { getTheUser } from '../controller/user.controller.js'

export const router = new express.Router()

router.post('/login', getTheUser)