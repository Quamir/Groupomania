export default{
    methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
        }
    }
}