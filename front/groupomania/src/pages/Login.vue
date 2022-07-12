<template>
    <section>
        <the-header></the-header>
        <div class="landing">
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
                <form @submit.prevent="submitForm">
                    <base-module class="module">
                    <template #form-content>
                            <label for="email">Email</label>
                            <input 
                                type="text" 
                                id="email" 
                                v-model.trim="email.val" 
                                :class="{invalid: !email.isValid}"
                                @blur="clearValidity('email')"
                            />
                            <label for="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                v-model.trim="password.val" 
                                :class="{invalid: !password.isValid}"
                                @blur="clearValidity('password')"
                            
                            />
                            <span>Frogot password</span>
                            <p class="validation-text" v-if="!formIsValid">Email or Password is wrong or invalid</p>
                    </template>
                    <template #buttons>
                        <base-button class="module__btn" type="submit">Log In</base-button>
                        <router-link to="/signup" class="link">
                            <base-button class="module__btn" type="button">Create new account</base-button>
                        </router-link>
                    </template>
                    </base-module>
                </form>
                <img src="../assets/images/logoorange.png" alt="" class="logo">
                <img src="../assets/images/logos/logo_white.svg" alt="Groupomania logo" class="mobile-logo">
            </aside>

            <div class="sign-up" v-if="loginRender()">

                <form @submit.prevent="createUser">
                    <base-module class="module">
                        <template #title>Sign Up</template>
                        <template #form-content>
                            <section class="module__form">
                                <div class="module__form-text">
                                    <p class="validation-text" v-if="!formIsValid">One or more Invalid Inputs</p>
                                    <p class="validation-text" v-if="!equalPasswords">passwords do not Match</p>
                                    <label for="firstname">First Name</label>
                                    <input 
                                        type="text" 
                                        id="firstname"  
                                        v-model.trim="firstName.val"  
                                        :class="{invalid: !firstName.isValid}" 
                                        @blur="clearValidity('firstName')"
                                    />
                                    <label for="lastname">Last Name</label>
                                    <input 
                                        type="text" 
                                        id="lastname"  
                                        v-model.trim="lastName.val"  
                                        :class="{invalid: !lastName.isValid}" 
                                        @blur="clearValidity('lastName')"
                                    />
                                    <label for="email">Email</label>
                                    <input 
                                        type="email" 
                                        id="email"  
                                        v-model.trim="signUpEmail.val"  
                                        :class="{invalid: !signUpEmail.isValid}" 
                                        @blur="clearValidity('signUpEmail')"
                                    />
                                    <label for="password">Password</label>
                                    <input 
                                        type="password" 
                                        id="password"  
                                        v-model.trim="signUpPassword.val"  
                                        :class="{invalid: !signUpPassword.isValid}" 
                                        @blur="clearValidity('signUpPassword')"
                                    />
                                    <label for="confrimpassword">Confrim Password</label>
                                    <input 
                                        type="password" 
                                        id="Confrim Password"  
                                        v-model.trim="confrimPassword.val"  
                                        :class="{invalid: !confrimPassword.isValid}" 
                                        @blur="clearValidity('confrimPassword')"
                                    />
                                </div>
                                <div class="module__form-upload">
                                    <img src=
                                        "../assets/images/profile_img.svg" 
                                        alt="profile picture" 
                                        class="sign-up__upload-picture"
                                    />
                                <label for="file">upload picture</label>
                                <input type="file" id="file" name="file" @change="onFileSelected"/>
                                </div>
                            </section>
                            <base-button type="submit" class="sign-up__btn">Create Account</base-button>
                        </template>
                    </base-module>
                </form>
            </div>
        </div>    
    </section>
</template>

<script>
import {useRoute} from 'vue-router';
import router from '../router/index.js';
import TheHeader from '../components/layout/TheHeader.vue';

