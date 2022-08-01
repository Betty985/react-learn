/**
 * 把网页地址的查询参数字符串转换成对象
 * @returns 
 */
const getSearchObj=()=>{
    const {search} = window.location
    const searchStr=search.slice(1)
    const pairs=searchStr.split('&')
    const searchObj:Record<string,string>={}
    pairs.forEach(pair=>{
        const [key,value]=pair.split('=')
        searchObj[key]=value
    })
    return searchObj
}
/* 
把 查询字符串 转换为 对象，可以用下面更现代且更安全的方法(注意浏览器兼容性)
const safeGetSearchObj=()=>{
    return Object.fromEntries(
        new URLSearchParams(window.location.search).entries()
    )
} */
export default getSearchObj