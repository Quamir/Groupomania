<template>
  <section>
      <div class="post-img__wrapper">
        <img src="../assets/images/x_icon.svg" alt="exit button" class="post-img__exit-btn">
        <img src="../assets/images/dev-data-imgs/img1.jpg" alt="post image" class="post-img__img">
    </div>
    <div class="comments">
        <div class="comments__poster-info">
            <img src="../assets/images/people/Lora_Gertie.jpg" alt="profile picture" class="comments__profile-picture">
            <div class="comments-info__text">
                <p>Lora Gertie</p>
                <p>June 2 at 11:38 AM</p>
            </div>
        </div>
        <div class="comments__likes">
            <p>likes</p>
            <img src="../assets/images/reactions/like.svg" alt="like button">
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
        <div class="commenter">
            <div class="commenter__wrapper">
                <div class="commenter__info">
                    <p class="commenter__name">Tisha Lorri</p>
                    <img src="../assets/images/people/Tisha_Lorri.jpg" alt="commenter's picture" class="commenter__img">
                </div>
                <div class="commenter__text-wrapper">
                    <div class="commenter__text">
                        <p>June 2 at 11:38</p>
                        <p>orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                            tempor incididunt ut labore et dolore magna aliqua. 
                            Egestas egestas fringilla phasellus faucibus scelerisque eleifend.
                        </p>
                    </div>
                    <div class="commenter__response">
                        <p>like</p>
                        <p>Reply</p>
                    </div>
                </div>
                
            </div>
            <div class="commenter__wrapper">
                <div class="commenter__info">
                    <p class="commenter__name">Rex Benton</p>
                    <img src="../assets/images/people/Rex_Benton.jpg" alt="commenter's picture" class="commenter__img">
                </div>
                <div class="commenter__text-wrapper">
                    <div class="commenter__text">
                        <p>June 2 at 11:45</p>
                        <p>orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                            tempor incididunt ut labore et dolore magna aliqua. 
                            Egestas egestas fringilla phasellus faucibus scelerisque eleifend.
                        </p>
                    </div>
                    <div class="commenter__response">
                        <p>like</p>
                        <p>Reply</p>
                    </div>
                </div>
            </div>
            <div class="commenter__wrapper">
                <div class="commenter__info">
                    <p class="commenter__name">Daxton Indiana</p>
                    <img src="../assets/images/people/Daxton_Indiana.jpg" alt="commenter's picture" class="commenter__img">
                </div>
                <div class="commenter__text-wrapper">
                    <div class="commenter__text">
                        <p>June 2 at 11:38</p>
                        <p>orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                            tempor incididunt ut labore et dolore magna aliqua. 
                            Egestas egestas fringilla phasellus faucibus scelerisque eleifend.
                        </p>
                    </div>
                    <div class="commenter__response">
                        <p>like</p>
                        <p>Reply</p>
                    </div>
                </div>
            </div>
            <div class="commenter__wrapper">
                <div class="commenter__info">
                    <p class="commenter__name">Tisha Lorri</p>
                    <img src="../assets/images/people/Tisha_Lorri.jpg" alt="commenter's picture" class="commenter__img">
                </div>
                <div class="commenter__text-wrapper">
                    <div class="commenter__text">
                        <p>June 2 at 11:38</p>
                        <p>orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                            tempor incididunt ut labore et dolore magna aliqua. 
                            Egestas egestas fringilla phasellus faucibus scelerisque eleifend.
                        </p>
                    </div>
                    <div class="commenter__response">
                        <p>like</p>
                        <p>Reply</p>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>

section{
     display: flex;
}

.post-img{
    &__wrapper{
        width: 50vw;
        height: 93vh;
        overflow: hidden;
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
        object-fit: cover;
    }
}

.comments{
    width: 50vw;
    height: 93vh;

    &__poster-info{
        display: flex;
        align-items: center;
        padding-left: 30px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    &__profile-picture{
        width: 100px;
        height: 100px;
        border-radius: 50px;
        margin-right: 20px;
        
    }

    &-info__text{
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        & p{
            padding-bottom: 15px;
            font-size: rem(20);
            font-weight: 500;
        }
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
    // background-color: gold;
    height: 61vh;
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

</style>