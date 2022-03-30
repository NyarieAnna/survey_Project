class User {
  constructor(Id, FullName,UserName,Email,PhoneNumber,Password,Gender) {
    this.Id = Id;
    this.FullName = FullName;
    this.UserName = UserName;
    this.Email = Email;
    this.PhoneNumber= PhoneNumber;
    this.Password = Password;
    this.IsAdmin=this.IsAdmin;
    
    
  }
}

module.exports = User;
