function detectRedmine() {
    const meta = document.querySelector('meta[name="generator"]') || document.querySelector('meta[name="description"]');
    const bodyClass = document.body?.className || '';
    const hasHeader = !!document.querySelector('#header h1 .current-project');

    return (
        (meta && meta.content.includes('Redmine')) ||
        (hasHeader && bodyClass.includes('controller-'))
    );
}

function init() {
    addDownloadBtnToPosts();
}

if (detectRedmine()) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
        });
    } else {
        init();
    }
}
