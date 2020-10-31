import React from 'react';
import scss from './index.module.scss';

const useStateHook = () => {

  React.useEffect(() => {

  }, []);
};

export default () => {
  const state = useStateHook();

  return (
    <div className={scss.logger}>

    </div>
  );
};
