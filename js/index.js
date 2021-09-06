let testContactJSON = `
{
    "Contacts": [
        {
            "FirstName": "Bob",
            "LastName": "Smith",
            "Address": "101 Teleuka Ln.",
            "Address2": "APT 111",
            "City": "Bob Central",
            "State": "FL",
            "ZipCode": "69420",
            "Email": "bobiscool@bob.com",
            "PhoneNumber": "4078293821"
        },
        {
            "FirstName": "Bob",
            "LastName": "Smith",
            "Address": "101 Teleuka Ln.",
            "Address2": "APT 111",
            "City": "Bob Central",
            "State": "FL",
            "ZipCode": "69420",
            "Email": "bobiscool@bob.com",
            "PhoneNumber": "4078293821"
        },
        {
            "FirstName": "Bob",
            "LastName": "Smith",
            "Address": "101 Teleuka Ln.",
            "Address2": "APT 111",
            "City": "Bob Central",
            "State": "FL",
            "ZipCode": "69420",
            "Email": "bobiscool@bob.com",
            "PhoneNumber": "4078293821"
        },
        {
            "FirstName": "Bob",
            "LastName": "Smith",
            "Address": "101 Teleuka Ln.",
            "Address2": "APT 111",
            "City": "Bob Central",
            "State": "FL",
            "ZipCode": "69420",
            "Email": "bobiscool@bob.com",
            "PhoneNumber": "4078293821"
        },
        {
            "FirstName": "Bob",
            "LastName": "Smith",
            "Address": "101 Teleuka Ln.",
            "Address2": "APT 111",
            "City": "Bob Central",
            "State": "FL",
            "ZipCode": "69420",
            "Email": "bobiscool@bob.com",
            "PhoneNumber": "4078293821"
        }
    ]
}`;
let contactInfo;
let currentCard;

let contact = /*html*/`
<div id="new-contact" class="card border-0 h-100 g-0 mt-2 ms-2" data-bs-toggle="modal" data-bs-target="#contact-details"
data-bs-firstName="" data-bs-lastName="" data-bs-phone="" data-bs-email="" data-bs-address="" data-bs-address2=""
data-bs-city="" data-bs-state="" data-bs-zip=""
onclick="toggleBlur()">
    <div class="container-fluid d-inline-flex" >
        <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
            class="img card-img d-inline-flex" alt=""
            style="min-height: 110px; max-height: 110px; max-width: 110px; ">

        <div class="ms-2 mt-1">
            <h5 class="card-title" id="new-contact-name"></h5>

            <div class="card-text">
                <div id="new-contact-phone"></div>
                <div id="new-contact-email"></div>
                <div>
                    <i class="bi-tags-fill text-muted"></i>
                    <span class="badge bg-primary" style="font-size: 8px">Primary</span>
                    <span class="badge bg-danger" style="font-size: 8px">Danger</span>
                    <span class="badge bg-info" style="font-size: 8px">Info</span>
                    <span class="badge bg-warning" style="font-size: 8px">Warning</span>
                </div>
            </div>
        </div>
    </div>
</div>
`;

function generateContacts() {
    var jsonObject = JSON.parse(testContactJSON);
    for (let i = 0; i < jsonObject.Contacts.length; i++) {
        $("#contact-list").append(contact);
        $("#new-contact-name").append(jsonObject.Contacts[i].FirstName + " " + jsonObject.Contacts[i].LastName);
        $("#new-contact-name").attr("id", "name-" + i);

        $("#new-contact-phone").append(jsonObject.Contacts[i].PhoneNumber);
        $("#new-contact-phone").attr("id", "phone-" + i);

        $("#new-contact-email").append(jsonObject.Contacts[i].Email);
        $("#new-contact-email").attr("id", "email-" + i);

        $("#new-contact").attr("data-bs-firstName", jsonObject.Contacts[i].FirstName);
        $("#new-contact").attr("data-bs-lastName", jsonObject.Contacts[i].LastName);
        $("#new-contact").attr("data-bs-phone", jsonObject.Contacts[i].PhoneNumber);
        $("#new-contact").attr("data-bs-email", jsonObject.Contacts[i].Email);
        $("#new-contact").attr("data-bs-address", jsonObject.Contacts[i].Address);
        $("#new-contact").attr("data-bs-address2", jsonObject.Contacts[i].Address2);
        $("#new-contact").attr("data-bs-city", jsonObject.Contacts[i].City);
        $("#new-contact").attr("data-bs-state", jsonObject.Contacts[i].State);
        $("#new-contact").attr("data-bs-zip", jsonObject.Contacts[i].ZipCode);
        $("#new-contact").attr("id", i);
    }
}



$(window).ready(function () {
    // Check if user is logged in

    // Otherwise open Login window

    //Testcode
    // $('#contact-details').modal('toggle');

    if (readCookie()) {
        saveCookie();
        loadContacts();
    } else {
        toggleBlur();

        $('#login-modal').modal('toggle');
        // for (let i = 0; i < 20; i++) {
        //     $("#contact-list").append(contact);
        // }
        generateContacts();
    }
});


// Toggle blur when modal windows are dismissed
$("#login-modal").on("hidden.bs.modal", function () {
    toggleBlur();
});

$("#contact-details").on("hidden.bs.modal", function () {
    toggleBlur();
});

// $("#contact-editor").on("hidden.bs.modal", function () {
//     if (!$("#contact-details").hasClass('show')) {
//         toggleBlur();
//     }
// })


$("#contact-details").on("show.bs.modal", function (event) {
    // Card that triggered details window
    var card = event.relatedTarget;

    // Extract contact details from card;
    var id = card.getAttribute("id");
    var firstName = card.getAttribute("data-bs-firstName");
    var lastName = card.getAttribute("data-bs-lastName");
    var email = card.getAttribute("data-bs-email");
    var phoneNumber = card.getAttribute("data-bs-phone");
    var address1 = card.getAttribute("data-bs-address");
    var address2 = card.getAttribute("data-bs-address2");
    var city = card.getAttribute("data-bs-city");
    var state = card.getAttribute("data-bs-state");
    var zip = card.getAttribute("data-bs-zip");

    // Change window content
    $("#details-name").empty();
    $("#details-phone").empty();
    $("#details-email").empty();
    $("#details-address1").empty();
    $("#details-address2").empty();

    $("#details-name").append(firstName + " " + lastName);
    $("#details-phone").append(phoneNumber);
    $("#details-phone").attr("href", "tel:" + phoneNumber);
    $("#details-email").append(email);
    $("#details-email").attr("href", "mailto:" + email);
    $("#details-address1").append(address1 + ", " + address2);
    $("#details-address2").append(city + ", " + state + " " + zip);
});

function toggleBlur() {
    $("#navbar").toggleClass("modal-blur");
    $("#card-deck").toggleClass("modal-blur");
}


// Add contact to card deck after it is validated
function addContact() {
    $("#contact-list").prepend(contact);

    // Scroll to top where new contact is added
    $("html, body").animate({ scrollTop: 0 }, "fast");
}

function loadContacts() {
    $("#contact-list").empty();
    for (let i = 0; i < 10; i++) {
        $("#contact-list").append(contact);
    }
}

function openEditor() {
    contactInfo = $("#editor").clone();
    // $("#editor").empty();
    // $("#editor").append(editorHTML);
}

function closeEditor() {
    // $("#editor").empty();
    // $("#editor").append(contactInfo);
}