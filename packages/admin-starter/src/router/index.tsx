import { FC, useEffect} from "react";
import { NavigateFunction ,Location, useNavigate, useLocation, useRoutes} from "react-router-dom";
import {RouteObj} from './type'
import routes  from "./routes";
//递归查询对应的路由
function searchroutedetail(
    path: string,
    routes: RouteObj[]
  ): RouteObj | null {
    for (let item of routes) {
      if (item.path === path) return item;
      if (item.children) {
        return searchroutedetail(path, item.children);
      }
    }
    return null;
  }
  //全局路由守卫
function guard(
    location: Location,//类型在react-router-dom中导入
    navigate: NavigateFunction,//类型在react-router-dom中导入
    routes: RouteObj[]
  ) {
    const { pathname } = location;
  
    //找到对应的路由信息，判断有没有权限控制
    const routedetail = searchroutedetail(pathname, routes);
    //没有找到路由，跳转404
    if (!routedetail) {
      // return navigate("/404");
      return false;
    }
    //如果需要权限验证
    if (1||routedetail.auth) {
      const token = localStorage.getItem("jwt");
      if (!token) {
        // 在历史堆栈中传递您想要进入的增量。例如，navigate(-1)相当于点击后退按钮。
        return navigate(-1);
      }
    }
  }
const RouterGurad:FC = (routes: RouteObj[]) => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
      guard(location, navigate, routes);
    }, [location, routes]);
    const Route = useRoutes(routes);
    return  Route;
  };
  export {routes,RouterGurad}

