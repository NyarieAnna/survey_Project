const express = require("express");
const dboperations = require("./responses");  // requering the directry of the database endpoint js
const { nanoid } = require("nanoid");
const idLength = 8;
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Response:
 *       type: object
 *       required:
 *         - SurveyId
 *         - UserId
 *       properties:
 *         Id:
 *           type: string
 *           description: The auto-generated id of the response
 *         SurveyId:
 *           type: string
 *           description: The Response name logged in
 *         UserId:
 *           type: string
 *           description: The User's ID password
 *
 *       example:
 *         Id: d5fE_asz
 *         SurveyId: d9Ys_eyc
 *         UserId: s7gT_dyh
 *
 */
/**
 * @swagger
 * tags:
 *   name: Responses
 *   description: response Api
 */
/**
 * @swagger
 * /responses:
 *   get:
 *     summary: Returns the list of all the Responses
 *     tags: [Responses]
 *     responses:
 *       200:
 *         description: The list of the Responses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Responses'
 */
router.get("/", (req, res) => {
  dboperations.getAllResponses().then((result) => {
    res.status(200).json(result[0]);
  });
});
/**
 * @swagger
 * /responses/{id}:
 *   get:
 *     summary: get the user based on id
 *     tags: [Responses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The response id
 *     responses:
 *       200:
 *         description: The response description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       404:
 *         description: The response was not found
 */
router.get("/:id", (req, res) => {
  dboperations.getResponseById(req.params.id).then((result) => {
    res.status(200).json(result[0]);
  });
});
/**
 * @swagger
 * /responses:
 *   post:
 *     summary: Create a new response
 *     tags: [Responses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Response'
 *     responses:
 *       200:
 *         description: The response was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       500:
 *         description: Some server error
 */
router.post("/", (req, res) => {
  let response = {
    Id: nanoid(idLength),
    SurveyId: req.body.SurveyId,
    UserId: req.body.UserId,
  };
  console.log(req.body);
  try {
    dboperations.createResponse(response).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**
 * @swagger
 * /responses/{id}:
 *  put:
 *    summary: Update the response by the id
 *    tags: [Responses]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The response id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Response'
 *    responses:
 *      200:
 *        description: The Response was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Response'
 *      404:
 *        description: The response was not found
 *      500:
 *        description: Some error happened
 */
router.put("/:id", (req, res) => {
  let response = {
    Id: req.params.id,
    SurveyId: req.body.SurveyId,
    UserId: req.body.UserId,
  };
  try {
    dboperations.updateResponse(response).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});
/**
 * @swagger
 * /responses/{id}:
 *   delete:
 *     summary: Remove the response by id
 *     tags: [Responses]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The response id
 *
 *     responses:
 *       200:
 *         description: The response was deleted
 *       404:
 *         description: The response was not found
 */
router.delete("/:id", (req, res) => {
  try {
    dboperations.deleteResponse(req.params.id).then((result) => {
      res.status(200).json(result);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});
module.exports = router;