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
            this.id = responseData.message.id
            this.profilePicture = responseData.message.profile_picture;
            

            if(responseData.status === 'fail' || responseData.status === 'error'){
                router.replace({path: '/login'});
            }else{
                this.auth = true;
            }
        },
    }
}