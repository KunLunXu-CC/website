import dynamic from "next/dynamic";

const ECharts = dynamic(
  () => import("@kunlunxu/brick").then((mod) => mod.Echarts),
  { ssr: false },
);

export default ECharts;
