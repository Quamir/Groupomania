<template>
    <section>
        <the-header :picture="profilePicture"></the-header>
        <div class="user-info">
            <div class="user-info__profile-picture">
                <h3 class="title">{{firstName}} {{lastName}}</h3>
                <img :src="profilePicture" class="profile-picture" alt="">
                <router-link to="/updateprofilepicture">
                    <base-button class="base-btn">Change Picture</base-button>
                </router-link>
            </div>
            <div class="user-info__text">
                <div class="user-info__row">
                    <p>Name</p>
                    <p>{{firstName}} {{lastName}}</p>
                    <router-link to="/changename">
                        <base-button class="change-btn">change</base-button>
                    </router-link>
                </div>
                <div class="user-info__row">
                    <p>Email</p>
                    <p>{{email}}</p>
                    <router-link to="/changeemail">
                        <base-button class="change-btn">change</base-button>
                    </router-link>
                </div>
                <div class="user-info__row">
                    <p>password</p>
                    <p>*******</p>
                    <router-link to="/changepassword">
                        <base-button class="change-btn">change</base-button>
                    </router-link>
                </div>
                <div class="delete-account">
                    <p>DELETE ACCOUNT</p>
                </div>
            </div>
        </div>

        <footer>
            <img src="../assets/images/footer/group_1.jpg" class="footer__img" alt="group of professionals">
            <img src="../assets/images/footer/group_2.jpg" class="footer__img" alt="group of professionals">
            <img src="../assets/images/footer/group_3.jpg" class="footer__img" alt="group of professionals">
        </footer>

        <div class="tint" v-if="renderFilter()" @click="tintReRoute"></div>

        <base-module v-if="checkPath('/deleteaccount')">
            <template #form-content>
                <p>Are you sure you want to</p>
                <p>permanently delete your account?</p>
                <label for="password">Password</label>
                <input type="password" id="password"/>
                <label for="confrimpassword">Confrim Password</label>
                <input type="password" id="Confrim Password">
            </template>
            <template #buttons>
                <base-button class="module__btn">Delete Account</base-button>
            </template>
        </base-module>
        <form @submit.prevent="changePassword"  v-if="checkPath('/changepassword')">
            <base-module>
                <template #form-content>
                    <p>Change Password</p>
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model.trim="changePasswordPasswrod.val"/>
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model.trim="changePasswordEmail.val"/>
                    <label for="new password">New Password</label>
                    <input type="password" id="new password" v-model.trim="changePasswordNewPassword.val"/>
                    <label for="confrimpassword">Confrim Password</label>
                    <input type="password" id="Confrim Password"/>
                </template>
                <template #buttons>
                    <base-button class="module__btn">Update Password</base-button>
                </template>
            </base-module>
        </form>
        <form @submit.prevent="changeEmail" v-if="checkPath('/changeemail')">
            <base-module>
                <template #form-content>
                    <p>Change Email</p>
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model.trim="changeEmailPassword.val"/>
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model.trim="changeEmailEmail.val"/>
                    <label for="new email">New Email</label>
                    <input type="email" id="new email" v-model.trim="changeEmailNewEmail.val"/>
                </template>
                <template #buttons>
                    <base-button class="module__btn" type="submit">Update Email</base-button>
                </template>
            </base-module>
        </form>
        <form @submit.prevent="changeName" v-if="checkPath('/changename')">
            <base-module>
                <template #form-content>
                    <p>Change Name</p>
                    <label for="firstname">First Name</label>
                    <input type="text" id="firstname" v-model.trim ="changeNameName.val"/>
                    <label for="lastname">Last Name</label>
                    <input type="text" id="lastname" v-model.trim="changeNameLast.val">
                </template>
                <template #buttons>
                <base-button class="module__btn" type="submit">Update Name</base-button>
                </template>
            </base-module>
        </form>
        <form @submit.prevent="changeProfilePicture">
            <base-module v-if="checkPath('/updateprofilepicture')">
                <template #form-content>
                    <p>Update Picture</p>
                    <img src="../assets/images/profile_img.svg" alt="profile picture" class="profile-picture">
                    <input type="file" id="file" name="file"  @change="onFileSelected"/>
                </template>
                <template #buttons>
                    <base-button type="submit" class="module__btn">Update Picture</base-button>
                </template>
            </base-module>  
        </form> 
    </section>
