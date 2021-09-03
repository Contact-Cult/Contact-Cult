var urlBase = 'https://www.contactcult.com/php';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";
var hash = "";
var username = "";
var password = "";


function doSignup() {
    firstName = document.getElementById("signupFirstName").value;
    lastName = document.getElementById("signupLastName").value;
    username = document.getElementById("signupUsername").value;
    password = document.getElementById("signupPassword").value;
    hash = md5(password);
    let xhr = new XMLHttpRequest();
    let url = 'php/CreateUser.php';

    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    var jsonPayload = '{"FirstName" : "' + firstName + '", "LastName" : "' + lastName + '", "UserName" : "' + username + '", "Password" : "' + hash + '"}';
    xhr.send(jsonPayload);

    $('#signup-modal').modal('toggle');
    login();
}

function doLogin() {
    userId = 0;
    firstName = "";
    lastName = "";

    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    hash = md5(password);

    login();
}

// Login
function login() {
    // Test Code to get past login locally
    $("#contact-list").empty();
    for (let i = 0; i < 10; i++) {
        $("#contact-list").append(contact);
    }
    $('#login-modal').modal('toggle');
    // End test code

    document.getElementById("loginResult").innerHTML = "";

    // var tmp = {UserName:username,Password:password};
    var tmp = { UserName: username, Password: hash };
    console.log(tmp);
    var jsonPayload = JSON.stringify(tmp);

    var url = urlBase + '/Login.' + extension;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var jsonObject = JSON.parse(xhr.responseText);
                userId = jsonObject.ID;

                console.log(xhr.responseText);

                if (userId < 1 || userId === undefined) {
                    document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                    return;
                }

                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                saveCookie();
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        document.getElementById("loginResult").innerHTML = err.message;
    }
}


function saveCookie() {
    var minutes = 20;
    var date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    document.cookie = "userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie() {
    userId = -1;
    var data = document.cookie;
    var splits = data.split(",");
    for (var i = 0; i < splits.length; i++) {
        var thisOne = splits[i].trim();
        var tokens = thisOne.split("=");
        if (tokens[0] == "userId") {
            userId = parseInt(tokens[1].trim());
        }
    }

    if (userId < 0) {
        window.location.href = "index.html";
    }
    else {
        document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
    }
}

function doLogout() {
    userId = 0;
    firstName = "";
    lastName = "";
    document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}