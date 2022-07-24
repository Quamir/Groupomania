<template>
  <section >
      <div class="post-img__wrapper"  @click="exitOnClick()">
        <img 
            src="../assets/images/x_icon.svg" 
            alt="exit button" 
            class="post-img__exit-btn" 
            @click="$router.go(-1)"
            >
        <img :src="media" alt="post image" class="post-img__img">
    </div>
    <div class="comments" >
        <div class="comments__poster-info"  @click="exitOnClick()">
            <div class="comments-info__text">
                <img :src="profilePicture" alt="profile picture" class="comments__profile-picture">
                <p>{{firstNmae}} {{lastName}}</p>
                <p>{{timestamp}}</p>
            </div>
            <div>
                <p class="comments-info__des">{{descriptionText}}</p>
            </div>
        </div>
        <div class="comments__likes">
            <p>likes</p>
            <img src="../assets/images/reactions/like.svg" alt="like button"  class="like-desktop">
             <img src="../assets/images/reactions/like.svg" alt="like button" @click="toggleModel()" class="like-mobile">
            <p>10</p>
            <img src="../assets/images/reactions/comment.png" alt="comment button">
            <p>5</p>
            <p>comment</p>
        </div>
        <div class="comments__reactions">
            <img src="../assets/images/reactions/heart_eyes.svg" alt="heart eye emoji" class="comments__emoji">
            <p>0</p>
            <img src="../assets/images/reactions/laugh.svg" alt="laughing emoji" class="comments__emoji">
            <p>7</p>
            <img src="../assets/images/reactions/angry.svg" alt="angry emoji" class="comments__emoji">
            <p>0</p>
            <img src="../assets/images/reactions/smile.svg" alt="smiling emoji" class="comments__emoji">
            <p>2</p>
            <img src="../assets/images/reactions/smile.svg" alt="smiling emoji" class="comments__emoji">
            <p>0</p>
            <img src="../assets/images/reactions/cry.svg" alt="crying emoji" class="comments__emoji">
            <p>0</p>
            <img src="../assets/images/reactions/like.svg" alt="like button" class="comments__emoji">
            <p>1</p>
        </div>
        <div class="commenter" @click="exitOnClick()">
            <div class="commenter__wrapper" v-for="comment in commentsArray" :comment="comment" :key="comment.index">
                <div class="commenter__info">
                    <p class="commenter__name">{{comment.first_name}} {{comment.last_name}}</p>
                    <img :src="comment.profile_picture"  alt="commenter's picture" class="commenter__img">
                </div>
                <div class="commenter__text-wrapper">
                    <div class="commenter__text">
                        <p>{{commentTimestamp}}</p>
                        <p>{{comment.comment_text}}</p>
                    </div>
                    <div class="commenter__response">
                        <p>like</p>
                        <p>Reply</p>
                    </div>
                </div>
            </div>  
        </div>
        
        <emoji-pop-up v-if="modelVisable" class="emoji-pop"></emoji-pop-up>
    </div>
  </section>
</template>

<script>
export default {
   data(){
    return{
        postId: this.$route.path.split('/')[2],
        descriptionText: null,
        firstNmae: null,
        lastName: null,
        media: null,
        profilePicture: null,
        timestamp: null,
        titleText: null,
        modelVisable: false,
        commentsArray:[],
        commentTimestamp: null
    }
  },
  created(){
    this.getPost();
    this.getComments();
  },
  methods:{
    toggleModel(){
        this.modelVisable = !this.modelVisable;
        console.log(this.modelVisable);
    },

    async getPost(){
        const data = {id: this.postId}
        const response = await fetch('http://localhost:3000/api/post/singlepost',{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json',
                Authorization: 'Bearer' + ' ' + localStorage.getItem('token')
            }
        });

        const responseData = await response.json();
        const array = responseData.message;

        console.log(array[0].last_name);

        this.media = array[0].media;
        this.descriptionText = array[0].description_text;
        this.firstNmae = array[0].first_name;
        this.lastName = array[0].last_name;
        this.profilePicture = array[0].profile_picture;
        this.timestamp = array[0].time_stamp.split('T')[0];
        this.titleText = array[0].title_text;
    },

    async getComments(){
        const data = {id: this.postId}
        const response = await fetch('http://localhost:3000/api/comment/allcomments',{
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json',
                Authorization: 'Bearer' + ' ' + localStorage.getItem('token')
            }
        });

        const responseData = await response.json();
        const array = responseData.message;
        
        array.forEach(comment =>{
            this.commentsArray.push(comment);
        });

        this.commentTimestamp = this.commentsArray[0].time_stamp.split('T')[0];
    },

    exitOnClick(){
        if(this.modelVisable = true){
            this.modelVisable = !this.modelVisable;
        }
    }
  }
}
</script>

