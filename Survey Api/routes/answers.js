var config = require("./dbconfig");
const sql = require("mssql/msnodesqlv8");
/*async function createNewTable(){
  try {
    let pool = await sql.connect(config);
    var query = "CREATE TABLE Answers  (Id VarChar(255)primary key not null, ResponseId VarChar(255)foreign key references Responses(Id), text VarChar(255))";
    let products = await pool.request().query(query);
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}
 createNewTable() */
async function getAllAnswers() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("SELECT * FROM Answers");
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function getAnswerById(id) {
  try {
    let answer = await sql.connect(config);
    let todo = await answer
      .request()
      .input("input_parameter", sql.VarChar, id)
      .query("SELECT * FROM Answers WHERE Id = @input_parameter");
    return todo.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function createAnswer(postAnswer) {
  try {
    let answer = await sql.connect(config);
    let insertAnswer = await answer
      .request()
      .input("Id", sql.VarChar, postAnswer.Id)
      .input("ResponseId", sql.VarChar, postAnswer.ResponseId)
      .input("text", sql.VarChar, postAnswer.text)
      .input("QuestionId", sql.VarChar, postAnswer.QuestionId)
      .query(
        "INSERT INTO Answers (Id,ResponseId,text,QuestionId) VALUES (@Id,@ResponseId,@text,@QuestionId)",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );
    return {
      Id: insertAnswer.parameters.Id.value,
      ResponseId: insertAnswer.parameters.ResponseId.value,
      text: insertAnswer.parameters.text.value,
      QuestionId: insertAnswer.parameters.QuestionId.value,
    };
  } catch (err) {
    console.log(err);
  }
}
async function deleteAnswer(id) {
  try {
    let answer = await sql.connect(config);
    let answerList = await answer
      .request()
      .input("input_parameter", sql.VarChar, id)
      .query("DELETE FROM Answers WHERE Id = @input_parameter");
    return  answerList.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function updateAnswer(answerUp) {
  try {
    let updatedAnswer = await sql.connect(config);
    let answers = await updatedAnswer
      .request()
      .input("Id", sql.VarChar, answerUp.Id)
      .input("ResponseId", sql.VarChar, answerUp.ResponseId)
      .input("text", sql.VarChar, answerUp.text)
      .input("QuestionId", sql.VarChar, answerUp.QuestionId)
      .query(
        "UPDATE Answers SET ResponseId=@ResponseId,text=@text,QuestionId=@QuestionId WHERE Id = @Id",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );
    return {
      Id: answers.parameters.Id.value,
      ResponseId: answers.parameters.ResponseId.value,
      text: answers.parameters.text.value,
      QuestionId: answers.parameters.QuestionId.value,
    };
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  createAnswer,
  deleteAnswer,
  updateAnswer,
  getAllAnswers,
  getAnswerById,
}; 