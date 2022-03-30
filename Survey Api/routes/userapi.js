const express = require("express");
const dboperations = require("./users");
const { nanoid } = require("nanoid");
const passwordHash = require("password-hash");

const idLength = 8;

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - UserName
 *         - Password
 *       properties:
 *         Id:
 *           type: string
 *           description: The auto-generated id of the user
 *         FullName:
 *           type: string
 *           description: Name of the User
 *         Username:
 *           type: string
 *           description: The name the user desires when logging in
 *         Email:
 *           type: string
 *           description: user`s email address
 *         PhoneNumber:
 *            type: string
 *            description: the users contact number
 *         Password:
 *           type: string
 *           description: the user will use to log in
 *         IsAdmin:
 *           type: string
 *           description: the user will choose either they are admin or respondent
 *         
 *
 *       example:
 *         Id: d5fE_asz
 *         FullName: Nyarai Nedziwe
 *         UserName: Nyarie
 *         Email: annanedziwe@gmail.com
 *         PhoneNumber: 0982346789
 *         Password: anna
 *         IsAdmin: Yes
 * 
 *         
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users Api
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the details of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of users and their details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get("/", (req, res) => {
  dboperations.getAllUsers().then((result) => {
    res.status(200).json(result[0]);
  });
});
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: get the user based on id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The user was not found
 */

router.get("/:id", (req, res) => {
  dboperations.getUserById(req.params.id).then((result) => {
    res.status(200).json(result[0]);
  });
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
  
  let user = {
    Id: nanoid(idLength),
    FullName: req.body.FullName,
    UserName: req.body.UserName,
    Email: req.body.Email,
    PhoneNumber: req.body.PhoneNumber,
    Password: passwordHash.generate(req.body.Password),
    IsAdmin: req.body.IsAdmin,
    
  };

 
  try {
    dboperations.createUser(user).then((result)=>{
    return res.status(200).json(result);
});
 } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: The user was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
  let user = {
    Id:  req.params.id,
    FullName: req.body.FullName,
    UserName: req.body.UserName,
    Email: req.body.Email,
    PhoneNumber: req.body.PhoneNumber,
    Password: req.body.Password,
    IsAdmin: req.body.IsAdmin,
    
  };
  try {
    dboperations.updateUser(user).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove the task by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */

router.delete("/:id", (req, res) => {
  try {
    dboperations.deleteUser(req.params.id).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
