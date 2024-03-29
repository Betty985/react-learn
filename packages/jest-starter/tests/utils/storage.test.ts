import storage from 'utils/storage'
describe("storage",()=>{
    it('缓存值',()=>{
        storage.set('newKey',"hello")
        expect(localStorage.getItem('my-app-newKey')).toEqual("hello")
    })
    it('设置值',()=>{
        localStorage.setItem('my-app-newKey','hello')
        expect(storage.get('newKey')).toEqual("hello")
    })
})
