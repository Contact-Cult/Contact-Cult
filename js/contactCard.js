let currentCard;
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
                            <i class="bi-telephone me-2 d-inline-flex align-middle"></i>
                            <div id="new-contact-phone" class="d-inline-flex align-middle"></div>
                        </div>
                        <div>
                            <i class="bi-envelope me-2 d-inline-block align-middle"></i>
                            <div id="new-contact-email" class="d-inline-block text-truncate align-middle" style="max-width: 150px;"></div>
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