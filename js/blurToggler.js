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