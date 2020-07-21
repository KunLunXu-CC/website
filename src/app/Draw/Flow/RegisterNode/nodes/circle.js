import { setAnchorPointsState } from 'gg-editor';

const config = {
  draw (model, group) {
    const { width = 160, height = 100 } = model;

    const keyShape = group.addShape('rect', {
      attrs: {
        width,
        height,
        x: - width / 2,
        y: - height / 2,

        radius: 3,
        lineWidth: 1,
        fill: '#e7f7ff',
        stroke: '#a7ddfd',
      },
    });
    return keyShape;
  },

  setState (name, value, item) {
    // 设置锚点状态
    setAnchorPointsState.call(
      this,
      name,
      value,
      item,
      (item, anchorPoint) => {
        const { width, height } = item.getKeyShape().getBBox();
        const [x, y] = anchorPoint;
        return {
          x: (width * x) - (width / 2),
          y: (height * y) - (height / 2),
        };
      },

      (item, anchorPoint) => {
        const { width, height } = item.getKeyShape().getBBox();
        const [x, y] = anchorPoint;
        return {
          x: (width * x) - (width / 2),
          y: (height * y) - (height / 2),
        };
      },
    );
  },

  getAnchorPoints () {
    return [
      [0.5, 0],
      [0.5, 1],
      [0, 0.5],
      [1, 0.5],
    ];
  },
};

export default {
  config,
  name: 'flow-node',
};
