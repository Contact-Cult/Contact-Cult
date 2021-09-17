let contactList = [];
let currentCard;
var userId = 0;
let remember = true;

let contact = /*html*/`
<div id="new-contact" data-bs-index="" class="card border-0 h-100 g-0 mt-2 ms-2" onclick="openDetails(this)">
    <div class="container-fluid d-inline-flex" >
        <img id="new-contact-img" src="" class="img card-img d-inline-flex" alt="">

        <div class="container-fluid">
            <div class="ms-2 mt-1">
                <div class="d-block">
                    <span class="card-title d-inline-block text-truncate m-0" id="new-contact-firstname" style="max-width: 200px; font-size: 18px; line-height: 120%"></span>
                    <span class="card-title d-inline-block text-truncate m-0" id="new-contact-lastname" style="max-width: 200px; font-size: 18px; line-height: 120%"></span>
                </div>

                <div class="card-text">
                        <div>
                            <i class="bi-telephone me-2 d-inline-flex"></i>
                            <div id="new-contact-phone" class="d-inline-flex"></div>
                        </div>
                        <div>
                            <i class="bi-envelope me-2 d-inline-flex"></i>
                            <div id="new-contact-email" class="d-inline-block text-truncate" style="max-width: 170px;"></div>
                        </div>
                </div>
            </div>
        </div>

        <div class="d-inline-flex mt-2 me-2">
            <div class="dropdown d-inline-block">
                <i class="bi-three-dots-vertical" id="card-menu" data-bs-toggle="dropdown" style="font-size: 24px" onclick="cardMenu($(this), event)"></i>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li class="dropdown-item" onclick="openEditor(event)">Edit</li>
                    <li class="dropdown-item text-danger" onclick="openDelete(event)">Delete</li>
                </ul>
            </div>
        </div>
    </div>
</div>
`;

function cardMenu(target, e) {
    e.preventDefault();
    e.stopPropagation();
    currentCard = contactList[target.closest("[data-bs-index]").attr("data-bs-index")];
}

function openDetails(target) {
    addBlur();
    (new bootstrap.Modal(document.getElementById('contact-details'))).show(target);
}

function openEditor(e) {
    e.preventDefault();
    e.stopPropagation();
    addBlur();
    (new bootstrap.Modal(document.getElementById('contact-editor'))).show();
}

function openDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    addBlur();
    (new bootstrap.Modal(document.getElementById('contact-deleter'))).show();
}

function newContactCard(info, index) {
    $("#contact-list").prepend(contact);
    $("#new-contact").attr("data-bs-index", index);
    $("#new-contact").attr("id", info.ContactID);
    $("#new-contact-firstname").attr("id", "firstname-" + info.ContactID);
    $("#new-contact-lastname").attr("id", "lastname-" + info.ContactID);
    $("#new-contact-phone").attr("id", "phone-" + info.ContactID);
    $("#new-contact-email").attr("id", "email-" + info.ContactID);
    $("#new-contact-img").attr("id", "img-" + info.ContactID);

    updateContactCard(info.ContactID, info);
}

function updateContactCard(id, info) {
    // if names are too long, truncate to fit on card in 2 lines
    $("#firstname-" + id).text(info.FirstName + " ");
    $("#lastname-" + id).text(info.LastName);
    $("#phone-" + id).text(info.PhoneNumber);
    $("#phone-" + id).attr("id", "phone-" + info.ContactID);
    $("#email-" + id).text(info.Email);
    $("#email-" + id).attr("id", "email-" + info.ContactID);
    $("#img-" + id).attr("src", info.Image);
}

function generateContactCards() {
    $("#contact-list").empty();

    for (let i = 0; i < contactList.length; i++) {
        newContactCard(contactList[i], i);
    }
}

// Handle api calls and responses
function apiHandler(api, jsonPayload) {
    let xhr = new XMLHttpRequest();
    let url = 'php/' + api + '.php';

    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonPayload);

    return JSON.parse(xhr.responseText)
}

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

// Toggle blur when modal windows are dismissed
function addBlur() {
    $("#navbar").addClass("modal-blur");
    $("#card-deck").addClass("modal-blur");
}

function removeBlur() {
    $("#navbar").removeClass("modal-blur");
    $("#card-deck").removeClass("modal-blur");
}

$("#login-modal").on("hidden.bs.modal", function () {
    removeBlur();
});

$("#contact-details").on("hidden.bs.modal", function () {
    removeBlur();
});

$("#contact-adder").on("hidden.bs.modal", function () {
    removeBlur();
});

$("#contact-editor").on("hidden.bs.modal", function () {
    if (!$("#contact-details").hasClass("show")) {
        removeBlur();
    }
});

$("#contact-deleter").on("show.bs.modal", function () {
    $("#contact-details").addClass("modal-blur");
    addBlur();
});

$("#contact-deleter").on("hidden.bs.modal", function () {
    $("#contact-details").removeClass("modal-blur");
    if (!$("#contact-details").hasClass("show")) {
        removeBlur();
    }
});

