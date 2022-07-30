import router from '../router/index.js';
export default{
    methods:{
        async getUserInfo(){
            const response = await fetch('http://localhost:3000/api/user/user',{
                headers:{
                    Authorization: 'Bearer' + ' ' + localStorage.getItem('token')
                }
            });
            const responseData = await response.json();
         
            if(responseData.status === 'fail' || responseData.status === 'error'){
                router.replace({path: '/login'});
            }else{
               return responseData;
            }
        },

        checkToken(){
            if(localStorage.getItem('token') === null){
               router.replace({path: '/login'});
            }
        }
    }
}