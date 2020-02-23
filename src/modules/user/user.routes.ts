import { Router } from 'express';

import { getUser, getUsers, updateUser, userById } from './user.controller';
import { isAuth } from '../shared/middlewares';

export const userRouter = Router();

userRouter.param('userId', userById);

/**
 * @swagger
 * /user/all:
 *   get:
 *     parameters:
 *      - in: query
 *        name: offset
 *        schema:
 *          type: integer
 *        required:
 *          false
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *        required:
 *          false
 *     tags:
 *       - User
 *     name: Get users
 *     summary: Returns all users
 *     responses:
 *       200:
 *         description: Returns all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   type:
 *                     $ref: '#/components/schemas/User'
 */
userRouter.get('/user/all', getUsers);

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     parameters:
 *      - in: path
 *        name: userId
 *        schema:
 *          type: integer
 *        required:
 *          true
 *     tags:
 *       - User
 *     name: Get user
 *     summary: Returns user by id
 *     responses:
 *       200:
 *         description: Returns user by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/user/:userId', getUser);

/**
 * @swagger
 * /user:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - User
 *     name: Update user
 *     summary: Updates logged in user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date-tim
 *               about:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updates logged in user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.put('/user', isAuth, updateUser);
