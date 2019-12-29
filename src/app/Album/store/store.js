
import { observable, autorun, toJS } from 'mobx';
import Upload from './upload';
import Photos from './photos';

export default class Store {
  constructor (global) {
    this.global = global;
    _.forIn(this.autorunList, v => autorun(v));
  }

  @observable upload = new Upload(this);
  @observable photos = new Photos(this);

  // 自动运行列表
  autorunList = {
    print: () => {
      console.group('%c[store]Album', 'color: green;');
      console.log('upload: ', toJS(this.upload));
      console.log('photos: ', toJS(this.photos));
      console.groupEnd();
    },
  }
}
