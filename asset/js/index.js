let links = [];
const inputEl = document.getElementById("input-el");
const saveBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const logoImg = document.getElementById("logo-img");
const ulEl = document.getElementById("ul-el");
const messageDiv = document.getElementById("message");

// Load links from storage
chrome.storage.local.get(["smar"], function(result) {
    if (result.smar) {
        links = result.smar;
        render(links);
    }
});

function updateStorage() {
    chrome.storage.local.set({ "smar": links });
}

function showMessage(text, color = "#5393F1") {
    messageDiv.innerHTML = `
        <p style="padding: 5px; background: ${color}; border-radius: 4px; text-align: center; color: white; margin: 10px 0;">
            ${text}
        </p>
    `;
    setTimeout(() => { messageDiv.innerHTML = ""; }, 2000);
}

saveBtn.addEventListener("click", function() {
    const val = inputEl.value.trim();
    if (val === "") {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            links.push(tabs[0].url);
            updateStorage();
            render(links);
            showMessage("Current Tab Added", "#54ee2d");
        });
    } else {
        links.push(val);
        inputEl.value = "";
        updateStorage();
        render(links);
        showMessage("Link Added");
    }
});

deleteBtn.addEventListener("dblclick", function() {
    links = [];
    chrome.storage.local.clear();
    render(links);
    showMessage("All Links Deleted", "#ea4848");
});

logoImg.addEventListener("click", function() {
    links.forEach(link => {
        chrome.tabs.create({ url: link });
    });
});

function render(leads) {
    let listItems = "";
    leads.forEach((lead, index) => {
        listItems += `
            <li class="li-el">
                <span class="delete-link" data-index="${index}">✖</span>
                <a target='_blank' href='${lead}' class="a-el">
                    ${lead}
                </a>
            </li>
        `;
    });
    ulEl.innerHTML = listItems;

    // Add event listeners for individual deletes
    document.querySelectorAll(".delete-link").forEach(btn => {
        btn.addEventListener("click", function() {
            const idx = this.getAttribute("data-index");
            links.splice(idx, 1);
            updateStorage();
            render(links);
            showMessage("Link Deleted", "#ea4848");
        });
    });
}
