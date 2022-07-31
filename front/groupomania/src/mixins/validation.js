export default{
    methods:{
        validate(val){
            if(val === '' || val === undefined){
                return false
            }else{
                return true
            }

        },

        clearValidity(input){
            this[input].isValid = true;
        },

        matchString(first,second){
            if(first === second){
                return true;
            }else{
                return false
            }
        }
    }
}