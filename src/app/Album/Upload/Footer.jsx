import scss from './footer.module.scss';

import { Button } from 'antd';
import { actions } from '@store';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUploadPhotosMutation } from '@store/graphql';

export default () => {
  const dispatch = useDispatch();
  const [upload] = useUploadPhotosMutation();
  const { files, type } = useSelector((state) => state.photos?.upload);

  // 取消
  const handleCancel = useCallback(() => {
    dispatch(actions.photos.updateUpload({ show: false }));
  }, [dispatch]);

  // 上传
  const handleUpload = useCallback(async () => {
    const { data } = await upload({ body: { files, type } });
    dispatch(actions.photos.appendPhotos(data.uploadPhotos.change));
    handleCancel();
  }, [dispatch, files, handleCancel, type, upload]);

  return (
    <div className={scss.footer}>
      <Button
        type="primary"
        onClick={handleUpload}>
        上传
      </Button>
      <Button onClick={handleCancel}>
        取消
      </Button>
    </div>
  );
};
