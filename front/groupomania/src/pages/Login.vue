<template>
    <section class="landing">

        <div class="left-landing" v-if="!loginRender()">
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

        <img src="../assets/images/homepage.jpg" alt="" class="mobile-backdrop" v-if="loginRender()">

        <aside  class="log-in" v-if="!loginRender()">
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
            <img src="../assets/images/logos/logo_white.svg" alt="Groupomania logo" class="mobile-logo">
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
}
</script>


<style lang="scss" scoped>

.homepage{
   width: 100%;
   height: 100%;
   clip-path: polygon(0 0, 70% 0, 100% 112%, 0% 100%);   

    @include breakpoint-down(mobile){
        width: 100vw;
        height: 93vh;
        clip-path: unset;
        object-fit: cover;
        overflow: hidden;
    }
}

.landing{
    height: 92.5%;
    width: 100%;
    display: flex;

    @include breakpoint-down(mobile){
        display: unset;
        width: 50%;
    }
  
}

.left-landing{
    width: 65%;
    height: 93vh;
    overflow: hidden;

        &__text{
        width: 50%;
        position: absolute;
        z-index: 2;
        top: 65%;
        left: 2%;

        @include breakpoint-down(mobile){
            display: none;
        }

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

    @include breakpoint-down(mobile){
        width: 100vw;
        height: 93vh;
    }
}

.log-in{
    display: flex;
    flex-direction: column;

    @include breakpoint-down(mobile){
        width: 100vw;
        align-items: center;
        position: absolute;
        top: 70px;
        margin: unset;
    }

    & .module{
        height: 450px;
        width: 400px;
        margin-top: 60px;

        @include breakpoint-down(mobile){
            width: 90vw;
            
        }

        & span{
            padding-top: 10px;
        }

        &__btn{
            margin-top: 10px;
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

    @include breakpoint-down(mobile){
        background: unset;
        position: unset;
    }

    & .module{
        height: 600px;
        width: 650px;
        margin-top: 10px;
        background-color: white;
        border: 5px solid   rgba(253,45,1,0.3);

        @include breakpoint-down(mobile){
            height: max-content;
            border-radius: unset;
            font-size: 30px;
            margin: unset;
        }

        &__form{
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: max-content;

            @include breakpoint-down(mobile){
               flex-direction: column;
            }
        }

        &__form-text{
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            padding-bottom: 20px;
            padding-left: 20px;
            & input{
                width: 60%;

                @include breakpoint-down(mobile){
                    width: 90%;
                }
            }

             @include breakpoint-down(mobile){
                align-items: center;
                padding: unset;
            }

            
        }

        &__form-upload{
            display: flex;
            flex-direction: column;
            margin-right: 50px;

            @include breakpoint-down(mobile){
                align-items: center;
                margin: unset;
                margin-bottom: 20px;
            }
        }

        &__form-btn{
            height: 35px;
            font-size: rem(16);

            @include breakpoint-down(mobile){
                width: 80%;
            }
        }
    }

    &__btn{
        width: 50%;
        height: 35px;
        margin-left: 120px;
        font-size: rem(18);

        @include breakpoint-down(mobile){
            margin: unset;
            margin-bottom: 20px;
            width: 60%;
        }
    }

    &__upload-picture{
        width: 150px;
        height: 150px;

    }
}

.logo{
    position: relative;
    align-self: center;

    @include breakpoint-down(mobile){
        display: none;
    }
}

.buttons{
    background-color: blue;
}

.mobile-logo{
    display: none;

    @include breakpoint-down(mobile){
        display: unset;
        width: 80vw;
        padding-top: 150px;
    }
}

.display-none{
    display: none;
}

.mobile-backdrop{
    height: 93vh;
    width: 100vw;

    @include breakpoint-down(mobile){
        display: none;
    }
}

</style>