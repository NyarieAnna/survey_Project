var config = require("./dbconfig");
const sql = require("mssql/msnodesqlv8");
require('msnodesqlv8');
var passwordHash = require('password-hash');
//queryDatabase();

 /*async function createNewTable(){
  try {
    let pool = await sql.connect(config);
    var query ="CREATE TABLE Users (Id varchar(255)primary key not null, FullName varchar(255), UserName varchar(255), Email varchar(255), PhoneNumber varchar(255), Password varchar(255))";
    let products = await pool.request().query(query);
  
    return products.recordsets;
  } catch (error) {
    console.log(error);
  } 
} */

 async function getAllUsers() {
  try {
      let pool = await sql.connect(config);
      let products = await pool.request().query("SELECT * FROM Users");
      return products.recordsets;
  } catch (error) {
      console.log(error);
  }
}

async function getUserById(id) {
  try {
    let user = await sql.connect(config);
    let todo = await user
      .request()
      .input("input_parameter", sql.NVarChar, id)
      .query("SELECT * FROM Users WHERE Id = @input_parameter");
    return todo.recordsets;
  } catch (error) {
    console.log(error);
  }
} 

async function createUser(postUser) {

  console.log('user',postUser)
  try {
    let user = await sql.connect(config);
    let insertUser = await user
      .request()
      .input("Id", sql.VarChar, postUser.Id)
      .input("FullName", sql.VarChar, postUser.FullName)
      .input("UserName", sql.VarChar, postUser.UserName)
      .input("Email", sql.VarChar, postUser.Email)
      .input("PhoneNumber", sql.VarChar, postUser.PhoneNumber)
      .input("Password", sql.VarChar, postUser.Password)
      .input("IsAdmin", sql.VarChar, postUser.IsAdmin)
      
      .query(
        "INSERT INTO Users (Id,FullName,UserName,Email,PhoneNumber,Password,IsAdmin) VALUES (@Id,@FullName,@UserName,@Email,@PhoneNumber,@Password,@IsAdmin)",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      Id: insertUser.parameters.Id.value,
      FullName: insertUser.parameters.FullName.value,
      UserName: insertUser.parameters.UserName.value,
      Email: insertUser.parameters.Email.value,
      PhoneNumber: insertUser.parameters.PhoneNumber.value,
      Password: insertUser.parameters.Password.value,
      IsAdmin: insertUser.parameters.IsAdmin.value,
    };
  } catch (err) {
    console.log(err);
  }
}
async function login(userDetails) {
  try {
    let task = await sql.connect(config);
    let todo = await task
      .request()
      .input("input_parameter", sql.VarChar, userDetails.UserName)
      .query("SELECT * FROM Users WHERE UserName = @input_parameter");

      console.log('found user',todo.recordsets)
    let UserNameExists=todo.recordsets[0].length;
    let userFound=todo.recordsets[0][0];
    
      if(UserNameExists){
        let validate= await  unhashPassword(userDetails.Password,userFound.Password,userFound.IsAdmin);
        console.log('password',userDetails.Password,userFound.Password,userFound.IsAdmin)
    console.log('validated',validate)
    if(validate){
      return todo.recordsets[0][0];
    }else{
      return false;
    }   
      }else{
        return false;
      }
  
  } catch (error) {
    console.log(error);
  }
}

async function validateUniqueUser(UserName) {
  try {
    let user = await sql.connect(config);
    let userfound = await user
      .request()
      .input("UserName", sql.VarChar(255), UserName)
      .query("SELECT * FROM Users WHERE UserName = @UserName");

    return userfound.recordset.length;
  } catch (error) {
    console.log(error);
  }
}
async function deleteUser(id) {
  try {
    let user = await sql.connect(config);
    let todo = await user
      .request()
      .input("input_parameter", sql.NVarChar, id)
      .query("DELETE Users WHERE Id = @input_parameter");
    return todo.recordsets;
  } catch (error) {
    console.log(error);
  }
}
async function updateUser(userss) {
  try {
    let updatedUser = await sql.connect(config);
    let todos = await updatedUser
      .request()
      .input("Id", sql.VarChar, userss.Id)
      .input("FullName", sql.VarChar, userss.FullName)
      .input("UserName", sql.VarChar, userss.UserName)
      .input("Email", sql.VarChar, userss.Email)
      .input("PhoneNumber", sql.VarChar, userss.PhoneNumber)
      .input("Password", sql.VarChar, userss.Password)
      .input("IsAdmin", sql.VarChar, userss.IsAdmin)
      
      .query(
        "UPDATE Users SET FullName=@FullName,UserName=@UserName,Email=@Email,PhoneNumber=@PhoneNumber,Password=@Password, IsAdmin=@IsAdmin WHERE Id = @Id",
        function (err, result) {
          if (err) {
            console.log(err);
          }
          sql.close();
        }
      );

    return {
      Id: todos.parameters.Id.value,
      FullName: todos.parameters.FullName.value,
      Username: todos.parameters.UserName.value,
      Email: todos.parameters.Email.value,
      PhoneNumber: todos.parameters.PhoneNumber.value,
      Password: todos.parameters.Password.value,
      IsAdmin: todos.parameters.IsAdmin.value,
      
    };
  } catch (error) {
    console.log(error);
  }
} 

//createNewTable();
function unhashPassword(entered,hashed){
  return(passwordHash.verify(entered,hashed))
}


module.exports = {
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getUserById,
  login,
  validateUniqueUser,
}; 