</template>

<script>
import {useRoute} from 'vue-router';
import router from '../router/index.js';
import TheHeader from '../components/layout/TheHeader.vue';
export default {
    data(){
        changename: false;
        return{
            id: null,
            profilePicture: null,
            firstName: null,
            lastName: null,
            email: null,
            changeNameName:{
                val: '',
                isValid: true
            },
            changeNameLast:{
                val: '',
                isValid: true
            },
            changeEmailPassword:{
                val: '',
                isValid: true
            },
            changeEmailEmail:{
                val: '',
                isValid: true
            },
            changeEmailNewEmail:{
                val: '',
                isValid: true
            },
            changePasswordPasswrod:{
                val: '',
                isValid: true
            },
            changePasswordEmail:{
                val: '',
                isValid: true
            },
            changePasswordNewPassword:{
                val: '',
                isValid: true 
            }, 
            selectedFile: null
        }
    },
    components:{
        TheHeader
    },
    created(){
        this.getUserData();
    },
    methods:{
        renderFilter(){
            if(
                useRoute().path === '/deleteaccount' ||
                useRoute().path === '/changepassword' ||
                useRoute().path === '/changeemail' ||
                useRoute().path === '/changename' ||
                useRoute().path === '/updateprofilepicture'
              
            ){
                document.body.style.overflow = 'hidden';
                return true;
            }else{
                return false;
            }
        },

        checkPath(path){
            if(useRoute().path === path){
                return true;
            }else{
                return false
            }
        },

        async getUserData(){
            const response = await fetch('http://localhost:3000/api/user/user',{
                headers:{
                    Authorization: 'Bearer' + ' ' + localStorage.getItem('token'),
                }
            });
            const responseData = await response.json();
            console.log(responseData.message);
            this.id = responseData.message.id;
            this.profilePicture = responseData.message.profile_picture;
            this.firstName = responseData.message.first_name;
            this.lastName = responseData.message.last_name;
            this.email = responseData.message.email;
        },

        async changeName(){
            const data = JSON.stringify({
                id: this.id,
                firstName: this.changeNameName.val,
                lastName: this.changeNameLast.val
            });
            const response = await fetch('http://localhost:3000/api/user/changename',{
                method: 'PATCH',
                body: data,
                headers:{
                    Authorization: 'Bearer' + ' ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await response.json();
            console.log(responseData);
            router.replace({path:'/settings'});
            this.getUserData();
        },

        async changeEmail(){
            const data = JSON.stringify({
                email: this.changeEmailEmail.val,
                password: this.changeEmailPassword.val,
                newEmail: this.changeEmailNewEmail.val
            });

            const response = await fetch('http://localhost:3000/api/user/changeemail',{
                method: 'PATCH',
                body: data,
                headers:{
                    Authorization: 'Bearer' + ' ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });
    
            const responseData = await response.json();
            console.log(responseData);
            router.replace({path:'/settings'});
            this.getUserData();
        },

        async changePassword(){
            const data =  JSON.stringify({
                email: this.changePasswordEmail.val,
                newPassword: this.changePasswordPasswrod.val,
               newPassword: this.changePasswordNewPassword.val, 
            });

            const response = await fetch('http://localhost:3000/api/user/changepassword',{
                method: 'PATCH',
                body: data, 
                headers:{
                    Authorization: 'Bearer' + ' ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                }
            });

            const responseData = await response.json();
            console.log(responseData);
            router.replace({path:'/settings'});
            this.getUserData();
        },


        async changeProfilePicture(){
            const fd = new FormData();
            fd.append('id', this.id);
            fd.append('image', this.selectedFile,this.selectedFile.name);

            const response = await fetch('http://localhost:3000/api/user/changeprofilepicture', {
                method: 'PATCH',
                body: fd,
                headers:{
                    Authorization: 'Bearer' + ' ' + localStorage.getItem('token'),
                }
            });

            const responseData = await response.json();
            console.log(responseData);
            router.replace({path:'/settings'});
            this.getUserData();
        },

         onFileSelected(event){
            this.selectedFile = event.target.files[0]
        },

        tintReRoute(){
            router.replace({path:'/settings'});
            this.getUserData();
        }
    },
}
</script>

<style lang="scss" scoped>
.user-info{
    display: flex;
    width: 100%;
    height: 55.8vh;
    padding-left: 4%;

    @include breakpoint-down(mobile){
        flex-direction: column;
        height: 90vh;
        padding: unset;
    }

    &__profile-picture{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;

        @include breakpoint-down(mobile){
            align-items: center;
            margin-bottom: 30px;
        }

        &  .title{
            font-size: rem(30);
            margin: auto;

            @include breakpoint-down(mobile){
                margin-bottom: 15px;
            }
        }

        & .profile-picture{
            width: 200px;
            height: 200px;
            border-radius: 50%;
            margin-bottom: 15%;

            @include breakpoint-down(mobile){
                margin-bottom: 20px;
            }
        }

        & .base-btn{
            width: 100%;
            height: 40px;
            font-size: rem(18);
            margin: auto;
        }

        & a{
            width: 100%;
        }
    }

    &__text{
        padding-left: 30%;
        padding-top: 70px;
        width: 70%;

        @include breakpoint-down(mobile){
            align-items: center;
            padding: unset;
            width: 100%;
        }

        & p{
            padding-bottom: 10px;
            padding-top: 10px;
            font-size: rem(20);
            font-weight: bolder;
            color: $secondary-color;
        }

        & .delete-account{
            display: flex;
            justify-content: center;

            & p{
                font-size: rem(12);
                color: red;

                @include breakpoint-down(mobile){
                    font-size: rem(16);
                }
            }

           
        }

        & .change-btn{
            padding-bottom: 5px;
            width: 100px;
            height: 40px;
            font-size: rem(16);

            @include breakpoint-down(mobile){
                align-self: center;
                width: 50%;
            }
        }
    }

    &__row{
        display: flex;
        justify-content: space-between;
        margin-bottom: 5%;

        @include breakpoint-down(mobile){
            flex-direction: column;
            width: 90%;
            margin: auto;
            & p {
                font-size: rem(22);
                margin: auto;
            }
        }
    }
    
}

footer{
    width: 100%;
    height: 37.2vh;
    display: flex;
    align-items: flex-end;

    @include breakpoint-down(mobile){
        height: 20vh;
    }
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

.module{
    height: 600px;
    width: 650px;
    margin-top: 10px;
    background-color: white;
    box-shadow: 0px 0px 25px 25px rgba(253,45,1,0.1);   
    border: 5px solid   rgba(253,45,1,0.3);
    position: absolute;
    top: 10%;
    left: 30vw;

    @include breakpoint-down(mobile){
        position: absolute;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        left: 0;
        top: -10px;
        border-radius: unset;
        font-size: 30px;
    }

    & p{
        margin: auto;
        font-size: rem(25); 
        
        @include breakpoint-down(mobile){
            text-align: center;
            &:nth-child(2){
                margin-bottom: 60px;
            }
        }
    }

    & label{
        margin: auto;
    }

    & input{
        width: 60%;
    }

    &__btn{
        height: 40px;
        margin-top: 30px;
        font-size: rem(20);
    }
} 

.profile-picture{
    width: 200px;
}


</style>

