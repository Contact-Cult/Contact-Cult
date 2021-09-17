// When page is loaded
// Check if user is logged in
// Otherwise open Login window
$(document).ready(function () {
    if (readCookie()) {
        saveCookie();
        searchContacts("All", "");
    } else {
        addBlur();
        $('#login-modal').modal('toggle');
    }
});

// Handle api calls and responses
function apiHandler(api, jsonPayload) {
    let xhr = new XMLHttpRequest();
    let url = 'php/' + api + '.php';

    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonPayload);

    return JSON.parse(xhr.responseText);
}