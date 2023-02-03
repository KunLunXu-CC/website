import scss from './upload.module.scss';

import { Button } from 'antd';
import { actions } from '@store';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';

export default () => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(actions.photos.updateUpload({ show: true }));
  }, [dispatch]);

  return (
    <div className={scss.upload}>
      <Button
        block
        type="primary"
        onClick={handleClick}
        icon={<UploadOutlined />}>
        上传
      </Button>
    </div>
  );
};
