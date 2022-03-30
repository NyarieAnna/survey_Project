var config = require("./dbconfig");
const sql = require("mssql/msnodesqlv8");
require('msnodesqlv8');
//queryDatabase();

/*async function createNewTable(){
  try {
    let pool = await sql.connect(config);
    var query ="CREATE TABLE Questions (Id varchar(255)primary key not null, SurveyId varchar(255)foreign key references Surveys(Id), Text varchar(255))";
    let products = await pool.request().query(query);
  
    return products.recordsets;
  } catch (error) {
    console.log(error);
  } 
} */
 async function getAllQuestions() {
  try {
      let pool = await sql.connect(config);
      let products = await pool.request().query("SELECT * FROM Questions");
      return products.recordsets;
  } catch (error) {
      console.log(error);
  }
}

async function getQuestionById(id) {
  try {
    let question = await sql.connect(config);
    let todo = await question
      .request()
      .input("input_parameter", sql.NVarChar, id)
      .query("SELECT * FROM Questions WHERE Id = @input_parameter");
    return todo.recordsets;
  } catch (error) {
    console.log(error);
  }
} 

async function createQuestion(postQuestion) {

  console.log('question',postQuestion)
  try {
    let question = await sql.connect(config);
    let insertQuestion = await question
      .request()
      .input("Id", sql.VarChar, postQuestion.Id)
      .input("SurveyId", sql.VarChar, postQuestion.SurveyId)
      .input("Text", sql.VarChar, postQuestion.Text)
      .input("QuestionType", sql.Int, postQuestion.QuestionType)
      .query(
        "INSERT INTO Questions (Id,SurveyId,Text,QuestionType) VALUES (@Id,@SurveyId,@Text,@QuestionType)",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      Id: insertQuestion.parameters.Id.value,
      SurveyId: insertQuestion.parameters.SurveyId.value,
      Text: insertQuestion.parameters.Text.value,
      QuestionType: insertQuestion.parameters.QuestionType.value,
      
    };
  } catch (err) {
    console.log(err);
  }
}

async function deleteQuestion(id) {
  try {
    let question = await sql.connect(config);
    let todo = await question
      .request()
      .input("input_parameter", sql.NVarChar, id)
      .query("DELETE Questions WHERE Id = @input_parameter");
    return todo.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function updateQuestion(questionss) {
  try {
    let updatedQuestion = await sql.connect(config);
    let todos = await updatedQuestion
      .request()
      .input("Id", sql.VarChar, questionss.Id)
      .input("SurveyId", sql.VarChar, questionss.SurveyId)
      .input("Text", sql.VarChar, questionss.Text)
      .input("QuestionType", sql.Int, questionss.QuestionType)
     
      .query(
        "UPDATE  Questions SET SurveyId=@SurveyId,Text=@Text, QuestionType=@QuestionType WHERE Id = @Id",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      Id: todos.parameters.Id.value,
      SurveyId: todos.parameters.SurveyId.value,
      Text: todos.parameters.Text.value,
      QuestionType: todos.parameters.QuestionType.value,
    };
  } catch (error) {
    console.log(error);
  }
} 

//createNewTable();


module.exports = {
  createQuestion,
  deleteQuestion,
  updateQuestion,
  getAllQuestions,
  getQuestionById,
}; 
