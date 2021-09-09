let testContactJSON = `
{
    "Contacts": [
        {
            "ContactID": "1",
            "FirstName": "Bob",
            "LastName": "Smith",
            "Address": "101 Teleuka Ln.",
            "Address2": "APT 111",
            "City": "Bob Central",
            "State": "FL",
            "ZipCode": "69420",
            "Email": "bobiscool@bob.com",
            "PhoneNumber": "4078293821",
            "img": "images/ContactCult_Logo_1.png"
        },
        {
            "ContactID": "2",
            "FirstName": "John",
            "LastName": "Doe",
            "Address": "1234 Street Dr",
            "Address2": "",
            "City": "Orlando",
            "State": "FL",
            "ZipCode": "34761",
            "Email": "john@example.com",
            "PhoneNumber": "5555555555",
            "img": "images/ContactCult_Logo_1.png"
        },
        {
            "ContactID": "3",
            "FirstName": "Richard",
            "LastName": "Coleman",
            "Address": "404 Alberquerky Rd",
            "Address2": "",
            "City": "New York",
            "State": "NY",
            "ZipCode": "42069",
            "Email": "rcole@example.com",
            "PhoneNumber": "1111111111",
            "img": "images/ContactCult_Logo_1.png"
        },
        {
            "ContactID": "10",
            "FirstName": "Jane",
            "LastName": "Doe",
            "Address": "123 Main St",
            "Address2": "",
            "City": "Los Angeles",
            "State": "CA",
            "ZipCode": "11111",
            "Email": "jane@example.com",
            "PhoneNumber": "4323457523",
            "img": "images/ContactCult_Logo_1.png"
        },
        {
            "ContactID": "22",
            "FirstName": "John",
            "LastName": "Wayne",
            "Address": "0000 Wayne Cr",
            "Address2": "Unit 444",
            "City": "Miami",
            "State": "FL",
            "ZipCode": "09090",
            "Email": "jwayne@example.com",
            "PhoneNumber": "3213214321",
            "img": "images/ContactCult_Logo_1.png"
        },
        {
            "ContactID": "9",
            "FirstName": "Bob",
            "LastName": "Smith",
            "Address": "101 Teleuka Ln.",
            "Address2": "APT 111",
            "City": "Bob Central",
            "State": "FL",
            "ZipCode": "69420",
            "Email": "bobiscool@bob.com",
            "PhoneNumber": "4078293821",
            "img": "images/ContactCult_Logo_1.png"
        },
        {
            "ContactID": "8",
            "FirstName": "John",
            "LastName": "Doe",
            "Address": "1234 Street Dr",
            "Address2": "",
            "City": "Orlando",
            "State": "FL",
            "ZipCode": "34761",
            "Email": "john@example.com",
            "PhoneNumber": "5555555555",
            "img": "images/ContactCult_Logo_1.png"
        },
        {
            "ContactID": "7",
            "FirstName": "Richard",
            "LastName": "Coleman",
            "Address": "404 Alberquerky Rd",
            "Address2": "",
            "City": "New York",
            "State": "NY",
            "ZipCode": "42069",
            "Email": "rcole@example.com",
            "PhoneNumber": "1111111111",
            "img": "images/ContactCult_Logo_1.png"
        },
        {
            "ContactID": "11",
            "FirstName": "Jane",
            "LastName": "Doe",
            "Address": "123 Main St",
            "Address2": "",
            "City": "Los Angeles",
            "State": "CA",
            "ZipCode": "11111",
            "Email": "jane@example.com",
            "PhoneNumber": "4323457523",
            "img": "images/ContactCult_Logo_1.png"
        },
        {
            "ContactID": "23",
            "FirstName": "John",
            "LastName": "Wayne",
            "Address": "0000 Wayne Cr",
            "Address2": "Unit 444",
            "City": "Miami",
            "State": "FL",
            "ZipCode": "09090",
            "Email": "jwayne@example.com",
            "PhoneNumber": "3213214321",
            "img": "images/ContactCult_Logo_1.png"
        }
    ]
}`;

let contactInfo;
let card;
let id;
let index = 0;

