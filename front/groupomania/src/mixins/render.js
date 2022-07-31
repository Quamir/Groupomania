import {useRoute} from 'vue-router';

export default{
    methods:{
        render(path){
            if(useRoute().path === path){
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                return true;
            }else{
                return false;
            }
        }
    }
}