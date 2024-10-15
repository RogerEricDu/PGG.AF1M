//引入mock
import Mock from 'mockjs'

//使用mock模拟数据

Mock.mock ('/user/find',{
    "ret":0,
    "data":
    {
        username:"test123",
        password:"test123",
        email:"test@google.com"
    }
});

//延迟请求的数据
Mock.setup({
    timeout:400
})
