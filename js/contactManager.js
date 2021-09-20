let contactList = [];

// Enable add button when window is opened
// Clear inputs
// Mask telephone and zip code input
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

// Fill inputs with current contact details and mask phone/zip inputs
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
    $("#edit-notes").val(currentCard.Notes.replace('<br />', '\r\n'));

    $("#edit-phone").mask('(999) 999-9999');
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

    $("#details-notes").val(currentCard.Notes.replace('<br />', '\r\n'));
}

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
        Image: $(form + "-img").attr("src"),
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