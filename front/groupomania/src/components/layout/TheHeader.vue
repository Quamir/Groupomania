<template>
    <header>

        <router-link to="/timeline">
            <img src="../../assets/images/logos/logoblack.svg" alt="" class="logo">
        </router-link>

        <nav v-if="!loginRender()" :class="{nav__column: renderSettingsBtn(route)}">
             <base-button class="base-btn" @click="logOut">Logout</base-button>
             <router-link to="/settings" v-if="renderSettingsBtn(route)">
                <base-button class="base-btn">settings</base-button>
             </router-link>
            <router-link :to="'/profile/'+id+'.'+name" v-if="!renderSettingsBtn(route)">
                <img :src="picture" alt="profile picture" class="profile-picture">
            </router-link>
        </nav>
    </header>
</template>

<script>
import router from '../../router/index';
import {useRoute} from 'vue-router';
import http from '../../mixins/http';
export default {
    mixins:[http],
    props:['picture', 'route'],
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
        renderSettingsBtn(path){
            if(useRoute().path === path){
                return true;
            }else{
                return false;
            }
        },
        async goToProfile(){
            const data = await this.fetchGet('http://localhost:3000/api/user/user');
            
            this.id = data.message.id;
            this.name = `${data.message.first_name}_${data.message.last_name}`;
        },

        logOut(){
            localStorage.removeItem('token');
            router.replace({path: '/login'});
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

.nav__column{

    @include breakpoint-down(mobile){
        margin-top: 10px;
        flex-direction: column;
        justify-content: space-between;
    }
}
</style>