// Enable add button when window is opened
$("#contact-adder").on("show.bs.modal", function () {
    $("#add-save").prop("disabled", false);
    $("#add-firstname").val("");
    $("#add-lastname").val("");
    $("#add-phone").val("");
    $("#add-email").val("");
    $("#add-address").val("");
    $("#add-city").val("");
    $("#add-state").val("");
    $("#add-zip").val("");
    $("#add-img").attr("src", "images/ContactCult_Logo_1.png"); // random image here
    $("#add-notes").val("");
    $("#add-phone").mask('(999) 999-9999');
});

// When contact details are opened,
// get index of the card that opened it
// and update content of the window with that contact
$("#contact-details").on("show.bs.modal", function (event) {
    let cardIndex = event.relatedTarget.getAttribute("data-bs-index")
    currentCard = contactList[cardIndex];
    updateDetails();
});

$("#contact-deleter").on("show.bs.modal", function () {
    $("#delete-name").text("Delete " + currentCard.FirstName + " " + currentCard.LastName);
});

// Retrieve details from currentCard
function updateDetails() {
    $("#details-name").text(currentCard.FirstName + " " + currentCard.LastName);

    $("#details-img").attr("src", currentCard.Image);

    $("#details-phone").text(currentCard.PhoneNumber);
    $("#details-phone").attr("href", "tel:" + currentCard.PhoneNumber);

    $("#details-email").text(currentCard.Email);
    $("#details-email").attr("href", "mailto:" + currentCard.Email);

    $("#details-address").text(currentCard.Address);
    $("#details-address2").text(
        currentCard.City + " " +
        currentCard.State + " " +
        currentCard.ZipCode
    );

    $("#details-notes").text(currentCard.Notes);
}

// Fill inputs with current contact details
$("#contact-editor").on("show.bs.modal", function () {
    $("#edit-firstname").val(currentCard.FirstName);
    $("#edit-lastname").val(currentCard.LastName);
    $("#edit-phone").val(currentCard.PhoneNumber);
    $("#edit-email").val(currentCard.Email);
    $("#edit-address").val(currentCard.Address);
    $("#edit-city").val(currentCard.City);
    $("#edit-state").val(currentCard.State);
    $("#edit-zip").val(currentCard.ZipCode);
    $("#edit-img").attr("src", currentCard.Image);
    $("#edit-notes").val(currentCard.Notes.replace('<br />', '\r\n\g'));
    $("#edit-phone").mask('(999) 999-9999');
});

// Create an object with values from selected form ("#edit" or "#add")
function generateInfo(form) {
    return {
        ID: userId,
        ContactID: "",
        FirstName: $(form + "-firstname").val(),
        LastName: $(form + "-lastname").val(),
        Address: $(form + "-address").val(),
        City: $(form + "-city").val(),
        State: $(form + "-state").val(),
        ZipCode: $(form + "-zip").val(),
        PhoneNumber: $(form + "-phone").val(),
        Email: $(form + "-email").val(),
        Image: "images/ContactCult_Logo_1.png", // put random image path if add form
        Notes: $(form + "-notes").val().replace(/\r?\n/g, '<br />')
    }
}

// Edit Contact Function
function editContact() {
    let index = $("#" + currentCard.ContactID).attr("data-bs-index");
    let id = currentCard.ContactID;


    let contactInfo = generateInfo("#edit");
    contactInfo.ContactID = id;

    // Change card data and display
    contactList[index] = contactInfo;
    currentCard = contactInfo;

    updateContactCard(contactInfo.ContactID, contactInfo);
    updateDetails();

    apiHandler("EditContact", JSON.stringify(contactInfo));
}

function addContact(button) {
    button.disabled = true;
    let contactInfo = generateInfo("#add");

    let newID = apiHandler("AddContact", JSON.stringify(contactInfo)).newContactID;
    contactInfo.ContactID = newID;

    contactList.push(contactInfo);

    newContactCard(contactInfo, contactList.length - 1);

    // Scroll to top where new contact is added
    $("html, body").animate({ scrollTop: 0 }, "fast");
}

function deleteContact() {
    apiHandler("RemoveContact", JSON.stringify({
        ContactID: currentCard.ContactID
    }));

    $("#" + currentCard.ContactID).remove();

    $("#contact-details").modal('hide');
}

function searchContacts(filter, query, e) {
    if (e !== undefined) {
        e.preventDefault();
        e.stopPropagation();
    }

    contactList = apiHandler("SearchContact", JSON.stringify({
        ID: userId,
        searchFilter: filter,
        searchQuery: query
    })).results;

    if (contactList === undefined) contactList = [];

    generateContactCards();
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

function saveCookie() {
    var minutes = 20;
    var date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    document.cookie = "userId=" + userId + ",remember=" + remember + ";expires=" + date.toGMTString();
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
        else if (tokens[0] == "remember") {
            remember = tokens[1];
        }
    }

    if (userId > 0 && remember) {
        return true;
    }

    return false;
}

// prevent default form submission behaviour
$(document).on('submit', '#search-form', function (e) {
    e.preventDefault();
    e.stopPropagation();
});

function search(form, e) {
    e.preventDefault();
    e.stopPropagation();
    searchContacts(form.filter.value, form.query.value);
}