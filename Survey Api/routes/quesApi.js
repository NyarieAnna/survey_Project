const express = require("express");
const dboperations = require("./questions");
const { nanoid } = require("nanoid");

const idLength = 8;

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - SurveyId
 *         - Text
 *       properties:
 *         Id:
 *           type: string
 *           description: The auto-generated id of the question
 *         SurveyId:
 *           type: string
 *           description: The id of the survey
 *         Text:
 *           type: string
 *           description: The question itself
 *         QuestionType:
 *           type: Int
 *           description: The type of the question
 *         
 *
 *       example:
 *         Id: d5fE_asz
 *         SurveyId: swd3_skv
 *         Text: What is your name?
 *         QuestionType: 1
 *         
 */

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Questions Api
 */

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Returns the details of all questions
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: The list of all questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 */

router.get("/", (req, res) => {
  dboperations.getAllQuestions().then((result) => {
    res.status(200).json(result[0]);
  });
});
/**
 * @swagger
 * /questions/{id}:
 *   get:
 *     summary: get the question based on id
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The question id
 *     responses:
 *       200:
 *         description: The question description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       404:
 *         description: The question was not found
 */

router.get("/:id", (req, res) => {
  dboperations.getQuestionById(req.params.id).then((result) => {
    res.status(200).json(result[0]);
  });
});

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       200:
 *         description: The question was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
  
  let question = {
    Id: nanoid(idLength),
    SurveyId: req.body.SurveyId,
    Text: req.body.Text,
    QuestionType: req.body.QuestionType,
    
  };

 
  try {
    dboperations.createQuestion(question).then((result)=>{
    return res.status(200).json(result);
});
 } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /questions/{id}:
 *  put:
 *    summary: Update the question by the id
 *    tags: [Questions]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The question id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Question'
 *    responses:
 *      200:
 *        description: The question was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Question'
 *      404:
 *        description: The question was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
  let question = {
    Id: req.params.id,
    SurveyId: req.body.SurveyId,
    Text: req.body.Text,
    QuestionType: req.body.QuestionType,
    
  };
  try {
    dboperations.updateQuestion(question).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /questions/{id}:
 *   delete:
 *     summary: Remove the question by id
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The question id
 *
 *     responses:
 *       200:
 *         description: The question was deleted
 *       404:
 *         description: The question was not found
 */

router.delete("/:id", (req, res) => {
  try {
    dboperations.deleteQuestion(req.params.id).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
