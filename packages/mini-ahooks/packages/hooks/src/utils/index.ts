/* 
is:
要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词。 
谓词为 parameterName is Type这种形式， parameterName必须是来自于当前函数签名里的一个参数名。
 */
export const isNumber=(value:unknown):value is number=>typeof value==='number'

