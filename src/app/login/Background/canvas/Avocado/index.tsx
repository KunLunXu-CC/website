import React, { useRef, useEffect, memo } from 'react';
import scss from './index.module.scss';

const useStateHook = () => {
  const canvasRef = useRef(null);

  useEffect(() => {}, [canvasRef]);

  return { canvasRef };
};

const Avocado = () => {
  const state = useStateHook();

  return (
    <div className={scss.avocado}>
      <canvas
        width="490"
        height="400"
        ref={state.canvasRef}
        className={scss.canvas}
      />
    </div>
  );
};

export default memo(Avocado);
