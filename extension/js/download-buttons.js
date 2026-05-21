function addDownloadBtnToPosts() {
    const albumsContainers = document.querySelectorAll('.attachments.album');

    albumsContainers.forEach(album => {
        const parent = album.parentElement;

        const imageDownloadUrls = Array.from(album.querySelectorAll('dl dd.big .action button.attachment.download')).map(btn => {
            const onclick = btn.getAttribute('onclick');
            const url = onclick.split('=')[1]
                .trim()
                .replace(/'/g, '')
                .replace(/;$/, '');

            let fullUrl = url;
            if (url.startsWith('/')) {
                fullUrl = window.location.origin + url;
            }
            return fullUrl;
        });

        const downloadParams = [...imageDownloadUrls]
            .filter(url => !!url)
            .filter((item, idx, array) => array.indexOf(item) === idx)
            .map(url => ({
                url,
                filename: getFilename(url),
            }));
        console.log({downloadParams});
        const downloadBtn = createDownloadBtn(downloadParams);
        parent.querySelector('p.apijs.section').appendChild(downloadBtn);
    });
}

function getFilename(url) {
    return url.split('?')[0].split('/').at(-1);
}

function createDownloadBtn(downloadParams) {
    const downloadBtn = document.createElement('button');
    downloadBtn.type = 'button';
    downloadBtn.title = 'Download all';
    downloadBtn.classList.add('rdmn-dwl-btn');
    downloadBtn.innerHTML = 'Download all';
    setClickAction(downloadBtn, downloadParams);
    return downloadBtn;
}

function setClickAction(downloadBtn, downloadParams) {
    downloadBtn.addEventListener('click', e => {
        e.preventDefault();
        const param = {downloadParams, msgName: 'download'};
        chrome.runtime.sendMessage(param);
    });
}
