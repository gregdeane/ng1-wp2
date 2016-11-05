import ScAppController from './app.controller';

class ScAppComponent {
  bindings: any = {
    'moduleId': '@',
    'moduleName': '@',
    'debugConfig': '<?'
  };
  template: string = '<h1>ScAppComponent Template / {{$ctrl.moduleId}} / {{$ctrl.moduleName}}</h1>';
  controller: Function = ScAppController;
}

export default ScAppComponent;
