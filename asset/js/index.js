
let links = ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");
const messageDiv = document.getElementById("message");
const localLinks = JSON.parse(localStorage.getItem("smar"));

if(localLinks){
    links = localLinks
    liPrinter(links);
}

inputBtn.addEventListener("click", function() {
    if(inputEl.value === "") {
        console.log("Nothing to add");
        messageDiv.innerHTML = 'Nothing to add';
        inputEl.focus();
    }
    else{
        messageDiv.innerHTML = "";
        links.push(inputEl.value);
        inputEl.value = "";
        inputEl.focus();
        localStorage.setItem("smar", JSON.stringify(links));
        liPrinter(links);
    }
});

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    inputEl.focus();
    links = [];
    ulEl.innerHTML = "";
    messageDiv.innerHTML = "";
    // localStorage.removeItem("smar");
    // localStorage.setItem("smar", JSON.stringify(arr));
})

function liPrinter(ary){
    let linkItems = "";
    for (let i = 0; i < ary.length; i++) {
        linkItems += `
                        <li>
                            <a target='_blank' href='${ary[i]}'>
                                ${ary[i]}
                            </a> 
                        </li>
                    `
    }
    ulEl.innerHTML = linkItems;
}