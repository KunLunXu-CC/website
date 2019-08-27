import React from 'react';

import { VariableBlock } from 'qyrc';
import scss from './index.module.scss';

/**
 * @param {ReactNode} props.footer      底部
 * @param {ReactNode} props.header      头部
 * @param {ReactNode} props.tagList     侧边
 * @param {ReactNode} props.console     控制台
 * @param {ReactNode} props.WorkArea    工作区
 * @param {ReactNode} props.searchList  列表
 */
export default (props) => {
  return (
    <div className={scss['note']}>
      <div className={scss['note-header']}>{props.header}</div>
      <div className={scss['note-body']}>
        <div className={scss['note-body-tag-list']}>
          <div className={scss['container']}>{props.tagList}</div>
        </div>
        <VariableBlock
          operationList={['right']}
          className={scss['note-body-search-list']}
          style={{ height: '100%', transform: `translate(0px, 0px)` }}>
          <div className={scss['container']}>{props.searchList}</div>
        </VariableBlock>
        <div className={scss['note-body-content']}>
          <div className={scss['note-body-content-work-area']}>
            <div className={scss['container']}>{props.workArea}</div>
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
