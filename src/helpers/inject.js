export function injectHTML(targetElement, componentHTML) {
    if (!targetElement || typeof componentHTML !== 'string') {
        console.error('Invalid parameters passed to injectHTML.');
        return;
    }
    
    const temp = document.createElement('div');
    temp.innerHTML = componentHTML;
    
    // Process @event directives
    const eventRegex = /@([a-zA-Z]+)="([^"]+)"/g;
    const elements = temp.querySelectorAll('[^>]*');
    
    elements.forEach(element => {
        const outerHTML = element.outerHTML;
        let newHTML = outerHTML;
        let match;
        
        while ((match = eventRegex.exec(outerHTML)) !== null) {
            const [fullMatch, eventType, handlerName] = match;
            element.addEventListener(eventType, (e) => {
                const component = element.closest('[data-component]');
                if (component) {
                    const componentName = component.getAttribute('data-component');
                    const comp = app._components[componentName];
                    if (comp?.handlers?.[handlerName]) {
                        comp.handlers[handlerName](e);
                    }
                }
            });
            newHTML = newHTML.replace(fullMatch, '');
        }
        
        if (newHTML !== outerHTML) {
            const newElement = document.createElement('div');
            newElement.innerHTML = newHTML;
            element.parentNode.replaceChild(newElement.firstChild, element);
        }
    });

    element.addEventListener(eventType, (e) => {
        if (modifiers.includes('prevent')) e.preventDefault();
        if (modifiers.includes('stop')) e.stopPropagation();
        // Call the handler function with the event object
        handler(e, ...args);
    });
    
    targetElement.innerHTML = '';
    targetElement.appendChild(temp);
}