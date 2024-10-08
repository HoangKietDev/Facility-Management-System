import express from 'express';
import userRouter from "./user.router.js";
import rolerRouter from "./role.router.js";

const router = express.Router();

// router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
router.use("/users", userRouter);
router.use("/role", rolerRouter);

export default router; 