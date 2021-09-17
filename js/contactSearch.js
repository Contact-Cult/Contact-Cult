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