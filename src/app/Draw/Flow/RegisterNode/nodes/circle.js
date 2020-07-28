import { setAnchorPointsState } from 'gg-editor';

const setAnchorPoints = (ctx, name, value, item) => {
  setAnchorPointsState.call(
    ctx,
    name,
    value,
    item,
    (item, anchorPoint) => {
      const { color } = item._cfg?.model ?? {};
      const { width, height } = item.getKeyShape().getBBox();
      const [x, y] = anchorPoint;
      return {
        r: 4,
        stroke: color,
        x: (width * x) - (width / 2),
        y: (height * y) - (height / 2),
      };
    }
  );
};

const config = {
  draw (model, group) {
    const {
      width = 160,
      height = 100,
      color = '#1890ff',
    } = model;

    const keyShape = group.addShape('rect', {
      attrs: {
        width,
        height,
        x: - width / 2,
        y: - height / 2,

        fill: color,
        fillOpacity: 0.2,

        radius: 3,
        lineWidth: 1,
        stroke: color,
      },
    });

    return keyShape;
  },

  setState (name, value, item) {
    setAnchorPoints(this, name, value, item);
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
