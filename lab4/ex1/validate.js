function validateForm() {
    const search_string = document.getElementById("search_string").value;

    if (search_string === "") {
        alert("Search string is empty!");
        return false;
    } else {
        return true;
    }
}
