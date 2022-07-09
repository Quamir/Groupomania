<template>
    <section v-if="auth">
        <the-header :picture="profilePicture"></the-header>
        <div class="wrapper">
            <aside class="people">
                <div class="people-wrapper">
                    <h2>People</h2>
                    <div class="people__detail-wrapper" v-for="profile in profileArray" :profile="profile" :key="profile.index">
                        <img :src="profile.profile_picture" alt="profile picture" class="people__profile-picture">
                        <div class="people__name">
                            <p>{{profile.first_name}}  {{profile.last_name}}</p>
                        </div>
                    </div>
                    <!-- <div class="people__detail-wrapper">
                        <img src="../assets/images/people/Steve_Roman.jpg" alt="profile picture" class="people__profile-picture">
                        <div class="people__name">
                            <p>Steve Roman</p>
                        </div>
                    </div>
                    <div class="people__detail-wrapper">
                        <img src="../assets/images/people/Toni_Isbel.jpg" alt="profile picture" class="people__profile-picture">
                        <div class="people__name">
                            <p>Toni Isbel</p>
                        </div>
                    </div>
                    <div class="people__detail-wrapper">
                        <img src="../assets/images/people/Jez_Jerald.jpg" alt="profile picture" class="people__profile-picture">
                        <div class="people__name">
                            <p>Jez Jerald</p>
                        </div>
                    </div>
                    <div class="people__detail-wrapper">
                        <img src="../assets/images/people/Seth_Silas.jpg" alt="profile picture" class="people__profile-picture">
                        <div class="people__name">
                            <p>Seth Silas</p>
                        </div>
                    </div>
                    <div class="people__detail-wrapper">
                        <img src="../assets/images/people/Rex_Benton.jpg" alt="profile picture" class="people__profile-picture">
                        <div class="people__name">
                            <p>Rex Benton</p>
                        </div>
                    </div>
                    <div class="people__detail-wrapper">
                        <img src="../assets/images/people/Shaun_Aydan.jpg" alt="profile picture" class="people__profile-picture">
                        <div class="people__name">
                            <p>Shaun Aydan</p>
                        </div>
                    </div> -->
                </div>
            </aside>

            <div class="post-wrapper">
                <h2>Top Post</h2>
                <div class="top-post">
                    <div class="top-post__wrapper">
                        <img src="../assets/images/dev-data-imgs/img1.jpg" alt="image of top post" class="top-post__picture">
                        <div class="top-post__text">
                            <h3>Title</h3>
                        </div>
                    </div>
                    <div class="top-post__wrapper">
                        <div class="top-post__picture">
                            <img src="../assets/images/dev-data-imgs/img2.jpg" alt="image of top post">
                        </div>
                        <div class="top-post__text">
                            <h3>Title</h3>
                        </div>
                    </div>
                    <div class="top-post__wrapper">
                        <div class="top=post__picture">
                            <img src="../assets/images/dev-data-imgs/img3.jpg" alt="image of top post">
                        </div>
                        <div class="top-post__text">
                            <h3>Title</h3>
                        </div>
                    </div>
                </div>

                <div class="sorter">
                    <base-button class="sorter__btn">
                        <span>Most likes</span>
                    </base-button>
                    <base-button class="sorter__btn">
                        <span>Most commented</span>
                    </base-button>
                    <base-button class="sorter__btn">
                        <span>Most recent</span>
                    </base-button>
                </div>

                <base-button class="post-btn">
                    <span>Make A Post</span>
                </base-button>

                <post-element></post-element>

            </div>

            <div class="tint" v-if="render()"></div>
            <base-module class="make-post" v-if="render()">
                <template #title>
                Make A Post
                </template>
                <template #form-content>
                    <label for="title">Title</label>
                    <input type="text" id="title">
                    <label for="description">Description</label>
                    <textarea name="description" id="description" cols="70" rows="10"></textarea>
                </template>
                <template #buttons>
                    <div class="make-post__btn-wrapper">
                        <img src="../assets/images/image_icon.svg" alt="image icon" class="make-post__icon">
                        <div class="make-post__btns-wrapper">
                            <base-button class="make-post__btn">Upload Picture</base-button>
                            <base-button class="make-post__btn">Post</base-button>
                        </div>
                    </div>
                </template>
            </base-module>
        </div>
    </section>
</template>

