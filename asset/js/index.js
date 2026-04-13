let links = [];
const inputEl = document.getElementById("input-el");
const searchEl = document.getElementById("search-el");
const saveBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const logoImg = document.getElementById("logo-img");
const ulEl = document.getElementById("ul-el");
const messageDiv = document.getElementById("message");
const exportBtn = document.getElementById("export-btn");
const importBtn = document.getElementById("import-btn");
const importFile = document.getElementById("import-file");

// Initialize
function init() {
    chrome.storage.local.get(["smar"], (result) => {
        links = result.smar || [];
        render(links);
    });
}

function updateStorage() {
    chrome.storage.local.set({ "smar": links });
}

function showMessage(text, color = "var(--primary-color)") {
    messageDiv.innerHTML = `<span style="color: ${color}">${text}</span>`;
    setTimeout(() => { messageDiv.innerHTML = ""; }, 2000);
}

function render(leadsToRender) {
    let listItems = "";
    leadsToRender.forEach((lead, index) => {
        listItems += `
            <li class="li-el">
                <span class="delete-link" data-url="${lead}">✖</span>
                <a target='_blank' href='${lead}' class="a-el" title="${lead}">
                    ${lead}
                </a>
            </li>
        `;
    });
    ulEl.innerHTML = listItems;

    document.querySelectorAll(".delete-link").forEach(btn => {
        btn.addEventListener("click", function() {
            const urlToRemove = this.getAttribute("data-url");
            links = links.filter(l => l !== urlToRemove);
            updateStorage();
            render(filterLinks(searchEl.value));
            showMessage("Deleted", "var(--danger-color)");
        });
    });
}

function filterLinks(query) {
    return links.filter(link => link.toLowerCase().includes(query.toLowerCase()));
}

// Events
saveBtn.addEventListener("click", () => {
    const val = inputEl.value.trim();
    if (val === "") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const url = tabs[0].url;
            if (!links.includes(url)) {
                links.unshift(url);
                updateStorage();
                render(links);
                showMessage("Tab Saved!");
            }
        });
    } else {
        if (!links.includes(val)) {
            links.unshift(val);
            inputEl.value = "";
            updateStorage();
            render(links);
            showMessage("Saved!");
        }
    }
});

searchEl.addEventListener("input", (e) => {
    render(filterLinks(e.target.value));
});

deleteBtn.addEventListener("dblclick", () => {
    links = [];
    chrome.storage.local.clear();
    render(links);
    showMessage("Cleared All", "var(--danger-color)");
});

logoImg.addEventListener("click", () => {
    links.forEach(link => chrome.tabs.create({ url: link }));
});

// Export
exportBtn.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(links, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `smar-links-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showMessage("Exported!");
});

// Import
importBtn.addEventListener("click", () => importFile.click());
importFile.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const imported = JSON.parse(event.target.result);
            if (Array.isArray(imported)) {
                links = [...new Set([...links, ...imported])];
                updateStorage();
                render(links);
                showMessage("Imported Successfully!");
            }
        } catch (err) {
            showMessage("Invalid JSON", "var(--danger-color)");
        }
    };
    reader.readAsText(file);
});

init();
