var urlBase = 'https://www.contactcult.com/php';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";
var hash = "";
var username = "";
var password = "";

// TODO: Input validation
function doSignup(form, e) {
    e.preventDefault();
    firstName = form.firstName.value;
    lastName = form.lastName.value;
    username = form.username.value;
    password = form.password.value;
    let passwordConfirm = form.passwordConfirm.value;
    let email = form.email.value;

    hash = md5(password);
    let xhr = new XMLHttpRequest();
    let url = 'php/CreateUser.php';

    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    let jsonPayload = '{"FirstName" : "' + firstName + '", "LastName" : "' + lastName + '", "UserName" : "' + username + '", "Password" : "' + hash + '"}';
    xhr.send(jsonPayload);


    // Validate here


    $('#signup-modal').modal('toggle');
    login();
}

function doLogin(form, e) {
    e.preventDefault();
    firstName = "";
    lastName = ""

    username = form.username.value;
    password = form.password.value;

    console.log(username + " " + password);

    login();
}

// Login
function login() {
    // Test Code to get past login locally
    // $('#login-modal').modal('toggle');
    // End test code

    hash = md5(password);
    document.getElementById("loginResult").innerHTML = "";

    // var tmp = {UserName:username,Password:password};
    var tmp = { UserName: username, Password: hash };
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

                if (userId < 1 || userId === undefined) {
                    document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                    return;
                }

                firstName = jsonObject.FirstName;
                lastName = jsonObject.LastName;

                saveCookie();
                $('#login-modal').modal('toggle');
                console.log("reached");
                searchContacts("All", "");
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
    document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie() {
    var data = document.cookie;
    var splits = data.split(",");
    for (var i = 0; i < splits.length; i++) {
        var thisOne = splits[i].trim();
        var tokens = thisOne.split("=");
        if (tokens[0] == "firstName") {
            firstName = tokens[1];
        }
        else if (tokens[0] == "lastName") {
            lastName = tokens[1];
        }
        else if (tokens[0] == "userId") {
            userId = parseInt(tokens[1].trim());
        }
    }

    if (userId > 0) {
        return true;
    }

    return false;
}

function doLogout() {
    userId = 0;
    firstName = "";
    lastName = "";
    document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "";
}

function searchContacts(filter, query) {
    let xhr = new XMLHttpRequest();
    let url = 'php/SearchTest2.php';

    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");

    var tmp = { ID: userId, searchFilter: filter, searchQuery: query};

    var jsonPayload = JSON.stringify(tmp);

    xhr.send(jsonPayload);

    generateContacts(JSON.parse(xhr.responseText));
}

function addContact(jsonPayload) {
    let xhr = new XMLHttpRequest();
    let url = 'php/AddContact.php';

    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonPayload);

    return JSON.parse(xhr.responseText).newContactID;
}

function editContact(jsonPayload) {
    let xhr = new XMLHttpRequest();
    let url = 'php/test.php';

    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(jsonPayload);
    xhr.send(jsonPayload);
}