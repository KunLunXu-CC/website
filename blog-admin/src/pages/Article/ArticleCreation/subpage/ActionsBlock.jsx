import React from 'react';
import { Card, message } from 'antd';
import * as CONTS from '@config/conts';
import { FontIcon } from '@components';
import { update } from '@server/article';
import { withRouter } from 'react-router-dom';

const useStateHook = (props) => {
  /**
   * 更新数据
   * @param {} values 表单数据
   * @param {} type   更新类型（ save: 保存、 release: 发布 ）
   */
  const onUpdate = ({values, type = 'save'}) => {
    const { articleId } = props.match.params;
    const typeMap = {
      save: {
        status: CONTS.ARTICLE_STATUS.SAVE.VALUE,
        successText: '保存成功'
      },
      release: {
        status: CONTS.ARTICLE_STATUS.RELEASE.VALUE,
        successText: '发布成功'
      }
    };
    values.status = typeMap[type].status;
    update({ body: values, ids: [articleId] }).then(res => {
      props.setArticle(res.change[0]);
      message.success(typeMap[type].successText);
    });
  }

  // 保存
  const onSave = () => {
    props.form.validateFieldsAndScroll((errors, values) => {
      !errors && onUpdate({values, type: 'save'});
    });
  }

  // 发布
  const onRelease = () => {
    props.form.validateFieldsAndScroll((errors, values) => {
      !errors && onUpdate({values, type: 'release'});      
    });
  }
  return { onSave, onRelease };
}

export default withRouter((props) => {
  const { onSave, onRelease } = useStateHook(props);
  return (
    <Card
      title="操作按钮" 
      className="block_fourth"
      bodyStyle={{padding: '0'}}
      actions={[
        <FontIcon 
          size="18px"
          label="保存"
          onClick = {onSave}
          icon="#icon-baocun" 
        />,
        <FontIcon 
          size="18px"
          label="发布"
          icon="#icon-fabu" 
          onClick = {onRelease}
        />,
      ]}
    />
  );
});
