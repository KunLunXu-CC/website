import React, {
  useRef,
  useEffect,
} from 'react';
import scss from './index.module.scss';

const useStateHook = () => {
  const canvasRef = useRef(null);

  useEffect(() => {

  }, [canvasRef]);

  return { canvasRef };
};

export default () => {
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
