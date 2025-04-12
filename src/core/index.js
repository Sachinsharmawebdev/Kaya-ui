export class kaya {
  constructor() {
    this._components = {};
  }

  component(name, fn) {
    if (typeof name !== 'string') throw new Error('Component name must be a string');
    if (typeof fn !== 'function') throw new Error('Component must be a function');
    this._components[name] = fn;
  }

  render(name, props = {}) {
    const component = this._components[name];
    if (!component) throw new Error(`Component "${name}" not found`);

    let output = component(props);

    // Enhanced Auto-nesting with props support
    output = output.replace(/<([a-zA-Z0-9_-]+)([^>]*)\s*\/>/g, (match, tagName, attributes) => {
      const child = this._components[tagName];
      if (!child) return match;
      
      // Parse attributes into props object
      const props = {};
      const attrRegex = /([a-zA-Z0-9_-]+)="([^"]*)"/g;
      let attrMatch;
      while ((attrMatch = attrRegex.exec(attributes)) !== null) {
        props[attrMatch[1]] = attrMatch[2];
      }
      
      return child(props);
    });

    return output;
  }
}

export const app = new kaya(); // global instance