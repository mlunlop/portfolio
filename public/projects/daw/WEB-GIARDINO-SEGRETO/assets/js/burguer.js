document.addEventListener("DOMContentLoaded", () => {
    const navIcon = document.getElementById("nav-icon");
    const menuMobile = document.querySelector(".menu_mobile");
    const menuLinks = document.querySelectorAll(".menu_mobile_nav li a");

    //Open and close when click on te icon
    navIcon.addEventListener("click", function () {
        this.classList.toggle("open");
        menuMobile.classList.toggle("open-menu");
        
        document.body.style.overflow = menuMobile.classList.contains("open-menu") ? "hidden" : "auto";
    });

    // Close the menu when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener("click", () => {
            navIcon.classList.remove("open");
            menuMobile.classList.remove("open-menu");
            document.body.style.overflow = "auto";
        });
    });
});