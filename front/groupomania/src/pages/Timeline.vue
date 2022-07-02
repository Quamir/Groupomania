<template>
    <section>

        <aside class="people">
            <div class="people-wrapper">
                <h2>People</h2>
                <div class="people__detail-wrapper">
                    <img src="../assets/images/people/Lora_Gertie.jpg" alt="profile picture" class="people__profile-picture">
                    <div class="people__name">
                        <p>Lora Gertie</p>
                    </div>
                </div>
                <div class="people__detail-wrapper">
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
                </div>
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
    </section>
</template>

<script>
import { useRoute } from 'vue-router';
export default {
    
    methods:{
        render(){
            if(useRoute().path === '/makeapost'){
                document.body.style.overflow = 'hidden';
                return true;
            }else{
                return false;
            }
        },
    },
}
</script>


<style lang="scss" scoped>

html{
    height: max-content;
}

section{
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

    &__wrapper{
        margin-right: 50px;
    }

    & img {
        width: 150px;
        height: 150px;
        object-fit: fill;
        margin-bottom: -4px;
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

    &__btn{
        height: 60%;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 10px;
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

    & h2{
        text-align: center;
        padding-bottom: 20px;
    }

    &__detail-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
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
        width: 80%;
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

    & textarea{
        resize: none;
        outline: none;
        border: 2.5px solid $secondary-color;
    }

    &__btn-wrapper{
        display: flex;
        align-items: center;
    }

    &__icon{
        width: 150px;
        height: 150px;
        margin-right: 100px;
    }

    &__btns-wrapper{
        display: flex;
        flex-direction: column;
    }

    &__btn{
        width: 200px;
        height: 45px;
        margin-bottom: 20px;
    }
}
</style>
