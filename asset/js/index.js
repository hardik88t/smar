let links = ["https://www.youtube.com/watch?v=dQw4w9WgXcQ"];

const inputEl = document.getElementById("input-el");
const saveBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");

const logoImg = document.getElementById("logo-img");

const liEl = document.getElementById("li-el");
const ulEl = document.getElementById("ul-el");
const messageDiv = document.getElementById("message");
const localLinks = JSON.parse(localStorage.getItem("smar"));

const themeBtn = document.getElementById("theme-btn");
const circle3 = document.getElementById("circle-3");

if (localLinks) {
    links = localLinks
    liPrinter(links);
}

saveBtn.addEventListener("click", function () {
    //save current tab url
    if (inputEl.value === "") {
        tabSaver();
    }
    //save input value
    else {
        saveInput();
    }
});


deleteBtn.addEventListener("dblclick", function () {
    //delete all links
    deleteaAllLinks();

});


logoImg.addEventListener("click", function () {
    //open all links in new tab
    for (let i = 0; i < links.length; i++) {
        chrome.tabs.create({ url: links[i] });
    }
});

messageDiv.addEventListener("dblclick", function () {
    //delete last link
    deleteLastLink();
});

// themeBtn.addEventListener("click", function () {
//     //change theme
//     if (circle3.style.fill == "#000000") {
//         circle3.style.fill = "#ff0000";
//     }
// });



function saveInput() {
    messageDiv.innerHTML = "";
    links.push(inputEl.value);
    inputEl.value = "";
    inputEl.focus();
    localStorage.setItem("smar", JSON.stringify(links));
    liPrinter(links);
    messageDiv.innerHTML =
        `
            <p class="msg" id="msg-new-link">
                    New Link Added
            </p>
            `
}


function deleteaAllLinks() {
    localStorage.clear();
    messageDiv.innerHTML =
        `
        <p class="msg" id="all-del">
                All Link Deleted
        </p>
    `
    inputEl.focus();
    links = [];
    ulEl.innerHTML = "";
}


function deleteLastLink() {
    links.pop();
    localStorage.setItem("smar", JSON.stringify(links));
    liPrinter(links);
    messageDiv.innerHTML =
        `
    <p class="msg" id="msg-del">
            Last Link Deleted
    </p>
    `
    inputEl.focus();
}


function liPrinter(ary) {
    //print all links in arr to ul --> li
    let linkItems = "";
    for (let i = 0; i < ary.length; i++) {
        link = ary[i];
        // let link = checkLinkType(ary[i]);
        linkItems += `
                        <li class="li-el" id="li-${i}">
                        <span class="arrow" id='del-${i}'>
                        <!--❌--> =>
                        </span>
                            <a target='_blank' href='${ary[i]}' id="a-${i}" class="a-el">
                                ${link}
                            </a> 
                        </li>
                    `
    }
    ulEl.innerHTML = linkItems;
}


function tabSaver() {
    // save current tab url
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        links.push(tabs[0].url);
        localStorage.setItem("smar", JSON.stringify(links));
        inputEl.focus();
        liPrinter(links);
    }
    );

    messageDiv.innerHTML =
        `
    <p class="msg" id="msg-tab-added">
            Currunt Tab Added
    </p>
    `
    inputEl.focus();
}




function checkLinkType(link) {
    // check is link have http or https
    if (link.includes("https://")) {
        if (link.includes("www.")) {
            link.remove("https://www.");
            return link;
        }
        else {
            link.remove("https://");
            return link;
        }
    }
    else if (link.includes("http://")) {
        if (link.includes("www.")) {
            link.remove("http://www.");
            return link;
        }
        else {
            link.remove("http://");
            return link;
        }
    }
    else {
        return link;
    }
}