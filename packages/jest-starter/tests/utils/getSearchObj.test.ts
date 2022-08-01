import getSearchObj from "utils/getSearchObj";
// import {JSDOM} from 'jsdom'
// const jsdom=new JSDOM()
describe('getSearchObj',()=>{
    it('获取当前网址的查询参数对象',()=>{
        // window.location.href = "https://www.baidu.com?a=1&b=2";
        
        // Object.defineProperty(window, 'location', {
        //     writable: true,
        //     value: { href: 'https://google.com?a=1&b=2', search: '?a=1&b=2' },
        //   });

        // jsdom.reconfigure({
        //     url:'https://www.baidu.com?a=1&b=2'
        // })

        // global.jsdom.reconfigure({
        //     url:'https://www.baidu.com?a=1&b=2',
        // })

        window.location.assign('https://www.baidu.com?a=1&b=2');
        expect(window.location.search).toEqual('?a=1&b=2')
        expect(getSearchObj()).toEqual({
            a:'1',
            b:'2'
        })
    });
    it('空参数返回空',()=>{
        // window.location.href='https://www.baidu.com'

        // Object.defineProperty(window, 'location', {
        //     writable: true,
        //     value: { href: 'https://google.com', search: '' },
        //   });
        
        // jsdom.reconfigure({
        //     url:'https://www.baidu.com'
        // })

        // global.jsdom.reconfigure({
        //     url:'https://www.baidu.com'
        // })

        window.location.assign('https://www.baidu.com');
        expect(window.location.search).toEqual('')
        expect(getSearchObj()).toEqual({})
    })
})