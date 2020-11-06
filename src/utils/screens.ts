export const loginPageOptions = {
  root: {
    component: {
      name: 'com.nertivia.LoginScreen',
    },
  },
};

export const mainPageOptions = {
  root: {
    sideMenu: {
      id: 'DRAWERS',
      options: {
        sideMenu: {
          left: {
            width: 300,
          },
        },
        statusBar: {
          drawBehind: true,
          backgroundColor: 'transparent',
        },
      },
      left: {
        component: {
          id: 'LEFT_DRAWER',
          name: 'com.nertivia.LeftDrawer',
          options: {
            statusBar: {
              drawBehind: true,
              backgroundColor: 'transparent',
            },
          },
        },
      },
      center: {
        component: {
          id: 'CENTER_APP',
          name: 'com.nertivia.App',
          options: {
            statusBar: {
              drawBehind: true,
              backgroundColor: 'transparent',
            },
          },
        },
      },
    },
  },
};
