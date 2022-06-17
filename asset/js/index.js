let links = ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"];
const inputEl = document.getElementById("input-el");
const saveBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");
const messageDiv = document.getElementById("message");
const localLinks = JSON.parse(localStorage.getItem("smar"));


if(localLinks){
    links = localLinks
    liPrinter(links);
}

saveBtn.addEventListener("click", function() {
    //save current tab url
    if(inputEl.value === "") {
        tabSaver();  
    }
    //save input value
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
    //delete all links
    localStorage.clear();
    inputEl.focus();
    links = [];
    ulEl.innerHTML = "";
    messageDiv.innerHTML = "";
});


function liPrinter(ary){
    //print all links in arr to ul --> li
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


function tabSaver(){
    // save current tab url
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            links.push(tabs[0].url);
            localStorage.setItem("smar", JSON.stringify(links));
            liPrinter(links);
        }
    );
    messageDiv.innerHTML = 
    `
    <p  style=" padding: 2px;
                background: #54ee2d;
                border: 2px solid #0c4396;
                border-radius: 3px;
                margin: 0;
                text-align: center;
            ">
            Currunt Tab Added
    </p>
    `
    inputEl.focus();
}