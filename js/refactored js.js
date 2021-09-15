let contactList = [];
let currentCard;
var userId = 0;
let remember = true;

let contact = /*html*/`
<div id="new-contact" data-bs-index="" class="card border-0 h-100 g-0 mt-2 ms-2" data-bs-toggle="modal" data-bs-target="#contact-details"
onclick="toggleBlur()">
    <div class="container-fluid d-inline-flex" >
        <img id="new-contact-img" src="" class="img card-img d-inline-flex" alt="">

        <div class="ms-2 mt-1">
            <h5 class="card-title text-wrap text-break" id="new-contact-name"></h5>

            <div class="card-text">
                    <div>
                        <i class="bi-telephone me-2 d-inline-flex"></i>
                        <div id="new-contact-phone" class="d-inline-flex"></div>
                    </div>
                    <div>
                        <i class="bi-envelope me-2 d-inline-flex"></i>
                        <div id="new-contact-email" class="d-inline-flex"></div>
                    </div>
            </div>
        </div>
    </div>
</div>
`;

function newContactCard(info, index) {
    $("#contact-list").prepend(contact);
    $("#new-contact").attr("data-bs-index", index);
    $("#new-contact").attr("id", info.ContactID);
    $("#new-contact-name").attr("id", "name-" + info.ContactID);
    $("#new-contact-phone").attr("id", "phone-" + info.ContactID);
    $("#new-contact-email").attr("id", "email-" + info.ContactID);
    $("#new-contact-img").attr("id", "img-" + info.ContactID);

    updateContactCard(info.ContactID, info);
}

function updateContactCard(id, info) {
    $("#name-" + id).text(info.FirstName + " " + info.LastName);
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
        toggleBlur();
        $('#login-modal').modal('toggle');
    }
});

// Toggle blur when modal windows are dismissed
function toggleBlur() {
    $("#navbar").toggleClass("modal-blur");
    $("#card-deck").toggleClass("modal-blur");
}

$("#login-modal").on("hidden.bs.modal", function () {
    toggleBlur();
});

$("#contact-details").on("hidden.bs.modal", function () {
    toggleBlur();
});

$("#contact-adder").on("hidden.bs.modal", function () {
    toggleBlur();
});

$("#contact-editor").on("hidden.bs.modal", function () {
    if (!$("#contact-details").hasClass('show')) {
        toggleBlur();
    }
});

// Enable add button when window is opened
$("#contact-adder").on("show.bs.modal", function () {
    $("#add-save").attr("onClick", "addContact(); this.onclick=null;");
    $("#add-notes").val("");
});

// When contact details are opened,
// get index of the card that opened it
// and update content of the window with that contact
$("#contact-details").on("show.bs.modal", function (event) {
    let cardIndex = event.relatedTarget.getAttribute("data-bs-index")
    currentCard = contactList[cardIndex];
    updateDetails();
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
        // ((card.getAttribute("data-bs-city") != "")? ", " : "") +
        currentCard.State + " " +
        currentCard.ZipCode
    );

    $("#details-notes").text(currentCard.Notes);
}

// Fill inputs with current contact details
$("#contact-editor").on("show.bs.modal", function () {
    $("#edit-firstname").val(currentCard.FirstName);
    $("#edit-lastame").val(currentCard.LastName);
    $("#edit-phone").val(currentCard.PhoneNumber);
    $("#edit-email").val(currentCard.Email);
    $("#edit-address").val(currentCard.Address);
    $("#edit-city").val(currentCard.City);
    $("#edit-state").val(currentCard.State);
    $("#edit-zip").val(currentCard.ZipCode);
    $("#edit-img").attr("src", currentCard.Image);
    $("#edit-notes").val(currentCard.Notes.replace('<br />', '\r\n\g'));
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

function addContact() {
    let contactInfo = generateInfo("#add");

    let newID = apiHandler("AddContact", JSON.stringify(contactInfo)).ContactID;
    contactInfo.ContactID = newID;

    contactList.push(contactInfo);

    newContactCard(contactInfo, contactList.length - 1);

    // Scroll to top where new contact is added
    $("html, body").animate({ scrollTop: 0 }, "fast");
}

function searchContacts(filter, query) {
    contactList = apiHandler("SearchContact", JSON.stringify({
        ID: userId,
        searchFilter: filter,
        searchQuery: query
    }));
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

function signup(form, e) {
    e.preventDefault();
    e.stopPropagation();

    // No username was entered
    if (form.username.value == "") {
        return;
    }

    // Invalid email
    if (!form.email.value.includes("@")) {
        return;
    }

    // Passwords do not match
    if (form.password.value != form.passwordConfirm.value) {
        return;
    }

    userId = apiHandler("CreateUser", JSON.stringify(
        {
            FirstName: form.firstName.value,
            LastName: form.lastName.value,
            Email: form.email.value,
            UserName: form.username.value,
            Password: md5(form.password.value)
        }
    ));

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