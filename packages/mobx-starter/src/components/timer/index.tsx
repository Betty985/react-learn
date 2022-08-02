import React from 'react'
import {observer} from 'mobx-react-lite'
import { makeAutoObservable } from 'mobx'
class Timer{
    secondsPassed=0
    constructor(){
        makeAutoObservable(this)
    }
    increaseTimer(){
        this.secondsPassed+=1
    }
}
const myTimer=new Timer()
setInterval(()=>{
    myTimer.increaseTimer()
},1000)
const TimerView=observer(({timer}:{timer:Timer})=>(
    <span>Seconds passed: {timer.secondsPassed}</span>
))
const firstTimer= ()=><TimerView timer={myTimer}/>
export default firstTimer