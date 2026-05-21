chrome.runtime.onMessage.addListener((arg, sender, sendResponse) => {
    const msgName = arg.msgName;

    if (msgName === 'download') {
        const downloadParams = arg.downloadParams;
        downloadParams.forEach(downloadParam => chrome.downloads.download(downloadParam));
    }
});
