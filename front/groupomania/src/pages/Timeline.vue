<template>
    <section v-if="auth">
        <the-header :picture="profilePicture"></the-header>
        <div class="wrapper">
            <aside class="people">
                <div class="people-wrapper">
                    <h2>People</h2>
                        <div class="people__detail-wrapper" v-for="profile in profileArray" :profile="profile" :key="profile.index">
                            <router-link :to="'/profile/'+profile.id +'.' + profile.first_name+ '_' + profile.last_name">
                            <img :src="profile.profile_picture" alt="profile picture" class="people__profile-picture">
                            </router-link>
                            <div class="people__name">
                                <p>{{profile.first_name}}  {{profile.last_name}}</p>
                            </div>
                        </div>
                </div>
            </aside>

            <div class="post-wrapper">
                <h2>Top Post</h2>
                <div class="top-post">
                    <div class="top-post__wrapper" v-for="post in TopPostArray" :post="post" :key="post.index">
                        <router-link :to="'/post/'+post.post_id">
                            <img :src="post.media" alt="image of top post" class="top-post__picture">
                            <div class="top-post__text">
                                <h3>{{post.title_text}}</h3>
                            </div>
                        </router-link>
                    </div>
                </div>

                <div class="sorter">
                    <base-button class="sorter__btn" @click="mostLikes">
                        <span>Most likes</span>
                    </base-button>
                    <base-button class="sorter__btn" @click="mostCommented">
                        <span>Most commented</span>
                    </base-button>
                    <base-button class="sorter__btn" @click="mostRecent">
                        <span>Most recent</span>
                    </base-button>
                </div>

                <router-link to="/makeapost">
                    <base-button class="post-btn">
                        <span>Make A Post</span>
                    </base-button>
                </router-link>

                <div v-if="mostRecentPost">
                    
                    <post-element
                        class="post-wrapper__post"
                        v-for="post in postArray" 
                        :post="post" 
                        :key="post.index"
                        :link="post.id"
                        :timestamp="post.time_stamp.split('T')[0]"
                        :media="post.media"
                        :title="post.title_text"
                        :description="post.description_text"
                        :name="post.first_name"
                        :profilePicture="post.profile_picture"
                        :userId="post.user_id"
                        :pl="post.pl"
                        :pc="post.pc"
                        >
                        <router-link :to="'/post/'+post.id"></router-link>
                    </post-element>
                   
                </div>

                 <div v-if="mostLikedPosts">
                    <post-element
                        class="post-wrapper__post"
                        v-for="post in mostLikesArray" 
                        :post="post" 
                        :key="post.index"
                        :link="post.id"
                        :timestamp="post.time_stamp.split('T')[0]"
                        :media="post.media"
                        :title="post.title_text"
                        :description="post.description_text"
                        :name="post.first_name"
                        :profilePicture="post.profile_picture"
                        :pl="post.pl"
                        :pc="post.pc"
                    >
                    </post-element>
                </div>

                <div v-if="mostCommentedPost">
                    <post-element
                        class="post-wrapper__post"
                        v-for="post in mostCommentedArray" 
                        :post="post" 
                        :key="post.index"
                        :link="post.id"
                        :timestamp="post.time_stamp.split('T')[0]"
                        :media="post.media"
                        :title="post.title_text"
                        :description="post.description_text"
                        :name="post.first_name"
                        :profilePicture="post.profile_picture"
                        :pl="post.pl"
                        :pc="post.pc"
                    >
                    </post-element>
                </div>

            </div>

            <div class="tint" v-if="render('/makeapost')" @click="tintReRoute('/timeline')"></div>'
            <form @submit.prevent="makePost" v-if="render('/makeapost')">
                <base-module class="make-post">
                    <template #title>
                    Make A Post
                    </template>
                    <template #form-content>
                        <label for="title">Title</label>
                        <input type="text" id="title" v-model.trim="title.val">
                        <label for="description">Description</label>
                        <textarea 
                            name="description" 
                            id="description" 
                            cols="70" rows="10" 
                            v-model.trim="description.val"
                        >
                        </textarea>
                    </template>
                    <template #buttons>
                        <div class="make-post__btn-wrapper">
                            <img src="../assets/images/image_icon.svg" alt="image icon" class="make-post__icon">
                            <div class="make-post__btns-wrapper">
                                <label for="file">upload Picture</label>
                                <input type="file" if="file" name="file" class="make-post__btn" @change="onFileSelected"/>
                                <base-button type="submit" class="make-post__btn">Post</base-button>
                            </div>
                        </div>
                    </template>
                </base-module>
            </form>
        </div>
    </section>
</template>

