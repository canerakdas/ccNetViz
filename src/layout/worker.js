import ccNetViz_layout from './index';

export default class Worker {
  constructor(layout) {
    this.layout = `${String(ccNetViz_layout[layout])}`;
  }

  createBlob() {
    const script = `
    var layout = ${this.layout};

    onmessage = ({ data }) => {
      var res = layout(data.nodes,data.edges,data.layout_options).apply();
      postMessage(sorted);
      close();
    };`;

    return URL.createObjectURL(
      new Blob([script], { type: 'application/javascript' })
    );
  }
}
