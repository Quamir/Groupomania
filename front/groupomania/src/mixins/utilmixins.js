import http from './http'
export default{
    mixins:[http],
    methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
        },

        async reaction(link,userId,route){
            const body = {postId: link, userId: userId};
            const data = await this.fetchWithBody(`http://localhost:3000/api/reaction/${route}`,body,'POST');

        console.log(data); 
        }
    }
}