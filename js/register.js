var urlBase = 'http://COP4331-5.com/LAMPAPI';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function registerUser()
{
  // NOTE: I don't know what any of the id values are so I put placeholders
  var newFirstName = document.getElementById("firstname").value;
  var newLastName = document.getElementById("lastname").value;
  var newUsername = document.getElementById("username").value;
  var newEmail = document.getElementById("email").value;
  var newPassword = document.getElementById("passsword").value;
  var newConfirmPassword = document.getElementById("confirmpassword").value;
  
  // compare password values
  if (newPassword === newConfirmPassword)
  {
    // do nothing, all is well in the world
  } else
  {
    // throw error "passwords do not match"
  }
  
  // grabs the current date and puts it in a string in mm/dd/yyyy format
  var date = new Date().toLocaleDateString()
  
  // not sure where to get userID from
  var tmp = {id:userID,FirstName:newFirstName,LastName:newLastName,UserName:newUsername,Password:newPassword,DateCreated:date};
  var jsonPayload = JSON.stringify(tmp);
  var url urlBase + '/CreateUser.' + extension;
  
  // not sure where to go after this
}
