<template>
    <section class="landing">

        <div class="left-landing">
            <div class="left-landing__text">
                <div class="left-landing__text-box">
                    <p>Connect with collegues</p>
                </div>
                <div class="left-landing__text-box">
                    <p>Share innovative ideas</p>
                </div>
            </div>
            <img src="../assets/images/homepage.jpg" alt="" class="homepage">
        </div>

        <aside  class="log-in">
            <base-module class="module">
               <template #form-content>
                    <label for="email">Email</label>
                    <input type="text" id="email"/>
                    <label for="password">Password</label>
                    <input type="password" id="password"/>
                    <span>Frogot password</span>
               </template>
               <template #buttons>
                    <base-button class="module__btn">Log In</base-button>
                    <base-button class="module__btn">Create new account</base-button>
               </template>
            </base-module>
            <img src="../assets/images/logoorange.png" alt="" class="logo">
        </aside>

        <div class="sign-up" v-if="loginRender()">
            <base-module class="module">

                <template #title>Sign Up</template>

                <template #form-content>
                    <section class="module__form">
                        <div class="module__form-text">
                            <label for="firstname">First Name</label>
                            <input type="text" id="firstname"/>
                            <label for="lastname">Last Name</label>
                            <input type="text" id="lastname">
                            <label for="email">Email</label>
                            <input type="email" id="email"/>
                            <label for="password">Password</label>
                            <input type="password" id="password"/>
                            <label for="confrimpassword">Confrim Password</label>
                            <input type="password" id="Confrim Password">
                        </div>
                        <div class="module__form-upload">
                            <img src=
                                "../assets/images/profile_img.svg" 
                                alt="profile picture" 
                                class="sign-up__upload-picture">
                            <base-button class="module__form-btn">Upload Picture</base-button>
                        </div>
                    </section>
                    <base-button class="sign-up__btn">Create Account</base-button>
                </template>
            </base-module>
        </div>
    </section>
</template>

<script>
import {useRoute} from 'vue-router';
export default {
    methods:{
        loginRender(){
            if(useRoute().path === '/signup'){
                return true;
            }else{
                return false;
            }
        },
    },
    created(){

        console.log(useRoute().path);
        console.log(this.loginRender());
    }
}
</script>


<style lang="scss" scoped>
.homepage{
   width: 100%;
   height: 100%;
   clip-path: polygon(0 0, 70% 0, 100% 112%, 0% 100%);   
}

.landing{
    height: 92.5%;
    width: 100%;
    display: flex;
}

.left-landing{
    width: 65%;

        &__text{
        width: 50%;
        position: absolute;
        z-index: 2;
        top: 65%;
        left: 2%;

        &-box{
            width: 100%;
            height: 90px;
            background: rgba(107,104,104,0.6);
            display: flex;
            justify-content: center;
            align-items: center;

            & p{
                color: #FFFFFF;
                font-size: rem(42);
                font-style: italic;
                font-weight: bolder;
            }

            &:first-child{
                width: 75%;
                margin-bottom: 20px;
            }

            &:nth-last-child(1){
                & p{
                    position: relative;
                    left: -100px;
                }
            }
        } 
    }
}

.log-in{
    display: flex;
    flex-direction: column;

    & .module{
    height: 450px;
    width: 400px;
    margin-top: 60px;

        & span{
            padding-top: 10px;
            padding-left: 90px;
        }

        &__btn{
            margin-top: 10px;
            margin-bottom: 15px;
            width: 75%;
            height: 45px;
            font-size: rem(20);
        }
    }   
}

.sign-up{
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 6;
    left: 0px;
    width: 100%;
    height: 93%;
    background: rgba(107,104,104,0.8);

    & .module{
        height: 600px;
        width: 650px;
        margin-top: 10px;
        background-color: white;
        box-shadow: 0px 0px 25px 25px rgba(253,45,1,0.1);   
        border: 5px solid   rgba(253,45,1,0.3);

        &__form{
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 100%;
        }

        &__form-text{
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            padding-bottom: 20px;
            padding-left: 20px;
            & input{
                width: 60%;
            }
        }

        &__form-upload{
            display: flex;
            flex-direction: column;
            margin-right: 50px;
        }

        &__form-btn{
            height: 35px;
            font-size: rem(16);
        }
    }

    &__btn{
        width: 50%;
        height: 35px;
        margin-left: 120px;
        font-size: rem(18);
    }

    &__upload-picture{
        width: 150px;
        height: 150px;
    }
}

.logo{
    position: relative;
    align-self: center;
}

.buttons{
    background-color: blue;
}

</style>