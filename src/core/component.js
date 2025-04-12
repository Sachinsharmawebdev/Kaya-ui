import { kaya } from './index.js';

// Register a component
kaya.prototype.component = function (name, fn) {
  if (typeof name !== 'string') {
    throw new Error('Component name must be a string');
  }
  if (typeof fn !== 'function') {
    throw new Error('Component must be a function');
  }

  this._components[name] = fn;
};

// Render a component and pass props + instance for nested rendering
kaya.prototype.render = function (name, props = {}) {
  const component = this._components[name];
  if (!component) {
    throw new Error(`Component "${name}" not found`);
  }

  // Render the raw HTML of the component
  let output = component(props);

  // Automatically detect and replace nested component tags
  output = output.replace(/<([a-zA-Z0-9_-]+)\s*\/>/g, (match, tagName) => {
    const child = this._components[tagName];
    if (child) {
      return child({});
    }
    return match; // if component doesn't exist, leave as-is
  });

  return output;
};

