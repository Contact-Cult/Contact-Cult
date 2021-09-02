let contact = `<div class="card border-0 h-100 g-0 mt-2 ms-2">
<div class="container-fluid d-inline-flex">
    <img src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
        class="img rounded-start d-inline-flex" alt="..."
        style="min-height: 110px; max-height: 110px; max-width: 110px; ">

    <div class="ms-2 mt-1">
        <h5 class="card-title">John Doe</h5>

        <div class="card-text">
            555-555-5555<br />
            John@example.com<br />
            <div>
                <i class="bi-tags-fill text-muted"></i>
            </div>
        </div>
    </div>
</div>
</div>`;

$(document).ready(function(){
    $('#login-modal').modal('toggle');
});

$("#login-btn").on('click', function(){
    login();
});

$("#signup-btn").on('click', function(){
    $('#signup-modal').modal('toggle');
    login();
});

function login() {
    // Test code
    // Adding cards
    for (let i = 0; i < 20; i++) {
        $("#contact-list").append(contact);
    }
    // End test code
    $('#login-modal').modal('toggle');
    toggleBlur();

}

function toggleBlur() {
    $("#navbar").toggleClass("modal-blur");
    $("#card-deck").toggleClass("modal-blur");
}

function addContact() {
    $("#contact-list").prepend(contact);
    scrollTop();
}

function scrollTop() {
    $("html, body").animate({ scrollTop: 0 }, "fast");
    return false;
};