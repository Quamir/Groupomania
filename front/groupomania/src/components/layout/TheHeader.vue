<template>
    <header>

        <router-link to="/timeline">
            <img src="../../assets/images/logos/logoblack.svg" alt="" class="logo">
        </router-link>

        <nav v-if="!loginRender()">
             <base-button class="base-btn">Logout</base-button>
             <button class="theme-btn">
             <img src="../../assets/images/buttons/sun.svg" alt="change theme">
            </button>
            <router-link :to="'/profile/'+id+'.'+name">
                <img :src="picture" alt="profile picture" class="profile-picture">
            </router-link>
        </nav>
    </header>
</template>

<script>
import {useRoute} from 'vue-router';
export default {
    props:['picture'],
    data(){
        return{
            id: null,
            name: null
        }
    },
    created(){
        this.goToProfile();
    },
    methods:{
        loginRender(){
            if(useRoute().path === '/login' || useRoute().path === '/signup'){
                return true;
            }else{
                return false;
            }
        },
        async goToProfile(){
            const response = await fetch('http://localhost:3000/api/user/user',{
                headers:{
                    Authorization: 'Bearer' + ' ' + localStorage.getItem('token')
                }
            });

            const responseData = await response.json();
            this.id = responseData.message.id;
            this.name = `${responseData.message.first_name}_${responseData.message.last_name}`;
        }
    },
}
</script>


<style lang="scss">
header{
    max-width: 100vw;
    height: 7vh;
    background-color: $secondary-color;
    display: flex;
    justify-content: space-between;

}

.logo{
    width: 150px;
    padding-top: 15px;
    padding-left: 15px;
    margin-bottom: 10px;
}

nav{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 20px;

    & .base-btn{
        width: 80px;
        height: 35px;
        font-size: rem(16);
        margin-right: 15px;
    }

    & .profile-picture{
        width: 45px;
        height: 45px;
        border-radius: 25px;
        border: 3px solid black;
        margin-left: 20px;
    }
}

.theme-btn{
    width: 40px;
    height: 35px;
    display: flex;
    border-radius: 7px;
    background-color: $primary-color;
    align-items: center;
    justify-content: center;

    & img{
        width: 30px;
    }
}
</style>