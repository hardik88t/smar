chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "saveToSmar",
        title: "Save to smar",
        contexts: ["link", "image", "page"]
    });
});

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "saveToSmar") {
        const urlToSave = info.linkUrl || info.srcUrl || info.pageUrl;
        
        chrome.storage.local.get(["smar"], (result) => {
            const currentLinks = result.smar || [];
            if (!currentLinks.includes(urlToSave)) {
                currentLinks.push(urlToSave);
                chrome.storage.local.set({ "smar": currentLinks });
            }
        });
    }
});
