<template>
    <section>
        <the-header :picture="userProfilePicture" class="profile-header"></the-header>
        <div class="cover" v-if="paramsEqual || findUser">
            <div class="cover__color-bg">
                <div class="cover__img-container">
                    <img :src="profilePicture" alt="profile picture" class="cover__profile-img" >
                    <p class="cover__name">{{firstName}}_{{lastName}}</p>
                </div>
            </div>
        </div>

        <div class="page-error" v-show="!paramsEqual && !findUser">
            <p>Cant find Page</p>
            <img src="../assets/images/cantfind.jpg" alt="unable to find page">
        </div>
        

        
<!-- 
        <div class="title">
            <h1>Post By {{firstName}} {{lastName}}</h1>
        </div>

        <div class="posts">
            <post-element></post-element>
        </div> -->

    </section>
</template>

<script>
import TheHeader from '../components/layout/TheHeader.vue';
export default {
    components:{
        TheHeader
    },
    data(){
        return{
            id: null,
            firstName: null,
            lastName: null,
            userProfilePicture: null,
            profilePicture: null,
            paramsEqual: null,
            findUser: null
        }
    },
    created(){
        this.CheckUserAccount();
        this.vistProfilePage();
        console.log(this.profilePicture);
    },
    methods:{
        async CheckUserAccount(){
            // console.log(localStorage.getItem('token'));
            const response = await fetch('http://localhost:3000/api/user/user',{
                headers:{
                    Authorization: 'Bearer' + ' ' + localStorage.getItem('token')
                }
            });
            
            const responseData = await response.json();
            console.log(responseData.message)
            this.userProfilePicture = responseData.message.profile_picture;
            const id = responseData.message.id;
            const name = `${responseData.message.first_name}_${responseData.message.last_name}`;

            const param = `/profile/${id}.${name}`;
            const params = param;

            if(this.$route.path === params){
                console.log(true);
                this.paramsEqual = true;
                this.firstName = responseData.message.first_name;
                this.lastName = responseData.message.last_name;
            }else{
                console.log(false);
                this.paramsEqual = false;
            }
        },
        async vistProfilePage(){
            const route = this.$route.path.split('.');
            const splitRoute = route[0].split('/');
            const data = JSON.stringify({ id: parseInt(splitRoute[2])});

            const response = await fetch('http://localhost:3000/api/user/profile',{
                method: 'POST',
                body: data,
                headers:{
                    Authorization: 'Bearer' + ' ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await response.json();
            console.log(responseData);

            if(responseData.message.status === 'fail'){
                console.log('can\t find user');
                this.findUser = false;
                console.log(this.findUser);
                console.log(this.paramsEqual);
            }else{
              this.findUser = true;
              this.firstName = responseData.message.first_name;
              this.lastName = responseData.message.last_name;
              this.profilePicture = responseData.message.profile_picture;

            }
            
        }
    },
}
</script>

<style lang="scss" scoped>

.profile-header{
    height: 10vh;
    background-color: rgba(253 , 45, 1, 45%);
}

.cover{

    &__color-bg{
        display: flex;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        height: 20vh;
        background-color: rgba(253 , 45, 1, 45%);
        margin-bottom: 125px;

        @include breakpoint-down(mobile){
            height: 27vh;
            margin-bottom: 40px;
        }
    }

    &__img-container{
        display: flex;
        padding-top: 30px;

        @include breakpoint-down(mobile){
            flex-direction: column;
            align-items: center;
            padding-top: 10px;
        }
    }

    &__profile-img{
        width: 200px;
        height: 200px;
        border-radius: 50%;
        object-fit: cover;

        @include breakpoint-down(mobile){
            width: 150px;
            height: 150px;
        }
    }

    &__name{
        font-size: rem(45);
        font-weight: bold;
        padding-top: 60px;
        padding-left: 100px;

        @include breakpoint-down(mobile){
            padding-top: unset;
            padding-left: 20px;
            font-size: rem(30);
        }
    }
}

.title{
    display: flex;
    align-items: center;
    width: 40vw;
    height: 50px;
    margin: auto;
    margin-bottom: 35px;
    border-radius: 25px;
    background-color: rgba(107,104,104,0.3);

    @include breakpoint-down(mobile){
        width: 90vw;
        margin: auto;
        margin-bottom: 40px;
    }

    & h1{
        text-indent: 50px;
        font-size: rem(25);

        @include breakpoint-down(mobile){
            text-indent: 80px;
            font-size: rem(18);
        }
    }
}

.posts{
    width: 99vw;
    display: flex;
    justify-content: center;
    align-items: center;
}

.page-error{
    width: 100vw;
    height: 90vh;
    overflow: hidden;
    position: relative;
    

    & p{
        position: absolute;
        top: 30%;
        left: 43%;
        font-size: rem(50);
        font-weight: bold;
        color: $secondary-color;
    }
    & img{
        width: 100%;
        height: 100%;
    }
}
</style>