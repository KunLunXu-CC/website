import React from 'react';

import { VariableBlock } from 'qyrc';
import scss from './index.module.scss';

/**
 * @param {ReactNode} props.list    列表
 * @param {ReactNode} props.side    侧边
 * @param {ReactNode} props.work    工作区
 * @param {ReactNode} props.footer  底部
 * @param {ReactNode} props.header  头部
 * @param {ReactNode} props.console 控制台
 */
export default (props) => {
  return (
    <div className={scss['note']}>
      <div className={scss['note-header']}>{props.header}</div>
      <div className={scss['note-body']}>
        <div className={scss['note-body-side']}>
          <div className={scss['container']}>{props.side}</div>
        </div>
        <VariableBlock
          operationList={['right']}
          className={scss['note-body-list']}
          style={{ height: '100%', transform: `translate(0px, 0px)` }}>
          <div className={scss['container']}>{props.list}</div>
        </VariableBlock>
        <div className={scss['note-body-content']}>
          <div className={scss['note-body-content-work']}>
            <div className={scss['container']}>{props.work}</div>
          </div>
          <VariableBlock
            operationList={['top']}
            defaultParams={{ height: 100 }}
            constraintSize={{ height: 100 }}
            className={scss['note-body-content-console']}
            style={{ width: '100%', transform: `translate(0px, 0px)` }}>
            <div className={scss['container']}>{props.console}</div>
          </VariableBlock>
        </div>
      </div>
      <div className={scss['note-footer']}>{props.footer}</div>
    </div>
  );
};
