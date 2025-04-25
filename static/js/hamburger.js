// click function for hamburger menu
// w3schools

const myFunction = () => {
    var hamburgerNav = document.querySelector("#myLinks");
    if (hamburgerNav.style.display === "block") {
      hamburgerNav.style.display = "none";
    } else {
      hamburgerNav.style.display = "block";
}  }