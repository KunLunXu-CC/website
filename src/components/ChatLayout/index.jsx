import React from 'react';

import { VariableBlock } from 'qyrc';
import scss from './index.module.scss';

/**
 * @param {} props.header
 * @param {} props.footer
 * @param {} props.menu
 * @param {} props.header
 */
export default (props) => {
  return (
    <div className={scss['chat']}>
      <div className={scss['chat-header']}>
        {props.header}
      </div>
      <div className={scss['chat-body']}>
        <div className={scss['chat-body-side']}>
          {props.side}
        </div>
        <VariableBlock
          operationList={['right']}
          style={{ height: '100%', transform: `translate(0px, 0px)` }}
          className={scss['chat-body-menu']}
        >
          {props.menu}
        </VariableBlock>
        <div className={scss['chat-body-content']}>
          <div className={scss['chat-body-content-list']}>
            <div className={scss['container']}>{props.list}</div>
          </div>
          <VariableBlock
            operationList={['top']}
            defaultParams={{ height: 100 }}
            constraintSize={{ height: 100 }}
            className={scss['chat-body-content-edit']}
            style={{ width: '100%', transform: `translate(0px, 0px)` }}
          >
            <div className={scss['container']}>
              {props.edit}
            </div>
          </VariableBlock>
        </div>
      </div>
      <div className={scss['chat-footer']}>
      {props.footer}
      </div>
    </div>
  );
};
