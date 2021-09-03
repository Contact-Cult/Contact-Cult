var urlBase = 'https://www.contactcult.com/php';
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

// Login
function doLogin()
{
    // Test Code to get past login locally
    $("#contact-list").empty();
    for (let i = 0; i < 10; i++) {
        $("#contact-list").append(contact);
    }
    $('#login-modal').modal('toggle');
    var login = true;


	userId = 0;
	firstName = "";
	lastName = "";

	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	// var hash = md5( password );

	document.getElementById("loginResult").innerHTML = "";

	var tmp = {UserName:username,Password:password};
//	var tmp = {login:login,password:hash};
	var jsonPayload = JSON.stringify( tmp );

    var url = urlBase + '/Login.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				var jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.ID;

                console.log(xhr.responseText);

				if( userId < 1 || userId == undefined)
				{
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
                    return;
				}

				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();


                $("#contact-list").empty();
                for (let i = 0; i < 10; i++) {
                    $("#contact-list").append(contact);
                }
                $('#login-modal').modal('toggle');
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
	document.cookie = "userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++)
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}

	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function doSignup()
{
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var UserName = document.getElementById("signupUsername").value;
    var password = document.getElementById("signupPassword").value;
    var hash = md5( password );
    let xhr = new XMLHttpRequest();
    let url = 'php/CreateUser.php';

    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    var jsonPayload = '{"FirstName" : "' + firstName + '", "LastName" : "' + lastName + '", "UserName" : "' + username + '", "Password" : "' + hash + '"}';
    xhr.send(jsonPayload);
}