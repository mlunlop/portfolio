//Listen for the scroll event on the window
window.onscroll = updateProgressBar;

// Calculates the scroll percentage and updates the width of the progress bar//

function updateProgressBar() {
    // 1.Current scroll position from the top
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    
    // 2.Total scrollable height
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // 3.Calculate the scroll percentage
    const scrolled = (winScroll / height) * 100;
    
    // 4.Apply the calculated width to the bar element
    document.getElementById("myBar").style.width = scrolled + "%";
}