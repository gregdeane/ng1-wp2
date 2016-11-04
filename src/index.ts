import * as angular from 'angular';
import './app/index';

angular.module('solutioncenter.mvp', [
  'solutioncenter.mvp.app'
]);

angular.element(document).ready(() => {
  angular.bootstrap(document, ['solutioncenter.mvp'], {
    strictDi: true
  });
});
