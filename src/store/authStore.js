import { defineStore } from "pinia";
import axios from "axios";


export const useAuthStore = defineStore('auth',{
    state:()=>({
        isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
        user:JSON.parse(localStorage.getItem('user')),
        token:localStorage.getItem('token')
    }),
    actions:{
        async login(credentials){
            try{
                //首先发送登录请求
                const loginResponse = await axios.post('/user/login',credentials);
                const token = loginResponse.data;
                this.token = token;
                localStorage.setItem('token',token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                //登录成功后获取用户信息
                const userResponse = await axios.get(`/user/me`);
                this.user = {
                    username: userResponse.data.username,
                    email: userResponse.data.email,
                };
                this.isLoggedIn = true;
                localStorage.setItem('user',JSON.stringify(this.user));
                localStorage.setItem('isLoggedIn','true');
            }catch(error){
                console.error('Login error',error);
                this.isLoggedIn = false;
                throw error;
            }
        },
        logout(){
            this.isLoggedIn = false;
            this.user = null;
            this.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            delete axios.defaults.headers.common['Authorization'];
        }
    }
});