import { setAnchorPointsState } from 'gg-editor';

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

// 设置节点选中以及激活(鼠标停放)状态
const setSelectedOrActiveState = ({ name, value, item }) => {
  if (!['selected', 'active'].includes(name)) {
    return false;
  }
  const FILL_OPACITY_ACTIVE = 0.3;
  const group = item.getContainer();
  const [shape] = group.get('children');

  if (
    !setSelectedOrActiveState.fillOpacity &&
    shape.attrs.fillOpacity !== FILL_OPACITY_ACTIVE
  ) {
    setSelectedOrActiveState.fillOpacity = shape.attrs.fillOpacity;
  }

  shape.attr(
    'fillOpacity',
    value ? 0.3 : setSelectedOrActiveState.fillOpacity
  );
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
        fill: 'rgba(0, 0, 0, 0.4)',
      },
    });

    return keyShape;
  },

  setState (name, value, item) {
    setAnchorPoints({ ctx: this, name, value, item });
    setSelectedOrActiveState({ ctx: this, name, value, item });
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
