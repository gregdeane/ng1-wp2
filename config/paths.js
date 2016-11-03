const helpers = require('./helpers');

module.exports = {
  root: '/',
  dist: helpers.root('dist'),
  src: helpers.root('src'),
  config: helpers.root('config'),
  styles: helpers.root('src/assets/styles'),
  indexHtml: helpers.root('src', 'index.html'),
  indexTs: helpers.root('src', 'index.ts'),
  breakpointSass: helpers.root('node_modules/breakpoint-sass/stylesheets'),
  dressCode: helpers.root('node_modules/dress-code/dist/sass')
};