<script>
import { useRoute } from 'vue-router';
import router from '../router/index.js';
import TheHeader from '../components/layout/TheHeader.vue';
export default {
    components:{
        TheHeader
    },
    data(){
        return{
            auth: false,
            user: null,
            profilePicture: null,
            profileArray:[]

        }
    },
    
    async created(){
      console.log(localStorage.getItem('token'));
      const response = await fetch('http://localhost:3000/api/user/user',{
        headers:{
            Authorization: 'Bearer' + ' ' + localStorage.getItem('token')
        }
      });

      const responseData = await response.json();
      console.log(responseData.message);

      this.profilePicture = responseData.message.profile_picture;
      console.log(this.profilePicture);

      if(responseData.status === 'fail' || responseData.status === 'error'){
        router.replace({path: '/login'});
      }else{
        this.auth = true;
      }

     this.getProfiles();

    },
    methods:{
        render(){
            if(useRoute().path === '/makeapost'){
                document.body.style.overflow = 'hidden';
                return true;
            }else{
                return false;
            }
        },

        async getProfiles(){
            const response = await fetch('http://localhost:3000/api/user/profiles',{
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer' + ' ' + localStorage.getItem('token')
                }
            });

            const responseData = await response.json();
            const array = responseData.message;

            array.forEach(person =>{
                this.profileArray.push(person);
            })

            console.log(this.profileArray);


        }
    },

}
</script>


<style lang="scss" scoped>

html{
    height: max-content;
}

.wrapper{
    display: flex;
}

.post-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;

    & h2{
        padding-bottom: 20px;
        padding-top: 20px;
    }

}

.top-post{
    display: flex;
    height: max-content;
    margin-bottom: 30px;

    @include breakpoint-down(mobile){
        width: 100vw;
        justify-content: center;
    }

    &__wrapper{
        margin-right: 50px;

        @include breakpoint-down(mobile){
            width: 100px;
            margin: 2px;
            
        }
    }

    & img {
        width: 150px;
        height: 150px;
        object-fit: fill;
        margin-bottom: -4px;

        @include breakpoint-down(mobile){
            width: 100px;
            border-radius: 10px;
            margin-bottom: 5px;
        }
    }

    &__text{
        display: flex;
        justify-content: center;
        border: 1.2px solid grey;
    }
}

.sorter{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 50%;
    height: 50px;
    margin-bottom: 50px;
    border: 3px solid $secondary-color;

    @include breakpoint-down(mobile){
        flex-direction: column;
        width: 90vw;
        height: max-content;
    }

    &__btn{
        height: 60%;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 10px;

        @include breakpoint-down(mobile){
            margin-bottom: 15px;
            width: 60%;

            & span{
                font-size: rem(18);
            }

            &:first-child{
                margin-top: 20px;
            }
        }
    }
}

.post-btn{
    width: 300px;
    height: 45px;
    margin-bottom: 50px;
    font-size: rem(20);
}

.people{
    width: 200px;
    height: max-content;
    margin-top: 70px;
    padding-left: 50px;
    display: inline-block;

    @include breakpoint-down(mobile){
        display: none;
    }

    & h2{
        text-align: center;
        padding-bottom: 20px;
    }

    &__detail-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
        width: 170px;

        &:hover{
            cursor: pointer;
        }
    }

    &__profile-picture{
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
        border-radius: 50%;
        border: 3px solid $primary-color;
    }

    &__name{
        display: flex;
        justify-content: center;
        width: 100%;
        border: 3px solid $secondary-color;
        border-radius: 25px;
        
        & p{
            font-size: rem(18);
            font-weight: 600;
        }
    }
}

.tint{
    width: 100%;
    height: 100vh;
    left: 0px;
    top: 0px;
    position: absolute;
    background: rgba(107,104,104,0.7);
    overflow: hidden;
}

.make-post{
    width: 600px;
    height: 600px;
    position: absolute;
    top: 60px;
    left: 550px;
    z-index: 1;
    background-color: white;

    @include breakpoint-down(mobile){
        position: absolute;
        flex-direction: column;
        width: 100vw;
        height: 100vh;
        left: 0px;
        top: 0px;
        margin: unset;
        border-radius: 0px;
    }

    & textarea{
        resize: none;
        outline: none;
        border: 2.5px solid $secondary-color;

        @include breakpoint-down(mobile){
            width: 90vw;
        }
    }

    &__btn-wrapper{
        display: flex;
        align-items: center;

        @include breakpoint-down(mobile){
            flex-direction: column;
        }
    }

    &__icon{
        width: 150px;
        height: 150px;
        margin-right: 100px;

        @include breakpoint-down(mobile){
            width: 200px;
            margin-left: 90px;
            margin-bottom: 40px;
        }
    }

    &__btns-wrapper{
        display: flex;
        flex-direction: column;
    }

    &__btn{
        width: 200px;
        height: 45px;
        margin-bottom: 20px;

        @include breakpoint-down(mobile){
            width:  70vw;
            height: 60px;
            font-size: rem(20)
        }
    }
}
</style>
