export default {
  pages: [
    'pages/index/index',
    'pages/mine/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  "tabBar": {
    color: '#666',
    selectedColor: '#e93b3d',
    "list": [{
      iconPath:'./assets/tabBar/home.png',
      selectedIconPath:'./assets/tabBar/selectHome.png',
      "pagePath": "pages/index/index",
      "text": "相亲广场"
    }, {
      iconPath:'./assets/tabBar/mine.png',
      selectedIconPath:'./assets/tabBar/selectMine.png',
      "pagePath": "pages/mine/index",
      "text": "我的"
    }]
  },
}