export default {
    components:{
        TheHeader
    },
    data(){
        return{
            email: {
                val: '',
                isValid: true
            },
            password: {
                val: '',
                isValid: true
            },
            signUpEmail:{
                val: '',
                isValid: true
            },
            signUpPassword:{
                val: '',
                isValid: true
            },
            firstName:{
                val: '',
                isValid: true
            },
            confrimPassword:{
                val: '',
                isValid: true
            },
            lastName:{
                val: '',
                isValid: true
            },
            selectedFile: null,
            formIsValid: true,
            equalPasswords: true,
            uploadImage:''
        }
    },
    methods:{
        loginRender(){
            if(useRoute().path === '/signup'){
                return true;
            }else{
                return false;
            }
        },

        clearValidity(input){
            this[input].isValid = true;
        },


        signInValidation(){
            this.formIsValid = true;
             if(this.email.val === ''){
                this.email.isValid = false;
                this.formIsValid = false;
            }
            if(this.password.val === ''){
                this.password.isValid = false;
                this.formIsValid = false;
            }
        },

        loginValidation(){
            this.formIsValid = true;
            if(this.signUpEmail.val === ''){
                this.signUpEmail.isValid = false;
                this.formIsValid = false;
            }
            if(this.signUpPassword.val === ''){
                this.signUpPassword.isValid = false;
                this.formIsValid = false;
            }
            if(this.firstName.val === ''){
                this.firstName.isValid = false;
                this.formIsValid = false;
            }
            if(this.lastName.val === ''){
                this.lastName.isValid = false;
                this.formIsValid = false
            }
            if(this.confrimPassword.val === ''){
                this.confrimPassword.isValid = false;
                this.formIsValid = false;
            }
        },

        passwordMatch(){
            if(this.confrimPassword.val === this.signUpPassword.val){
                console.log('equal');
            }else{
                this.equalPasswords = false;
            }
        },

        async submitForm(){
            const data = JSON.stringify({
                email: this.email.val,
                password: this.password.val
            });

            this.signInValidation();

            const response = await fetch('http://localhost:3000/api/user/login',{
                method: 'POST',
                body: data,
                headers:{
                    Authorization: 'Bearer' + ' ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json',
                }
            });

            const responseData = await response.json();

            console.log(responseData.message.token);
           
            if(!response.ok){
                const error = new Error(responseData.status.message || 'Failed to send request.');
                this.formIsValid = false;
                throw error;
            }


            if(responseData.message.status === 'fail'){
                return 'error'
            }

            localStorage.setItem('token', responseData.message.token);
            router.replace({path: '/timeline'});
        },

        onFileSelected(event){
            this.selectedFile = event.target.files[0]
        },

        async createUser(){
            this.passwordMatch();
            this.loginValidation();
            const fd = new FormData();
            fd.append('firstName', this.firstName.val);
            fd.append('lastName', this.lastName.val);
            fd.append('email', this.signUpEmail.val);
            fd.append('password', this.signUpPassword.val);
            fd.append('image', this.selectedFile,this.selectedFile.name);

            console.log(fd);
            console.log(this.signUpPassword);
            this.uploadImage = this.selectedFile;
             
            const response = await fetch('http://localhost:3000/api/user/signup',{
                method: 'POST',
                body: fd,
                headers:{
                    Authorization: 'Bearer' + ' ' + localStorage.getItem('token'),
                }
    
            });

            const responseData = await response.json();

            if(!response.ok){
                const error = new Error(responseData.status.message || 'Failed to send request.');
                this.formIsValid = false;
                throw error;
            }

            console.log(responseData);

            if(responseData.message.status === 'fail'){
                return 'error'
            }

            localStorage.setItem('token', responseData.token);
            router.replace({path: '/timeline'});

        }
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
    height: 93vh;
    width: 100%;
    display: flex;

    @include breakpoint-down(mobile){
        display: unset;
        width: 50%;
    }
  
}

.left-landing{
    width: 65%;
    height: 100%;
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
        height: 50%;
        align-items: center;
        position: absolute;
        top: 70px;
        margin: unset;
    }

    & .module{
        height: 500px;
        width: 400px;
        margin-top: 60px;

        @include breakpoint-down(mobile){
            width: 90vw;
            
        }

        & p{
            color: red;
            text-align: center;
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
        height: 690px;
        width: 650px;
        margin-top: 10px;
        background-color: white;
        border: 5px solid   rgba(253,45,1,0.3);

        @include breakpoint-down(mobile){
            height: max-content;
            width: 100vw;
            border-radius: unset;
            font-size: 30px;
            margin: unset;
        }

      

        &__form{
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: max-content;
            padding-bottom: 25px;

            @include breakpoint-down(mobile){
               flex-direction: column;
               padding: unset;
            }
        }

        &__form-text{
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            padding-bottom: 20px;
            padding-left: 20px;

            @include breakpoint-down(mobile){
                align-items: center;
                padding: unset;
            }

            & input{
                width: 90%;

                @include breakpoint-down(mobile){
                    width: 90%;
                }
            }        

            & .validation-text{
                padding: 0;
                color: red;
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
        height: 45px;
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

input[type="file"]{
    border: none;
    width: 200px;
    padding-left: 15px;
   
    @include breakpoint-down(mobile){
        padding-left: 80px;
    }
}

input[type="file"]:hover{
    cursor: pointer;
}

.logo{
    position: relative;
    align-self: center;
    width: 140px;

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

.link{
    display: flex;
    justify-content: center;
    width: 100%;
}

.invalid{
    box-shadow: 0px 0px 2px 4px red;
}
</style>