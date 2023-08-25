import { Router } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

const authorizationJwtAndHost = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization
  const referer = req.headers.referer || req.headers.referrer || req.headers.Referer
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, String(process.env.SECRETJWT), (err: any, user: any) => {
      if (err) { return res.status(403).send('error on validation token...') }
      req.user = user
      next()
    })
  } else if (referer && (referer.includes('weclever.co') || referer.includes('cleversale.com.br') || referer.includes('clever.live'))) {
    next()
  } else {
    res.status(401).send('invalid token...')
  }
}

router.get('/health', )

export default router
