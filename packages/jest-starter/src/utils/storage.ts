// 自定义的key，防止全局污染
const KEY_NAME='my-app-'
const set=(key:string,value:string)=>{
    localStorage.setItem(KEY_NAME+key,value)
}
const get=(key:string)=>{
    return localStorage.getItem(KEY_NAME+key)
}
const storage={
    get,set
}
export default storage