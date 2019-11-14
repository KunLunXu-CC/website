import _ from 'lodash';
import { observable, autorun, toJS } from 'mobx';
import Upload from './upload';
import Photos from './photos';
import Message from './message';

export default class Store {
  constructor (global) {
    this.global = global;
    _.forIn(this.autorunList, v => autorun(v));
  }

  @observable upload = new Upload(this);
  @observable photos = new Photos(this);
  @observable message = new Message(this);

  // 自动运行列表
  autorunList = {
    print: () => {
      console.group('%c[store]Album', 'color: green;');
      console.log('message: ', toJS(this.message));
      console.log('upload: ', toJS(this.upload));
      console.log('photos: ', toJS(this.photos));
      console.groupEnd();
    },
  }
}
