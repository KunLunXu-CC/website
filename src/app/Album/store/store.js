import { observable, autorun, toJS } from 'mobx';
import Upload from './upload';

export default class Store {
  constructor (global) {
    this.global = global;
    autorun(this.print);
  }

  @observable upload = new Upload(this);

  print = () => {
    console.group('%c[store]Album', 'color: green;');
    console.log('upload: ', toJS(this.upload));
    console.groupEnd();
  };
}
