export class kaya {
  constructor() {
    this._components = {};
  }

  component(name, componentDef) {
    if (typeof name !== 'string') throw new Error('Component name must be a string');
    
    if (typeof componentDef === 'function') {
      this._components[name] = {
        template: componentDef,
        handlers: {}
      };
    } else if (componentDef.template && componentHandlers) {
      this._components[name] = {
        template: componentDef.template,
        handlers: componentDef.handlers || {}
      };
    } else {
      throw new Error('Invalid component definition');
    }
  }

  render(name, props = {}) {
    const component = this._components[name];
    if (!component) throw new Error(`Component "${name}" not found`);

    const output = component.template({
      ...props,
      $emit: (handlerName, event) => {
        if (component.handlers[handlerName]) {
          return component.handlers[handlerName](event);
        }
        console.warn(`Handler "${handlerName}" not found in ${name}`);
      }
    });

    return this._processNestedComponents(output);
  }

  _processNestedComponents(html) {
    return html.replace(/<([a-zA-Z0-9_-]+)([^>]*)\s*\/>/g, (match, tagName, attrs) => {
      const child = this._components[tagName];
      return child ? child.template({ $handlers: child.handlers }) : match;
    });
  }
}

export const app = new kaya();