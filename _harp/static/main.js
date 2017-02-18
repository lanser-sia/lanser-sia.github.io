if (document.cookie.replace(/(?:(?:^|.*;\s*)underConstruction\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "true") {
    alert("This site is under construction.");
    document.cookie = "underConstruction=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}