import router from '../router/index.js';
import getUserInfo from './getUserInfo';

export default{
    mixins:[getUserInfo],
    methods:{
        tintReRoute(reRoute){
            document.body.style.overflow = 'visible';
            router.replace({path: reRoute});
            this.getUserInfo();
        }
    }
}
