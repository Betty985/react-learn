import React, { FC } from 'react'
import {Link} from 'react-router-dom'
import { inject,observer } from 'mobx-react'
interface LoggedOutProps{
    currentUser:string
}
const navArr=[
    {
        path:'/',
        title:'主页'
    },
    {
        path:'/login',
        title:'登录'
    },
    {
        path:'/register',
        title:'注册'
    }
]
const LoggedOutView:FC<LoggedOutProps>=props=>{
    if(!props.currentUser){ 
       return (
        <nav>
            {navArr.map((item)=>{
                const {path,title}=item
                return (
                    <li key={title}>
                        <Link to={path}>
                            {title}
                        </Link>
                    </li>
                )
            })}
        </nav>
       )
    }
    return null
}


@observer
class Header extends React.Component{
    render() {
        return (
            <nav>
                 <LoggedOutView currentUser={''} />
            </nav>
        )
    }
}
export default Header