<script>
import router from '../router/index.js';
import TheHeader from '../components/layout/TheHeader.vue';
import tintReRoute from '../mixins/tintReRoute';
import getUserInfo from '../mixins/getUserInfo';
import http from '../mixins/http';
import render from '../mixins/render';
export default {
    components:{
        TheHeader
    },
    data(){
        return{
            id: null,
            auth: false,
            user: null,
            profilePicture: null,
            profileArray:[],
            postArray:[],
            reactArray:[],
            TopPostArray:[],
            offset: 0,
            sortByLikes: false,
            mostRecentPost: true,
            mostLikedPosts: null,
            mostCommentedPost: null,
            mostLikesArray: [],
            mostCommentedArray:[],
            selectedFile: null,
            title:{
                val: '',
                isValid: true
            },
            description:{
                val: '',
                isValid: true
            }
        }
    },
    mixins:[tintReRoute, getUserInfo,http,render],
    created(){
        this.getUserInfo();
        this.checkPath();
        this.getTopPost();
        this.getPage();
        this.getProfiles();
        this.getPost();
    },
    mounted(){
       
    },
    methods:{
    
        checkPath(){
            if(this.$route.path.split('/')[1] === 'mostlikes'){
                this.mostLikedPosts = true;
                this.mostRecentPost = false;
                this.mostCommentedPost = false;
                this.mostLikes();
            }else if(this.$route.path.split('/')[1] === 'mostcommented'){
                this.mostLikedPosts = false;
                this.mostRecentPost = false;
                this.mostCommentedPost = true;
                this.mostCommented();
            }
        },

        getPage(){
            const route = this.$route.path.split('.');
            const splitRoute = route[0].split('/');
        
            if(splitRoute[2] == 2){
                this.offset = 30;
            }else if(splitRoute[2] == 3){
                this.offset = 45;
            }else if(splitRoute[2] == 4){
                this.offset = 60;
            }else if(splitRoute[2] == 5){
                this.offset = 75;
            }else if(splitRoute[2] == 6){
                this.offset = 90;
            }else if(splitRoute[2] == 7){
                this.offset = 105;
            }else if(splitRoute[2] == 8){
                this.offset = 120;
            }else if(splitRoute[2] == 9){
                this.offset = 135;
            }else if(splitRoute[2] == 10){
                this.offset = 150;
            }else if(splitRoute[2] == 11){
                this.offset = 165;
            }else if(splitRoute[2] == 12){
                this.offset = 180;
            }
        },

        async getProfiles(){
        const data = await this.fetchGet('http://localhost:3000/api/user/profiles');
        this.extractPromise(data,this.profileArray);
        },

        async getTopPost(){
            const data = await this.fetchGet('http://localhost:3000/api/post/mostinteractions');
            this.extractPromise(data, this.TopPostArray);
        },

        async getPost(){
            const body = { offset : this.offset}
            const data = await this.fetchWithBody('http://localhost:3000/api/post/allpost', body, 'POST');
            this.extractPromise(data, this.postArray);

        },

        async mostLikes(){
            const data = await this.fetchGet('http://localhost:3000/api/post/mostlikes');
            this.extractPromise(data, this.mostLikesArray);

            router.replace({path:'/mostlikes'});
            this.mostLikedPosts = true;
            this.mostRecentPost = false;
            this.mostCommentedPost = false;
        },

        async mostCommented(){
            const data = await this.fetchGet('http://localhost:3000/api/post/mostcommented');
            this.extractPromise(data, this.mostCommentedArray);
            
            router.replace({path:'/mostcommented'});
            this.mostLikedPosts = false;
            this.mostRecentPost = false;
            this.mostCommentedPost = true;
        },

        mostRecent(){
            router.replace({path:'/timeline'});
            this.mostLikedPosts = false;
            this.mostRecentPost = true;
            this.mostCommentedPost = false;
        },

        onFileSelected(event){
            this.selectedFile = event.target.files[0];
        },

        async makePost(){
            const fd = new FormData();
            fd.append('image', this.selectedFile, this.selectedFile.name);
            fd.append('titleText', this.title.val);
            fd.append('descriptionText',this.description.val);
            fd.append('userId', this.id);

            this.fetchWithFd('http://localhost:3000/api/post/create', fd, 'POST');

            document.body.style.overflow = 'visible';
            router.replace({path: '/timeline'});
        },

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

    &__post{
        margin-bottom: 50px;
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
        width: 200px;

        @include breakpoint-down(mobile){
            width: 100px;
            margin: 2px;
            
        }
    }

    & img {
        width: 150px;
        height: 200px;
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
        width: 75%;
        height: 20%;
        overflow: hidden;
        font-size: rem(12);

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
