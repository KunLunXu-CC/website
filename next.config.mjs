/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const list = [
      {
        // 后端接口, 统一走这里进行重写
        source: "/api/:path*",
        destination: "http://127.0.0.1:4000/api/:path*",
      },
    ];

    return list;
  },

  // transpilePackages: ["@kunlunxu/brick"],

  // // 按需加载
  modularizeImports: {
    "@kunlunxu/brick": {
      transform: "@kunlunxu/brick/es/{{kebabCase member}}",
    },
  },

  // experimental: {
  //   optimizePackageImports: ["@kunlunxu/brick"],
  // },
  // experimental: {
  //   optimizePackageImports: ['package-name'],
  // },
  // modularizeImports: {
  //   // "@kunlunxu/brick": {
  //   //   transform: {
  //   //     '': "@kunlunxu/brick/es/{{member}}",
  //   //     '2': "@kunlunxu/brick/es/{{member}}/style",
  //   //   },
  //   //   // additionalImports: [
  //   //   //   'my-library/{{ matches.[1] }}/{{member}}/style',
  //   //   // ],
  //   // },
  //   "@kunlunxu/brick": {
  //     transform: "@kunlunxu/brick/es/{{member}}"
  //   },
  //   "@kunlunxu/brick/styles": {
  //     transform: "@kunlunxu/brick/es/styles"
  //   },
  //   // "@mui/lab": {
  //   //   transform: "@mui/lab/{{member}}"
  //   // }
  // }
};

export default nextConfig;
// modularizeImports
