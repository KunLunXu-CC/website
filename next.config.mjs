/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const list = [];

    // 开发环境, 后端接口走代理(重写)
    if (process.env.NODE_ENV === 'development') {
      list.push({
        source: '/api/:path*',
        destination: 'http://127.0.0.1:4000/api/:path*',
      });
    }

    return list;
  },

  // 按需加载
  modularizeImports: {
    '@kunlunxu/brick': {
      transform: '@kunlunxu/brick/es/{{kebabCase member}}',
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
