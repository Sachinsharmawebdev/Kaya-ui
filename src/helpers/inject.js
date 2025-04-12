export function injectHTML(targetElement, componentHTML) {
    if (!targetElement || typeof componentHTML !== 'string') {
        console.error('Invalid parameters passed to injectHTML.');
        return;
    }
    targetElement.innerHTML = componentHTML;
}
