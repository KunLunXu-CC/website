import _ from 'lodash';
import { observable, autorun, toJS } from 'mobx';
import Upload from './upload';
import Photos from './photos';
import Spin from '@store/common/spin';
import Message from '@store/common/message';

export default class Store {
  constructor (global) {
    this.global = global;
    _.forIn(this.autorunList, v => autorun(v));
  }

  @observable upload = new Upload(this);
  @observable photos = new Photos(this);
  @observable message = new Message(this);
  @observable spin = new Spin(this);

  // 自动运行列表
  autorunList = {
    print: () => {
      console.group('%c[store]Album', 'color: green;');
      console.log('message: ', toJS(this.message));
      console.log('upload: ', toJS(this.upload));
      console.log('photos: ', toJS(this.photos));
      console.log('spin: ', toJS(this.spin));
      console.groupEnd();
    },
  }
}