let contact = /*html*/`
<div id="new-contact" class="card border-0 h-100 g-0 mt-2 ms-2" data-bs-toggle="modal" data-bs-target="#contact-details"
data-bs-firstName="" data-bs-lastName="" data-bs-phone="" data-bs-email="" data-bs-address-line-1="" data-bs-address-line-2=""
data-bs-city="" data-bs-state="" data-bs-zip="" data-bs-img=""
onclick="toggleBlur()">
    <div class="container-fluid d-inline-flex" >
        <img id="new-contact-img" src="" class="img card-img d-inline-flex" alt="">

        <div class="ms-2 mt-1">
            <h5 class="card-title" id="new-contact-name"></h5>

            <div class="card-text">
                <div id="new-contact-phone"></div>
                <div id="new-contact-email"></div>
                <div id="new-contact-tags">
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

function generateContacts(jsonObject) {
    for (let i = 0; i < jsonObject.results.length; i++) {
        $("#contact-list").append(contact);
        $("#new-contact-name").append(jsonObject.results[i].FirstName + " " + jsonObject.results[i].LastName);
        $("#new-contact-name").attr("id", "name-" + i);

        $("#new-contact-phone").append(jsonObject.results[i].PhoneNumber);
        $("#new-contact-phone").attr("id", "phone-" + i);

        $("#new-contact-email").append(jsonObject.results[i].Email);
        $("#new-contact-email").attr("id", "email-" + i);

        $("#new-contact-img").attr("src", jsonObject.results[i].img);
        $("#new-contact-img").attr("id", "img-" + i);

        $("#new-contact").attr("data-bs-firstName", jsonObject.results[i].FirstName);
        $("#new-contact").attr("data-bs-lastName", jsonObject.results[i].LastName);
        $("#new-contact").attr("data-bs-phone", jsonObject.results[i].PhoneNumber);
        $("#new-contact").attr("data-bs-email", jsonObject.results[i].Email);
        $("#new-contact").attr("data-bs-address-line-1", jsonObject.results[i].Address);
        $("#new-contact").attr("data-bs-address-line-2", jsonObject.results[i].Address2);
        $("#new-contact").attr("data-bs-city", jsonObject.results[i].City);
        $("#new-contact").attr("data-bs-state", jsonObject.results[i].State);
        $("#new-contact").attr("data-bs-zip", jsonObject.results[i].ZipCode);
        $("#new-contact").attr("data-bs-img", jsonObject.results[i].img);
        $("#new-contact").attr("id", jsonObject.results[i].ContactID);
    }
}


$(window).ready(function () {
    // Check if user is logged in

    // Otherwise open Login window

    //Testcode
    // $('#contact-details').modal('toggle');

    if (readCookie()) {
        saveCookie();
    } else {
        toggleBlur();

        $('#login-modal').modal('toggle');
    }
});


// Toggle blur when modal windows are dismissed
$("#login-modal").on("hidden.bs.modal", function () {
    toggleBlur();
});

$("#contact-details").on("hidden.bs.modal", function () {
    toggleBlur();
});

$("#contact-adder").on("hidden.bs.modal", function () {
    toggleBlur();
})

// $("#contact-editor").on("hidden.bs.modal", function () {
//     if (!$("#contact-details").hasClass('show')) {
//         toggleBlur();
//     }
// })


$("#contact-details").on("show.bs.modal", function (event) {
    // Card that triggered details window
    card = event.relatedTarget;

    // Extract contact details from card;
    id = card.getAttribute("id");

    // Change window content
    $("#details-name").text(
        card.getAttribute("data-bs-firstName") + " " +
        card.getAttribute("data-bs-lastName")
    );

    $("#details-img").attr("src", card.getAttribute("data-bs-img"));

    $("#details-phone").text(card.getAttribute("data-bs-phone"));
    $("#details-phone").attr("href", "tel:" + card.getAttribute("data-bs-phone"));

    $("#details-email").text(card.getAttribute("data-bs-email"));
    $("#details-email").attr("href", "mailto:" + card.getAttribute("data-bs-email"));

    $("#details-address1").text(
        card.getAttribute("data-bs-address-line-1") + ", " +
        card.getAttribute("data-bs-address-line-2")
    );
    $("#details-address2").text(
        card.getAttribute("data-bs-city") + ", " +
        card.getAttribute("data-bs-state") + " " +
        card.getAttribute("data-bs-zip")
    );
});


$("#contact-editor").on("show.bs.modal", function (event) {
    // Extract contact details from card;
    id = card.getAttribute("id");

    // Change window content
    $("#editFirstName").val(card.getAttribute("data-bs-firstName"));
    $("#editLastName").val(card.getAttribute("data-bs-lastName"));

    $("#editPhone").val(card.getAttribute("data-bs-phone"));
    $("#editEmail").val(card.getAttribute("data-bs-email"));

    $("#editAddressLine1").val(card.getAttribute("data-bs-address-line-1"));
    $("#editAddressLine2").val(card.getAttribute("data-bs-address-line-2"));
    $("#editCity").val(card.getAttribute("data-bs-city"));
    $("#editState").val(card.getAttribute("data-bs-state"));
    $("#editZip").val(card.getAttribute("data-bs-zip"));

});

function toggleBlur() {
    $("#navbar").toggleClass("modal-blur");
    $("#card-deck").toggleClass("modal-blur");
}


// Add contact to card deck after it is validated
// function addContact() {
//     $("#contact-list").prepend(contact);

//     // Scroll to top where new contact is added
//     $("html, body").animate({ scrollTop: 0 }, "fast");
// }

function saveContact() {
    newID = addContact(JSON.stringify(
        {
            ID: userId,
            FirstName: $("#add-firstname").val(),
            LastName: $("#add-lastname").val(),
            Address: $("#add-address").val(),
            City: $("#add-city").val(),
            State: $("#add-state").val(),
            ZipCode: $("#add-zip").val(),
            PhoneNumber: $("#add-phone").val(),
            Email: $("#add-email").val()
        }
    ));



    $("#contact-list").prepend(contact);
    $("#new-contact-name").append($("#add-firstname").val() + " " + $("#add-lastname").val());
    $("#new-contact-name").attr("id", "name-" + newID);

    $("#new-contact-phone").append($("#add-phone").val());
    $("#new-contact-phone").attr("id", "phone-" + newID);

    $("#new-contact-email").append($("#add-email").val());
    $("#new-contact-email").attr("id", "email-" + newID);

    $("#new-contact-img").attr("src", "images/ContactCult_Logo_1.png");
    $("#new-contact-img").attr("id", "img-" + newID);

    $("#new-contact").attr("data-bs-firstName", $("#add-firstname").val());
    $("#new-contact").attr("data-bs-lastName", $("#add-lastname").val());
    $("#new-contact").attr("data-bs-phone", $("#add-phone").val());
    $("#new-contact").attr("data-bs-email", $("#add-email").val());
    $("#new-contact").attr("data-bs-address-line-1", $("#add-address").val());
    $("#new-contact").attr("data-bs-city", $("#add-city").val());
    $("#new-contact").attr("data-bs-state", $("#add-state").val());
    $("#new-contact").attr("data-bs-zip", $("#add-zip").val());
    $("#new-contact").attr("data-bs-img", "images/ContactCult_Logo_1.png");
    $("#new-contact").attr("id", newID);
}

function loadContacts() {

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