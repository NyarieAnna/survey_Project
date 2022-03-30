const express = require("express");
const dboperations = require("./answers");  // requering the directry of the database endpoint js
const { nanoid } = require("nanoid");
const idLength = 8;
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Answer:
 *       type: object
 *       required:
 *         - ResponseId
 *         - text
 *       properties:
 *         Id:
 *           type: string
 *           description: The auto-generated id of the answer
 *         ResponseId:
 *           type: string
 *           description: The id of the response
 *         text:
 *           type: string
 *           description: The real answer
 *         QuestionId:
 *           type: string
 *           description: id of the question
 *
 *
 *       example:
 *         Id: d5fE_asz
 *         ResponseId: d9Ys_eyc
 *         text: sxjisdopkdo
 *         QuestionId: wid_294f
 *
 */
/**
 * @swagger
 * tags:
 *   name: Answers
 *   description: Answer Api
 */
/**
 * @swagger
 * /answers:
 *   get:
 *     summary: Returns the list of all the answers
 *     tags: [Answers]
 *     responses:
 *       200:
 *         description: The list of the Answers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Answer'
 */
router.get("/", (req, res) => {
  dboperations.getAllAnswers().then((result) => {
    res.status(200).json(result[0]);
  });
});
/**
 * @swagger
 * /answers/{id}:
 *   get:
 *     summary: get the answer based on id
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The answer id
 *     responses:
 *       200:
 *         description: The answer description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 *       404:
 *         description: The answer was not found
 */
router.get("/:id", (req, res) => {
  dboperations.getAnswerById(req.params.id).then((result) => {
    res.status(200).json(result[0]);
  });
});
/**
 * @swagger
 * /answers:
 *   post:
 *     summary: Create a new answer
 *     tags: [Answers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Answer'
 *     responses:
 *       200:
 *         description: The answer was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Answer'
 *       500:
 *         description: Some server error
 */
router.post("/", (req, res) => {
  let answer = {
    Id: nanoid(idLength),
    ResponseId: req.body.ResponseId,
    text: req.body.text,
    QuestionId:req.body.QuestionId,
  };
  console.log(req.body);
  try {
    dboperations.createAnswer(answer).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**
 * @swagger
 * /answers/{id}:
 *  put:
 *    summary: Update the answer by the id
 *    tags: [Answers]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The answer id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Answer'
 *    responses:
 *      200:
 *        description: The Answer was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Answer'
 *      404:
 *        description: The answer was not found
 *      500:
 *        description: Some error happened
 */
router.put("/:id", (req, res) => {
  let answer = {
    Id: req.params.id,
    ResponseId: req.body.ResponseId,
    text: req.body.text,
    QuestionId: req.body.QuestionId,
  };
  try {
    dboperations.updateAnswer(answer).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**
 * @swagger
 * /answers/{id}:
 *   delete:
 *     summary: Remove the answer by id
 *     tags: [Answers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The answer id
 *
 *     responses:
 *       200:
 *         description: The answer was deleted
 *       404:
 *         description: The answer was not found
 */
router.delete("/:id", (req, res) => {
  try {
    dboperations.deleteAnswer(req.params.id).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});
module.exports = router;