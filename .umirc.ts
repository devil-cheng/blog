import { IConfig } from 'umi-types';
import pageRouters from './config/router.js';

// ref: https://umijs.org/config/
const config: IConfig =  {
  treeShaking: true,
  routes: pageRouters,
  //生成hash文件名
  hash: true,
  //兼容浏览器版本  配置需要兼容的浏览器最低版本，会自动引入 polyfill 和做语法转换 Default: { chrome: 49, firefox: 64, safari: 10, edge: 13, ios: 10 }
  targets: {
    ie: 11,
  },
  // 代理配置(跨域处理) http://10.98.98.142:8080/
  proxy: {
    '/api': {
      'target': 'http://localhost:3000',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'myBlogs',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ]
}

export default config;
