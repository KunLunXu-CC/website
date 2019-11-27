import React, { Fragment } from 'react';
import { useObserver } from 'mobx-react-lite';

import Item from './Item';
import { useStore } from '../../store';

export default () => {
  const store = useStore();
  return useObserver(() => (
    <Fragment>
      {store.article.list.map((value, index) => (
        <Item
          data={value}
          key={value.id}
          align={index % 2 !== 0 ? 'right' : 'left'}
        />
      ))}
      <br/>
    </Fragment>
  ));
};
