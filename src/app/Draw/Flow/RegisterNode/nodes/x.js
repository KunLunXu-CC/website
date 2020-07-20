import React from "react";
import ReactDOM from "react-dom";
import GGEditor, { Flow, RegisterNode, ItemPanel, Item } from "gg-editor";

import "./styles.css";

class Index extends React.Component {
  state = {
    data: {
      nodes: [
        {
          type: "node",
          shape: "start-node",
          label: "开始节点",
          x: 200,
          y: 200,
          id: 1,
          index: 1
        }
      ],
      edges: []
    }
  };

  render() {
    const { data } = this.state;

    const nodeConfig = {
      draw(item) {
        const group = item.getGraphicGroup();
        const model = item.getModel();
        const width = 140;
        const height = 40;
        const x = -width / 2;
        const y = -height / 2;
        const borderRadius = 2;
        const keyShape = group.addShape("rect", {
          attrs: {
            x,
            y,
            width,
            height,
            radius: borderRadius
          }
        });
        group.addShape("path", {
          attrs: {
            fill: this.color,
            stroke: this.color
          }
        });
        group.addShape("text", {
          attrs: {
            text: model.label ? model.label : this.label,
            x: x + 12,
            y: y + 14,
            textAlign: "start",
            textBaseline: "top",
            fill: "#fff"
          }
        });
        // 状态 logo
        group.addShape("image", {
          attrs: {
            img: this.state_icon_url,
            x: width / 2 - 24,
            y: y + 12,
            width: 16,
            height: 16
          }
        });
        return keyShape;
      },
      anchor: [
        [0.5, 0], // 上面边的中点
        [0.5, 1] // 下边边的中点
      ]
    };

    const NODES = [
      {
        type: 0,
        label: "开始",
        color: "#ffc66a",
        name: "start-node"
      }
    ];

    return (
      <GGEditor className="wrapper">
        <RegisterNode name="flow-node" config={nodeConfig} />
        {NODES.map(node => (
          <RegisterNode
            key={node.type}
            name={node.name}
            config={{
              label: node.label,
              color: node.color
            }}
            extend="flow-node"
          />
        ))}
        <div className="sider">
          <ItemPanel>
            <Item
              type="node"
              shape="start-node"
              src="https://gw.alipayobjects.com/zos/rmsportal/ZnPxbVjKYADMYxkTQXRi.svg"
            />
          </ItemPanel>
        </div>
        <div className="content">
          <Flow data={data} className="flow" />
        </div>
      </GGEditor>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);
