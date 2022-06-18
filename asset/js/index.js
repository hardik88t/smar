let links = ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"];
const inputEl = document.getElementById("input-el");
const saveBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");

const logoImg = document.getElementById("logo-img");

const liEl = document.getElementById("li-el");
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
        messageDiv.innerHTML = 
            `
            <p  style=" padding: 2px;
                        background: #5393F1;
                        border: 2px solid #0c4396;
                        border-radius: 3px;
                        margin: 0;
                        text-align: center;
                    ">
                    New Link Added
            </p>
            `
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

logoImg.addEventListener("click", function(){
    //open links in new tab
    for (let i = 0; i < links.length; i++) {
        chrome.tabs.create({url: links[i]});
    }
});

// liEl.addEventListener("dblclick", function(){
//     //delete current link
//     let link = this.children[0].href;
//     links.splice(links.indexOf(link), 1);
//     localStorage.setItem("smar", JSON.stringify(links));
//     liPrinter(links);
//     messageDiv.innerHTML =
//     `
//     <p  style=" padding: 2px;
//                 background: #5393F1;
//                 border: 2px solid #0c4396;
//                 border-radius: 3px;
//                 margin: 0;
//                 text-align: center;
//             ">
//             Link Deleted
//     </p>
//     `
//     inputEl.focus();
// });

function liPrinter(ary){
    //print all links in arr to ul --> li
    let linkItems = "";
    for (let i = 0; i < ary.length; i++) {
        linkItems += `
                        <li class="li-el" id="${ary[i]}">
                        <span class="delete-link">
                        =>
                        </span>
                            <a target='_blank' href='${ary[i]}' id="a-el">
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
            inputEl.focus();
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