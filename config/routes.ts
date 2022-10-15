export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '预约管理',
    path: '/management',
    routes: [
      {
        name: '预约记录列表',
        path: '/management/eservation',
        component: './reservationRecordList',
      },
      {
        naem: '预约配置',
        path: '/management/config',
        component: './appointmentConfing',
      },
      {
        redirect: '/management/eservation',
      },
    ],
  },
  {
    name: '表格数据处理',
    path: 'sheet',
    component: './sheetData',
  },
  {
    name: '解析表格',
    path: '/excel',
    component: './excel',
  },
  {
    name: 'initialState',
    path: 'state',
    component: './initialState',
  },
  {
    name: 'audio',
    path: '/audio',
    component: './audio',
  },
  {
    name: 'Carousel',
    path: '/carousel',
    component: './carousel',
  },
  {
    name: '文字提示',
    path: '/popover',
    component: './Popover',
  },
  {
    name: 'myPrompt',
    path: '/myPrompt',
    component: './myPrompt',
  },
  {
    path: '/stopModal',
    name: '组织跳转',
    component: './stopModal',
  },
  {
    path: '/menu',
    name: 'menu 菜单',
    component: './menu',
  },
  {
    path: '/formupload',
    name: '表单上传',
    component: './formUpload',
  },
  {
    path: '/terr',
    name: '树结构',
    component: './terr',
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/myterr',
    name: 'Mytree',
    component: './Myterr',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: 'upload',
    name: '上传',
    component: './upload',
  },
  {
    path: '/uploadPro',
    name: '上传Pro',
    component: './uploadPro',
  },
  {
    path: 'card',
    name: '卡片',
    component: './card',
  },
  {
    path: 'dragsorttable',
    name: '编辑移动表格',
    component: './DragSortTable',
  },
  {
    path: 'checkcard',
    name: '可选卡片',
    component: './CheckCard',
  },
  {
    path: 'login',
    layout: false,
    component: './login',
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    name: 'slider',
    path: '/slider',
    component: './slider',
  },
  {
    name: '滚动条',
    path: '/scroll',
    component: './CustomScroll',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
