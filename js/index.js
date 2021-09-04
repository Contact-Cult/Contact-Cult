let contact = `
<div id="contact-card" class="card border-0 h-100 g-0 mt-2 ms-2" data-bs-toggle="modal" data-bs-target="#contact-details" onclick="toggleBlur()">
    <div class="container-fluid d-inline-flex" >
        <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
            class="img card-img d-inline-flex" alt="..."
            style="min-height: 110px; max-height: 110px; max-width: 110px; ">

        <div class="ms-2 mt-1">
            <h5 class="card-title">John Doe</h5>

            <div class="card-text">
                555-555-5555<br />
                John@example.com<br />
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
</div>`;

let editorHTML = ``;
var contactInfo;

$(window).ready(function () {
    // Check if user is logged in

    // Otherwise open Login window

    //Testcode
    // $('#contact-details').modal('toggle');


    $('#login-modal').modal('toggle');

    if (readCookie()) {
        $('#login-modal').modal('toggle');
    } else {
        for (let i = 0; i < 20; i++) {
            $("#contact-list").append(contact);
        }
    }
});


// Toggle blur when modal windows are dismissed
$("#login-modal").on("hidden.bs.modal", function () {
    toggleBlur();
});

$("#contact-details").on("hidden.bs.modal", function () {
    toggleBlur();
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

function openEditor() {
    contactInfo = $("#editor").clone();
    // $("#editor").empty();
    // $("#editor").append(editorHTML);
}

function closeEditor() {
    // $("#editor").empty();
    // $("#editor").append(contactInfo);
}