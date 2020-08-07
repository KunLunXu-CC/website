const config = {
  draw (cfg, group) {
    const { startPoint, endPoint } = cfg;
    const keyShape = group.addShape('path', {
      attrs: {
        path: [
          ['M', startPoint.x, startPoint.y],
          ['L', endPoint.x, endPoint.y],
        ],
        stroke: 'steelblue',
        lineWidth: 3,
        startArrow: {
          path: 'M 10,0 L -10,-10 L -10,10 Z',
          d: 10,
        },
        endArrow: {
          path: 'M 10,0 L -10,-10 L -10,10 Z',
          d: 10,
        },
      },
    });
    return keyShape;
  },
};

export default {
  config,
  name: 'custom-edge',
};
