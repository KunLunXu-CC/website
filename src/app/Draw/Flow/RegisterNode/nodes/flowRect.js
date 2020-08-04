import { setAnchorPointsState } from 'gg-editor';
/**
 * https://www.yuque.com/antv/g6/xp4nym
 * https://www.yuque.com/antv/g6/xp4nym
 * https://www.yuque.com/antv/g6/s?q=setState
 */
// 设置锚点
const setAnchorPoints = ({ ctx, name, value, item }) => {
  setAnchorPointsState.call(
    ctx,
    name,
    value,
    item,
    (item, anchorPoint) => {
      const { color } = item._cfg ?. model ?? {};
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

// 设置节点选中状态
const setSelectedState = ({ ctx, name, value, item }) => {
  console.log('ctx, name, value, item', ctx, name, value, item);
};

const config = {
  draw (model, group) {
    const {
      width,
      height,
      color,
      label,
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

        select: {
          fillOpacity: 0.6,
        },
      },
    });

    group.addShape('text', {
      attrs: {
        x: 0,
        y: 0,
        text: label,
        fontSize: 14,
        textAlign: 'center',
        textBaseline: 'middle',
        fill: 'rgba(0, 0, 0, 0.5)',
      },
    });

    return keyShape;
  },

  setState (name, value, item) {
    setAnchorPoints({ ctx: this, name, value, item });
    setSelectedState({ ctx: this, name, value, item });
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
  name: 'flow-rect',
};
