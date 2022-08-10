import path from 'path'
module.exports = {
    reslove: {
        alias: {
           '@/*': path.resolve(__dirname, './src/*')
        }
    }
}