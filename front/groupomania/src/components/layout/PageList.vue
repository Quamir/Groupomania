<template>
    <div class="page-list">
        <h3>page</h3>
        <router-link to="/timeline">
            <div class="page-link">
                <span>1</span>
            </div>
        </router-link>
        <router-link to="/timeline/2">
            <div class="page-link">
                <span>2</span>
            </div>
        </router-link>
        <router-link to="/timeline/3">
            <div class="page-link">
                <span>3</span>
            </div>
        </router-link>
        <router-link to="/timeline/4">
            <div class="page-link">
                <span>4</span>
            </div>
        </router-link>
        <router-link to="/timeline/5">
            <div class="page-link">
                <span>5</span>
            </div>
        </router-link>
        <router-link to="/timeline/6">
            <div class="page-link">
                <span>6</span>
            </div>
        </router-link>
        <router-link to="/timeline/7">
            <div class="page-link">
                <span>7</span>
            </div>
        </router-link>
        <router-link to="/timeline/8">
            <div class="page-link">
                <span>8</span>
            </div>
        </router-link>
        <router-link to="/timeline/9">
            <div class="page-link">
                <span>9</span>
            </div>
        </router-link>
        <router-link to="/timeline/10">
            <div class="page-link">
                <span>10</span>
            </div>
        </router-link>
    </div>
</template>

<style lang="scss" scoped>
.page-list{
    display: flex;
    align-items: center;
    margin-left: 50px;
    margin-bottom: 10px;

    @include breakpoint-down(mobile){
        width: 90%;
        flex-wrap: wrap;
        margin-left: 5px;
    }
}
h3{
    margin-right: 5px;
}
.page-link{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: pink;
    font-size: rem(25);
    margin-right: 10px;

}
</style>