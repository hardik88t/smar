
let links = ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"];
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");
const messageDiv = document.getElementById("message");
const localData = localStorage.getItem("smar");
let printed = false;

if(localData == undefined){
    localStorage.setItem("smar", JSON.stringify(links));
}

if(printed == false){
    printLinks();
}

inputBtn.addEventListener("click", function() {
    links = JSON.parse(localStorage.getItem("smar"));
    if(inputEl.value === "") {
        console.log("Nothing to add");
        messageDiv.innerHTML = 'Nothing to add';
        inputEl.focus();
    }
    else{
        messageDiv.innerHTML = "";
        links.push(inputEl.value);
        inputEl.focus();
        localStorage.setItem("smar", JSON.stringify(links));
        printLinks();
    }
});

deleteBtn.addEventListener("dblclick", function(){
    arr = []
    localStorage.removeItem("smar");
    localStorage.setItem("smar", JSON.stringify(arr));
    ulEl.innerHTML = "";
})

function printLinks(){
    links = JSON.parse(localStorage.getItem("smar"));
    let linkItems = "";
    for (let i = 0; i < links.length; i++) {
        linkItems += `
                        <li>
                            <a target='_blank' href='${links[i]}'>
                                ${links[i]}
                            </a> 
                        </li>
                    `
    }
    ulEl.innerHTML = linkItems;
    inputEl.value = "";
    printed = true;
}

