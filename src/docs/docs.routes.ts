import { Router } from 'express'
import { serve, setup } from 'swagger-ui-express'
import swaggerDocs from '.';

const router = Router()

router.use('/docs', serve, setup(swaggerDocs));

export default router