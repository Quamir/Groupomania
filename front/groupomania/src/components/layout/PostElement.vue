<template>
    <div class="post__folder-wrapper">
        <div class="post__info-wrapper">
            <div class="post__user-info">
                <img src="../../assets/images/people/Lora_Gertie.jpg" alt="profile picture" class="post__profile-picture">
                <div class="post__info-text">
                    <p>posted by</p>
                    <span>Lora Gertie</span>
                </div>
                 <p class="post__timestamp">June 2 at 11:30 AM</p>
            </div>
            <div class="post__title">
                <p></p>
            </div>
            <div class="post__img-wrapper">
                <img src="http://localhost:3000/images/post_pictures/BEIMG22.jpg" alt="img relating to post" class="post__img">
                <div class="post__text">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Sit amet consectetur adipiscing elit pellentesque. Nisi lacus sed viverra tellus. Ornare suspendisse sed nisi lacus sed. Egestas 
                        egestas fringilla phasellus faucibus. Pellentesque eu tincidunt tortor aliquam nulla facilisi. Ornare massa eget egestas purus viverra 
                        accumsan in nisl nisi. Quis eleifend
                    </p>
                </div>
            </div>
            <div class="reaction-panel">
                <div class="reaction-panel__comment">
                    <img src="../../assets/images/reactions/comment.png" alt="comment button" class="reaction-panel__like-btn">
                    <span>5</span>
                </div>
                <div class="reaction-panel__reactions">
                    <div class="reaction-panel__emojis">
                        <img src="../../assets/images/reactions/heart_eyes.svg" alt="heart eye emoji" class="reaction-panel__emoji">
                        <img src="../../assets/images/reactions/laugh.svg" alt="laughing emoji" class="reaction-panel__emoji">
                        <img src="../../assets/images/reactions/angry.svg" alt="angry emoji" class="reaction-panel__emoji">
                        <img src="../../assets/images/reactions/smile.svg" alt="smiling emoji" class="reaction-panel__emoji">
                        <img src="../../assets/images/reactions/smile.svg" alt="smiling emoji" class="reaction-panel__emoji">
                        <img src="../../assets/images/reactions/cry.svg" alt="crying emoji" class="reaction-panel__emoji">
                        <img src="../../assets/images/reactions/like.svg" alt="like button" class="reaction-panel__emoji" @click="toggleModel()">
                        <span>6</span>
                    </div>
                </div>
            </div>
        </div>
        <emoji-pop-up v-if="modelVisable"></emoji-pop-up>
    </div>
</template>

<script>

export default {
  data(){
    return{
        modelVisable: false
    }
  },
  methods:{
    toggleModel(){
        this.modelVisable = !this.modelVisable;
    }
  },
}
</script>
<style lang="scss" scoped>
.post{

    &__folder-wrapper{
        width: 600px;

        @include breakpoint-down(mobile){
            width: 100vw;
        }
    }

    &__user-info{
        display: flex;
        width: 400px;
        height: 70px;
        background-color: #e09e00;
        border-top: 4px solid $secondary-color;
        border-left: 4px solid $secondary-color;
        border-right: 4px solid $secondary-color;

        @include breakpoint-down(mobile){
            width: 100vw;
            height: 70px;
        }
    }

    &__info-text{
        display: flex;
        flex-direction: column;
        margin-right: 80px;
        padding-top: 10px;
       
        & span{
            font-weight: bold;
        }
    }

    &__profile-picture{
        width: 50px;
        height: 50px;
        margin-left: 10px;
        margin-top: 5px;
        margin-right: 20px;
        border-radius: 50px;
        border: 2px solid $primary-color;
    }

    &__title{
        width: 400px;
        height: 40px;
        position: relative;
        top: -40px;
        left: 200px;
        background-color: #ffd96a;
        border-top: 4px solid $secondary-color;
        border-left: 4px solid $secondary-color;
        border-right: 4px solid $secondary-color;

        @include breakpoint-down(mobile){
            width: 50vw;
            height: 45px;
            top: -45px;
            left: 195px;
        }

        & p{
            padding-top: 10px;
            padding-left: 10px;

            @include breakpoint-down(mobile){
                padding: unset;
                padding-left: 2px;
            }
        }
    }

    &__img{

        @include breakpoint-down(mobile){
            width: 99vw;
            height: 270px;
        }

        &-wrapper{
            width: 600px;
            height: 400px;
            margin-top: -40px;
            border: 4px solid $secondary-color;

            @include breakpoint-down(mobile){
              width: 100vw;
              height: 270px;
              margin-top: -50px;
            }
        }

        width: 100%;
        height: 100%;
        object-fit: fill;
    }

    &__text{
        width: 92%;
        height: 30%;
        position: relative;
        top: -150px;
        left: 20px;
        background: rgba(238, 238, 238, 0.808);
        border: 4px solid $secondary-color;

        @include breakpoint-down(mobile){
            top: -110px;
        }
       
       & p{
        padding-left: 10px;
        padding-right: 10px;
        height: 100%;
        overflow: hidden;
        font-weight: 600;
       }
    }

}

.reaction-panel{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 600px;
    height: 60px;
    border: 3px solid $secondary-color;
    background-color: #ffd96a;

    @include breakpoint-down(mobile){
        width: 100vw;
    }

    &__comment{
        display: flex;
        align-items: center;
        
        & img{
            width: 70px;
            height: 70px;
        }
    }

    & span{
        font-size: rem(30);
        font-weight: bold;
    }

    &__emojis{
        display: flex;
        align-items: center;
        padding-right: 12px;

        @include breakpoint-down(mobile){
            & img:nth-child(1),
            & img:nth-child(2),
            & img:nth-child(3),
            & img:nth-child(4),
            & img:nth-child(5),
            & img:nth-child(6){
                display: none;
            }
        }
    }

    &__emoji{
        width: 45px;
        height: 45px;
        margin-right: 12px;

        &:hover{
            cursor: pointer;
        }
    }

   
}

</style>

