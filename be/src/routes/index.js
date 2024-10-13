import express from 'express';
import userRouter from "./user.router.js";
import rolerRouter from "./role.router.js";
import bookingRouter from './booking.router.js';
import notificationRouter from './notification.router.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../utils/swagger.json' assert { type: 'json' };

const router = express.Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
router.use("/users", userRouter);
router.use("/role", rolerRouter);
router.use("/booking", bookingRouter);
router.use("/notification", notificationRouter);

export default router; 