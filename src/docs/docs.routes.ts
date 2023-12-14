import { Router } from 'express'
import { serve, setup } from 'swagger-ui-express'

const router = Router()

router.use('/docs', serve, setup());

export default router