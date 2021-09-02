let contact = `
<div id="contact-card" type="button" class="card border-0 h-100 g-0 mt-2 ms-2" data-bs-toggle="modal" data-bs-target="#contact-details" onclick="toggleBlur()">
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

let editorHTML = `
<div class="d-inline-flex">
<img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
    class="img d-inline-flex contact-img" alt="..." width="150" height="150">
<div class="ms-3 mt-3">
    sadasdas<br />
    sadasdas<br />
    sadasdas<br />
    sadasdas<br />
    sadasdas<br />
    sadasdas<br />
    sadasdas<br />
    sadasdas<br />
    sadasdas<br />
    sadasdas<br />
    sadasdas<br />
    sadasdas<br />
</div>
<div class="mt-3 container-fluid">
    <div class="float-end btn-group-vertical">
        <button type="button" class="btn-close mb-2" style="font-size: 23px" data-bs-dismiss="modal" aria-label="Close"></button>
        <i type="button" class="bi-pencil-square ms-1 mt-5 float-end" style="font-size: 28px;" data-bs-dismiss="modal"></i>
    </div>
</div>
</div>

<div class="ms-3" style="font-size: 25px">Notes</div>
<hr class="m-0">
<div id="notes" class="ms-3 my-2">
sadasdas<br />
<hr class="m-0 dashed-line">
sadasdas<br />
<hr class="m-0 dashed-line">
sadasdas<br />
<hr class="m-0 dashed-line">
sadasdas<br />
<hr class="m-0 dashed-line">
sadasdas<br />
<hr class="m-0 dashed-line">
sadasdas<br />
<hr class="m-0 dashed-line">
sadasdas<br />
<hr class="m-0 dashed-line">
sadasdas<br />
</div>

<div class="modal-footer">
<div class="btn" href="#signup" data-bs-target="#contact-editor" data-bs-toggle="modal"
    data-bs-dismiss="modal">Cancel</div>
<button id="" class="btn btn-primary" data-bs-target="#contact-editor" data-bs-toggle="modal"
    data-bs-dismiss="modal">Save</button>
</div>
`


$(window).ready(function () {
    // Check if user is logged in

    // Otherwise open Login window

    //Testcode
    // $('#contact-details').modal('toggle');


    $('#login-modal').modal('toggle');

    for (let i = 0; i < 20; i++) {
        $("#contact-list").append(contact);
    }
});

$("#login-btn").on('click', function () {
    login();
});

$("#signup-btn").on('click', function () {
    // input validation

    // Dismiss modal window
    $('#signup-modal').modal('toggle');

    // Login new user
    login();
});


// Toggle blur when modal windows are dismissed
$("#login-modal").on("hidden.bs.modal", function () {
    toggleBlur();
});

$("#contact-details").on("hidden.bs.modal", function () {
    toggleBlur();
});



function login() {
    // Test code
    // Adding cards
    $("#contact-list").empty();
    for (let i = 0; i < 10; i++) {
        $("#contact-list").append(contact);
    }
    // End test code
    $('#login-modal').modal('toggle');
}

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
    $("#editor").empty();
    $("#editor").append(editorHTML);
}