import dynamic from "next/dynamic";

const Markdown = dynamic(
  () => import("@kunlunxu/brick").then((mod) => mod.Markdown),
  { ssr: false },
);

export default Markdown;
