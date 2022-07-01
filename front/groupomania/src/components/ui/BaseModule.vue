<template>
    <div class="module">
        <div class="header">
            <p class="header__title"><slot name="title"></slot></p>
            <img src="../../assets/images/logos/logoblack.svg" alt="company logo" class="header__logo">
        </div>
        <div class="divider"></div>

        <div class=form-content>
            <slot name="form-content">
            
            </slot>
        </div>
     
        <div class="actions">
            <slot name="buttons">
            
            </slot>
        </div>

    </div>
</template>


<style lang="scss">
.module{
    border-radius: 25px;
    box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.1); 
}

.header{
    display: flex;
    justify-content: center;
    padding-top: 25px;
    margin-bottom: 10px;

    &__logo{
        width: 160px;
        margin-right: 50px;
    }

    &__title{
        position: relative;
        left: -150px;
        font-weight: bold;
        font-size: rem(20);
        color: $secondary-color;
    }

}

 .divider{
        width: 100%;
        height: 5px;
        background-color: red;
}

.form-content{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;

    & label, & p{
    padding-bottom: 10px;
    padding-top: 10px;
    font-size: rem(20);
    font-weight: bolder;
    color: $secondary-color;
    }

    & input{
    width: 90%;
    height: 40px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-color: transparent;
    outline: 0 solid transparent;
    border-radius: 10px;
    box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.3);

        &[type='text'],
        &[type='email'],
        &[type='password']{
            font-size: rem(20);
        }
    }

      & span{
        font-style: italic;
        font-weight: bold;
        color: $secondary-color;
    }
}

.actions{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 20px;
}

</style>