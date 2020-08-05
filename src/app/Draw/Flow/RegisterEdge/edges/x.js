const config = {
  afterDraw(item) {
    const model = item.getModel();
    const group = item.getGraphicGroup();
    model.label = "ceshi";
    console.log(model, group);
    const shape = group.get("children")[0];

    shape.attr({
      stroke: "red",
      lineWidth: 2,
      lineDash: [5, 5]
    });

    console.log(group.get("children")[0]);
  }
};

export default {
  config,
  name: 'custom-edge',
  extend: 'flow-smooth',
};
