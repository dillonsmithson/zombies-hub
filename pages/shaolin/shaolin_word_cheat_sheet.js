const dropdown = document.getElementById("dropdown");
const button = document.getElementById("dropdownBtn");
const selectedImg = document.getElementById("selectedImg");


// VARIABLE THAT STORES SELECTED VALUE
let selectedValue = "basket-weave";


button.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});


const items = document.querySelectorAll(".dropdown-item");


items.forEach(item => {

  item.addEventListener("click", () => {

    // update image
    selectedImg.src = item.dataset.img;

    // update selected value
    selectedValue = item.dataset.value;

    console.log(selectedValue);

    // close dropdown
    dropdown.classList.remove("active");

  });

});


window.addEventListener("click", (e) => {

  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove("active");
  }

});
