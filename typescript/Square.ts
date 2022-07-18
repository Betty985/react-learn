interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}
function createSquare(config: SquareConfig): { color: string; area: number } {
  // ...
  return { color: "red", area: 100 };
}
// let c={ colour: "red", width: 100 }
let mySquare = createSquare({ colour: "red", width: 100 });
console.log(mySquare);
/* 跳过对象字面量赋值给变量或作为参数传递时，ts进行额外属性检查的方法
 * 1.使用类型断言
 * 2.字符串索引签名
 * 3.将这个对象赋值给一个另一个变量
 */

//   函数类型。函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}
console.log(mySearch);

interface StringArray {
  [index: number]: string
}
let myArray: StringArray
myArray = ['Bob', 'Fred'];
let myStr: string = myArray[0]
console.log(myStr)
interface NumberDictionary {
  [index: string]: number;
  length: number;
  // name:string  与索引返回值的类型不匹配
}


// 类接口。明确地强制一个类去符合某种契约,描述了类的公共部分。类实现接口时只对类的实例部分进行检查。
interface ClockInterface {
  curTime: Date;
  setTime(d: Date): Date;
  // new (hour:number,minute:number)
}
class Clock implements ClockInterface {
  // constructor(h:number,m:number){
  // }
  // 类“Clock”错误实现接口“ClockInterface”。
  // 类型“Clock”提供的内容与签名“new (hour: number, minute: number): any”不匹配。ts(2420)
  curTime: Date;
  setTime(d: Date) {
    let day:Date=new Date()
    return day
  }
}

interface ClockConstructor{
  new (hour:number,minute:number):IClockInterface
}
interface IClockInterface{
  tick()
}
function createClock(ctor:ClockConstructor,hour:number,minute:number){
  return new ctor(hour,minute)
}
class DigitalClock implements IClockInterface{
  constructor(h:number,m:number){}
  tick() {
    console.log('beep beep')
  }
}
class AnalogClock implements IClockInterface{
  constructor(h:number,m:number){}
  tick(){
    console.log('tick tock')
  }
}
let digital=createClock(DigitalClock,12,17)
let analog=createClock(AnalogClock,7,32)

// 继承接口
interface Shape{
  color:string;
}
interface PenStroke{
  penWidth:number
}
interface Square extends Shape,PenStroke{
  sideLength:number
}

// 混合类型
interface Counter{
  (start:number):string;
  interval:number;
  reset():void
}
function getCounter():Counter{
  let counter=<Counter>function (start:number){};
  counter.interval=123
  counter.reset=function (){}
  return counter
}

// 接口继承类。继承类的成员但不包括其实现。继承一个拥有私有或受保护成员的类的接口类型只能被这个类或其子类实现。
class Control{
  private state:any
}
interface SelectableControl extends Control{
  select():void
}
class Button extends Control implements SelectableControl{
  select(){}
}
class Image implements SelectableControl{
  // private state:any  为什么不行？
  select() {  }
}