<style lang="scss" scoped>

section{
    display: flex;
    
    @include breakpoint-down(mobile){
        flex-direction: column;
    }
}

.post-img{
    &__wrapper{
        width: 50vw;
        height: 100vh;
        overflow: hidden;

        @include breakpoint-down(mobile){
            width: 100vw;
            height: 40vh;
        }
    }

    &__exit-btn{
        position: absolute;
        padding-top: 20px;
        padding-left: 10px;
        opacity: 60%;
        width: 50px;

        &:hover{
            cursor: pointer;
        }
    }

    &__img{
        width: 100%;
        height: 100%;
        object-fit: fill;

        @include breakpoint-down(mobile){
            width: 100%;
            object-fit: fill;
        }
    }
}

.comments{
    width: 50vw;
    height: 93vh;
    display: flex;
    flex-direction: column;

    @include breakpoint-down(mobile){
        width: 100%;
        height: max-content;
    }

    &__poster-info{
        display: flex;
        align-items: center;
        margin-top: 20px;
        margin-left: 40px;
        margin-bottom: 20px;
    
    }

    &__profile-picture{
        align-self: flex-start;
        width: 100px;
        height: 100px;
        border-radius: 50px;
        margin-right: 20px;
        margin-bottom: 15px;
    }

    &-info__text{
        align-self: flex-start;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        & p{
            padding-bottom: 15px;
            font-size: rem(15);
            font-weight: 500;
        }
    }

    &-info__des{
        margin-left: 50px;
    }
    &__likes{
        display: flex;
        align-items: center;
        padding-left: 50px;
        border-top: 2px solid $secondary-color;
        border-bottom: 2px solid $secondary-color;

        & img{
            width: 40px;
            height: 40px;
            margin-right: 7px;

            &:hover{
                cursor: pointer;
            }
        }

        & p{
            font-size: rem(20);
            font-weight: 500;
            padding-right: 15px;
        }

        & .like-desktop{
            @include breakpoint-down(mobile){
                display: none;
            }
        }

        & .like-mobile{
            display: none;

            @include breakpoint-down(mobile){
                display: unset;
            }
        }
    }

    &__reactions{
        display: flex;
        align-items: center;
        padding-top: 10px;
        padding-left: 50px;
        border-bottom: 2px solid $secondary-color;

        & p{
            padding-right: 10px;
            font-size: rem(20);
            font-weight: 500;
        }

        
        @include breakpoint-down(mobile){
            display: none;
        }
    }

    &__emoji{
        width: 40px;
        height: 40px;
        margin-right: 10px;

        &:hover{
            cursor: pointer;
        }
    }
}

.commenter{
    height: 100%;
    overflow-y: scroll;
    padding-left: 15px;
    padding-top: 30px;
    padding-bottom: 16px;

    &__wrapper{
        display: flex;
        width: 95%;
        border-radius: 15px;
        padding-left: 10px;
        margin-bottom: 20px;
        background: rgba(107,104,104,0.3);
    }

    &__info{
        padding-right: 20px;
        padding-bottom: 15px;
    }

    &__name{
        text-indent: 10px;
        font-weight: 600;
        padding-top: 10px;
        padding-bottom: 7px;
    }

    &__img{
        width: 100px;
        height: 100px;
        border-radius: 50px;
    }

    &__text-wrapper{
        display: flex;
        flex-direction: column;
    }

    &__text{
        padding-bottom: 15px;

        & p:nth-child(1){
            padding-bottom: 5px;
        }
    }

    &__response{
        display: flex;
        padding-bottom: 10px;
        
        & p{
            padding-right: 15px;
            font-weight: 600;
        }
    }
}

.emoji-pop{
        display: none;
        
        @include breakpoint-down(mobile){
            position: absolute;
            top: 250px;
            background-color: #6B6868 !important;
        }
    }

</style>