const path=require('path')

const config = {
  projectName: 'cityFateNext2',
  date: '2020-3-7',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  alias: {
    "taro-ui": path.resolve(__dirname, '../lib/taro-ui-fix/src'),
    "nervjs": path.resolve(__dirname, '../node_modules/react')
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  // babel: {
  //   sourceMap: true,
  //   presets: [
  //     ['env', {
  //       modules: false
  //     }]
  //   ],
  //   plugins: [
  //     // 'transform-decorators-legacy',
  //     // 'transform-class-properties',
  //     // 'transform-object-rest-spread',
  //     // ['transform-runtime', {
  //     //   "helpers": false,
  //     //   "polyfill": false,
  //     //   "regenerator": true,
  //     //   "moduleName": 'babel-runtime'
  //     // }]
  //   ]
  // },
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
      {from: 'src/sitemap.json', to: 'dist/sitemap.json'}
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    esnextModules: ['taro-ui'],
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8'
          ]
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
