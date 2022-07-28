import * as ahooks from '..'
describe('hooks',()=>{
    Object.keys(ahooks).forEach((module)=>{
        expect(ahooks[module]).toBeDefined()
    })
})