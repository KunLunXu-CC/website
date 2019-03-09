// 路由工具类
export default class RouteHelper {
  constructor({ settings = [], authorities }){
    this.authorities = authorities || false;
    this.settings = settings;

    this.routeList = [];
    this.menuList = [];
    this.init();
  }

  init(){
    this.recursionSettigns();
    console.log('===========================================');
    console.log(this.routeList);
    console.log(this.menuList);
  }

  /**
   * 递归配置
   * @param {Function} handler  处理函数 (v = {}, node = {}) => {}
   */
  recursionSettigns(){
    let node = [];
    const recursion = (settings) => {
      settings.forEach(v => {
        this.addMenuList(v);
        if (v.children && v.children.length > 0){
          node.push(v.path);
          recursion(v.children);
        } else {
          node.push(v.path);
          this.addRouteList(v, node);
          node = [];
        }
      });
    }
    recursion(this.settings || []);
  }


  addMenuList(setting){
    let index = 0;
    if (setting.children && setting.children.length > 0){
    
    } else {
     
    }
  }

  /**
   * 添加 route 到 routeList
   * @param {Object} setting 当前配置项
   * @param {Array} node  节点列表其实就是 path 列表, 
   */
  addRouteList(setting, node){
    this.routeList.push({
      node: [...node],
      path: setting.path,
      page: setting.page,
      exact: setting.exact || false,
    });
    if (setting.subpage && setting.subpage.length > 0){
      setting.subpage.forEach(v => {
        this.routeList.push({
          path: v.path,
          page: v.page,
          exact: v.exact || false,
          node: [ ...node, v.path ]
        });
      })
    }
  }
}
