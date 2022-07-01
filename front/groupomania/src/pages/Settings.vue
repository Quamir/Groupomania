<template>
    <section>
        <div class="user-info">
            <div class="user-info__profile-picture">
                <h3 class="title">Tyson Bryant</h3>
                <img src="../assets/images/tyson.jpg" class="profile-picture" alt="">
                <base-button class="base-btn">Change Picture</base-button>
            </div>
            <div class="user-info__text">
                <div class="name-row">
                    <p>Name</p>
                    <p>Tyson Bryant</p>
                    <base-button class="change-btn">change</base-button>
                </div>
                <div class="email-row">
                    <p>Email</p>
                    <p>Bryant_@gmail.com</p>
                    <base-button class="change-btn">change</base-button>
                </div>
                <div class="password-row">
                    <p>password</p>
                    <p>*******</p>
                    <base-button class="change-btn">change</base-button>
                </div>
                <div class="delete-account">
                    <p>DELETE ACCOUNT</p>
                </div>
                <!-- <img src="../assets/images/logoorange.png" alt=""> -->
            </div>
        </div>

        <footer>
            <img src="../assets/images/footer/group_1.jpg" class="footer__img" alt="group of professionals">
            <img src="../assets/images/footer/group_2.jpg" class="footer__img" alt="group of professionals">
            <img src="../assets/images/footer/group_3.jpg" class="footer__img" alt="group of professionals">
        </footer>

        <div class="tint" v-if="renderFilter()">

            <base-module class="delete-account"></base-module>
            <!-- <base-module class="change-password"></base-module>
            <base-module class="change-email"></base-module>
            <base-module class="change-picture"></base-module> -->

        </div>
    
    </section>
</template>

<script>
import {useRoute} from 'vue-router';
export default {
    methods:{
        renderFilter(){
            if(
                useRoute().path === '/deleteaccount' ||
                useRoute().path === '/changepassword' ||
                useRoute().path === '/changeemail' ||
                useRoute().path === '/updateprofilepicture'
            ){
                return true;
            }else{
                return false;
            }
        },
    },

    created(){
        console.log(useRoute().path);
        console.log(this.renderFilter());
    }
}
</script>

<style lang="scss" scoped>

.user-info{
    display: flex;
    width: 100%;
    height: 55.8vh;
    padding-left: 4%;

    &__profile-picture{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;

        &  .title{
            font-size: rem(30);
            margin: auto;
        }

        & .profile-picture{
            width: 200px;
            height: 200px;
            border-radius: 50%;
        }

        & .base-btn{
            width: 80%;
            height: 40px;
            font-size: rem(18);
            margin: auto;
        }
    }

    &__text{
        padding-left: 30%;
        padding-top: 70px;
        width: 70%;
        & p{
            padding-bottom: 10px;
            padding-top: 10px;
            font-size: rem(20);
            font-weight: bolder;
            color: $secondary-color;
        }

        & .name-row{
            display: flex;
            justify-content: space-between;
            margin-bottom: 5%;
        }

        & .email-row{
            display: flex;
            justify-content: space-between;
            margin-bottom: 5%;
        }

        & .password-row{
            display: flex;
            justify-content: space-between;
            margin-bottom: 5%;
        }

        & .delete-account{
            display: flex;
            justify-content: center;

            & p{
                font-size: rem(12);
                color: red;
            }
        }

        & .change-btn{
            padding-bottom: 5px;
            width: 100px;
            height: 40px;
            font-size: rem(16);
        }

    }
    
}

footer{
    width: 100%;
    height: 37.2vh;
    display: flex;
    align-items: end;
}

.footer__img{
    width: 33.33%;
    height: 55%;
    object-fit: cover;
}

.tint{
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    position: absolute;
    background: rgba(107,104,104,0.7);
}

</style>

