var config = require("./dbconfig");
const sql = require("mssql/msnodesqlv8");
require('msnodesqlv8');
//queryDatabase();

/* async function createNewTable(){
   try {
    let pool = await sql.connect(config);
     var query = "Create table Surveys(Id VarChar(255) primary key not null,UserId VarChar(255)foreign key references Users(Id),Name VarChar(255));";
    let products = await pool.request().query(query);
    return products.recordsets;
  } catch (error) {
     console.log(error);
   }
 }
createNewTable(); */

async function getAllSurveys() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("SELECT * FROM Surveys");
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
} 
async function getSurveyById(id) {
  try {
    let survey = await sql.connect(config);
    let todo = await survey
      .request()
      .input("input_parameter", sql.VarChar, id)
      .query("SELECT * FROM Surveys WHERE Id = @input_parameter");
    return todo.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function createSurvey(postSurvey) {
  try {
    let survey = await sql.connect(config);
    console.log(survey);
    let insertSurvey = await survey
      .request()
      .input("Id", sql.VarChar, postSurvey.Id)
      .input("UserId", sql.VarChar, postSurvey.UserId)
      .input("Name", sql.VarChar, postSurvey.Name)
      .query(
        "Insert Into Surveys (Id,UserId,Name) Values(@Id,@UserId,@Name)",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );
   console.log('gets here');
    return {
      Id: insertSurvey.parameters.Id.value,
      UserId: insertSurvey.parameters.UserId.value,
      Name: insertSurvey.parameters.Name.value,
    };
  } catch (err) {
    console.log(err);
  }
}
async function deleteSurvey(id) {
  try {
    let survey = await sql.connect(config);
    let todo = await survey
      .request()
      .input("input_parameter", sql.VarChar, id)
      .query("DELETE FROM Surveys WHERE Id = @input_parameter");
    return todo.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function updateSurvey(postSurvey) {
  try {
    let updatedSurvey = await sql.connect(config);
    let insertSurvey = await updatedSurvey
      .request()
      .input("Id", sql.VarChar, postSurvey.Id)
      .input("UserId", sql.VarChar, postSurvey.UserId)
      .input("Name", sql.VarChar, postSurvey.Name)
      .query(
        "UPDATE Surveys SET Name=@Name WHERE Id = @Id",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );
    return {
        Id: insertSurvey.parameters.Id.value,
        UserId: insertSurvey.parameters.UserId.value,
        Name: insertSurvey.parameters.Name.value,
    };
  } catch (error) {
    console.log(error);
  }
}
module.exports={
  getSurveyById,
  deleteSurvey,
  createSurvey,
  updateSurvey,
  getAllSurveys,
} 