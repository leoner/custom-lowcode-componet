

export { default } from '/Users/kanghui/projj/github.com/leoner/custom-lowcode-componet/src/index.tsx';

import * as componentInstances from '/Users/kanghui/projj/github.com/leoner/custom-lowcode-componet/src/index.tsx';

import '/Users/kanghui/projj/github.com/leoner/custom-lowcode-componet/src/index.scss'

export * from '/Users/kanghui/projj/github.com/leoner/custom-lowcode-componet/src/index.tsx';

const coveredComponents = {};

const library = 'AntdProtableComponent';
const execCompile = !!false;

if (!execCompile) {
  window[library] = Object.assign({__esModule: true}, componentInstances || {}, coveredComponents || {});
}

function getRealComponent(component, componentName) {
  if (component.default) return component.default;
  if (component[componentName]) return component[componentName];
  return component;
}