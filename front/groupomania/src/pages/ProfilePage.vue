<template>
    <section>

        <div class="cover">
            <div class="cover__color-bg">
                <div class="cover__img-container">
                    <img src="../assets/images/people/Lora_Gertie.jpg" alt="profile picture" class="cover__profile-img">
                    <p class="cover__name">Lora_Gertie</p>
                </div>
            </div>
        </div>

        <div class="title">
            <h1>Post By Lora Gertie</h1>
        </div>

        <div class="posts">
            <post-element></post-element>
        </div>

    </section>
</template>

<style lang="scss" scoped>

.cover{

    &__color-bg{
        display: flex;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        height: 20vh;
        background-color: rgba(253 , 45, 1, 45%);
        margin-bottom: 125px;

        @include breakpoint-down(mobile){
            margin-bottom: 40px;
        }
    }

    &__img-container{
        display: flex;
        padding-top: 30px;

        @include breakpoint-down(mobile){
            padding-top: 10px;
        }
    }

    &__profile-img{
        width: 200px;
        height: 200px;
        border-radius: 50%;
        object-fit: cover;

        @include breakpoint-down(mobile){
            width: 150px;
            height: 150px;
        }
    }

    &__name{
        font-size: rem(45);
        font-weight: bold;
        padding-top: 60px;
        padding-left: 100px;

        @include breakpoint-down(mobile){
            padding-left: 20px;
            font-size: rem(30);
        }
    }
}

.title{
    display: flex;
    align-items: center;
    width: 40vw;
    height: 50px;
    margin: auto;
    margin-bottom: 35px;
    border-radius: 25px;
    background-color: rgba(107,104,104,0.3);

    @include breakpoint-down(mobile){
        width: 90vw;
        margin: auto;
        margin-bottom: 40px;
    }

    & h1{
        text-indent: 50px;
        font-size: rem(25);

        @include breakpoint-down(mobile){
            text-indent: 80px;
            font-size: rem(18);
        }
    }
}

.posts{
    width: 99vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>