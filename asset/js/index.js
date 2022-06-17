// function saveLink(){
//     let link1 = document.getElementById("input-el").value;
//     // localStorage.setItem("input", input);
//     console.log(link1);
//     // console.log("Hello");
// }
let links = ["https://github.com/hardik88t"]
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const printAt = document.getElementById("ul-el");

inputBtn.addEventListener("click", function() {

    links.push(inputEl.value);
    inputEl.value = "";
    printAt.innerHTML = null;
    let linkItems = "";
    for (let i = 0; i < links.length; i++) {

        // linkItems += "<li><a target='_blank' href='"+links[i]+"'>"+links[i]+"</a> </li>"
        linkItems += `
        <li>
            <a target='_blank' href='${links[i]}'>
                ${links[i]}
            </a> 
        </li>`
    }
    printAt.innerHTML = linkItems;
});
