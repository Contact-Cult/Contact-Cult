let userId = 0;
let remember = true;

function saveCookie() {
    let minutes = 20;
    let date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    document.cookie = "userId=" + userId + ",remember=" + remember + ";expires=" + date.toGMTString();
}

function readCookie() {
    let data = document.cookie;
    let splits = data.split(",");
    for (let i = 0; i < splits.length; i++) {
        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");
        if (tokens[0] == "firstName") {
            firstName = tokens[1];
        }
        else if (tokens[0] == "lastName") {
            lastName = tokens[1];
        }
        else if (tokens[0] == "userId") {
            userId = parseInt(tokens[1].trim());
        }
        else if (tokens[0] == "remember") {
            remember = tokens[1];
        }
    }

    if (userId > 0 && remember) {
        return true;
    }

    return false;
}

function login(form, e) {
    e.preventDefault();
    e.stopPropagation();

    userId = apiHandler("Login", JSON.stringify(
        {
            UserName: form.username.value,
            Password: md5(form.password.value)
        }
    )).ID;

    if (userId < 1 || userId === undefined) {
        $("#loginResult").text("User/Password combination incorrect");
    } else {
        saveCookie();
        $('#login-modal').modal('toggle');
        searchContacts("All", "");
    }
}

function logout() {
    userId = 0;
    document.cookie = "userId= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "";
}

function signup(form, e) {
    e.preventDefault();
    e.stopPropagation();
    let error = false;

    // No username was entered
    if (form.username.value == "") {
        $("#usernameResult").text("Please enter a username");
        error = true;
    } else {
        $("#usernameResult").text("");
    }

    // Invalid email
    if (!form.email.value.includes("@")) {
        $("#emailResult").text("Please enter an email");
        error = true;
    } else {
        $("#emailResult").text("");
    }

    // No password was entered or passwords do not match
    if (form.password.value == "") {
        $("#passwordResult").text("Please enter a password");
        error = true;
    } else if (form.password.value != form.passwordConfirm.value) {
        $("#passwordResult").text("Passwords do not match");
        error = true;
    } else {
        $("#passwordResult").text("");
    }

    if (error) return;

    userId = apiHandler("CreateUser", JSON.stringify({
        FirstName: form.firstName.value,
        LastName: form.lastName.value,
        Email: form.email.value,
        UserName: form.username.value,
        Password: md5(form.password.value)
    })).newUserID;

    // Log in new user
    $("#signup-modal").modal('toggle');
    saveCookie();
    $("#login-modal").modal('toggle');
    searchContacts("All", "");
}