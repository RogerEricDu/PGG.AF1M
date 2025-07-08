import { defineStore } from "pinia";
/* import axios from "axios"; */
import request from '@/utils/request'
//统一使用request.js进行封装，否则axios和request不统一会invalid


export const useUserStore = defineStore('user',{
    state:()=> ({
        currentUser: null,
        users:[]
    }),
    actions:{
        async fetchCurrentUser(username){
            try{
                const response = await request.get(`/user/${username}`);
                this.currentUser = response.data;
            }catch(error){
                console.error('Error fetching user:','error');
            }
        },
        async updateUserInfo(userInfo){
            try{
                const response = await request.put(`/user/`,userInfo);
                this.currentUser = response.data; //更新current user
            }catch(error){
                console.error('Error updating user:','error');
            }
        },
        async fetchUsers(){
            try{
                const response = await request.get('/user');
                return response.data; // 仅适用于管理员
            }catch(error){
                console.error('Error fetching users;',error);
            }
        }
    }
})
