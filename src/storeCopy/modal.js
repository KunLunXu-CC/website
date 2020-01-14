import { observable, action } from 'mobx';

export default class Photos {
  constructor (parent) {
    this.parent = parent;
  }

  @observable modals = {};

  @action
  open = ({ code, ... rest }) => {
    this.modals = { ... this.modals, [code]: rest };
  }

  @action
  close = code => {
    if (!code) {
      this.modals = {};
    } else if (this.modals[code]) {
      const modals = { ... this.modals };
      delete modals[code];
      this.modals = modals;
    }
  }
}
