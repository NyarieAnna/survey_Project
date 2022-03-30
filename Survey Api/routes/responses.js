var config = require("./dbconfig");
const sql = require("mssql/msnodesqlv8");
/*async function createNewTable(){
  try {
    let pool = await sql.connect(config);
    var query = "CREATE TABLE Responses  (Id VarChar(255)primary key not null, SurveyId VarChar(255)foreign key references Surveys(Id), UserId VarChar(255)foreign key references Users(Id))";
    let products = await pool.request().query(query);
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}
 createNewTable() */
async function getAllResponses() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("SELECT * FROM Responses");
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function getResponseById(id) {
  try {
    let response = await sql.connect(config);
    let todo = await response
      .request()
      .input("input_parameter", sql.VarChar, id)
      .query("SELECT * FROM Responses WHERE Id = @input_parameter");
    return todo.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function createResponse(postResponse) {
  try {
    let response = await sql.connect(config);
    let insertResponse = await response
      .request()
      .input("Id", sql.VarChar, postResponse.Id)
      .input("SurveyId", sql.VarChar, postResponse.SurveyId)
      .input("UserId", sql.VarChar, postResponse.UserId)
      .query(
        "INSERT INTO Responses (Id,SurveyId,UserId) VALUES (@Id,@SurveyId,@UserId)",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );
    return {
      Id: insertResponse.parameters.Id.value,
      SurveyId: insertResponse.parameters.SurveyId.value,
      UserId: insertResponse.parameters.UserId.value,
    };
  } catch (err) {
    console.log(err);
  }
}
async function deleteResponse(id) {
  try {
    let response = await sql.connect(config);
    let responseList = await response
      .request()
      .input("input_parameter", sql.VarChar, id)
      .query("DELETE FROM Responses WHERE Id = @input_parameter");
    return  responseList.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function updateResponse(responseUp) {
  try {
    let updatedResponse = await sql.connect(config);
    let responses = await updatedResponse
      .request()
      .input("Id", sql.VarChar, responseUp.Id)
      .input("SurveyId", sql.VarChar, responseUp.SurveyId)
      .input("UserId", sql.VarChar, responseUp.UserId)
      .query(
        "UPDATE Responses SET SurveyId=@SurveyId,userId=@UserId WHERE Id = @Id",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );
    return {
      Id: responses.parameters.Id.value,
      SurveyId: responses.parameters.SurveyId.value,
      UserId: responses.parameters.UserId.value,
    };
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  createResponse,
  deleteResponse,
  updateResponse,
  getAllResponses,
  getResponseById,
}; 