console.log("ini clog dari akunin")

function divChangeCallback(mutationsList, observer) {
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            console.log('Div changed!');
        }
    }
}

function startObserving() {
    const primaryColumn = document.querySelector('[data-testid="primaryColumn"]')

    if (primaryColumn) {
        const observer = new MutationObserver(divChangeCallback);
        const config = { attributes: true, childList: true, subtree: true };
        observer.observe(primaryColumn, config);
    } else {
        setTimeout(startObserving, 500);
    }
}

startObserving();