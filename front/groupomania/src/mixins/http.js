export default{
    methods:{
        async fetchGet(route){
            const response = await fetch(route,{
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer' + ' ' + localStorage.getItem('token')  
                }
            });
            const responseData = await response.json();
            return responseData;
        },

        async fetchWithBody(route, bodyData,method){
            const response = await fetch(route,{
                method: method,
                body: JSON.stringify(bodyData),
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer' + ' ' + localStorage.getItem('token')  
                }
            });

            const responseData = await response.json();
            return responseData;
        },

        async fetchWithFd(route, fd, method){
            const response = await fetch(route,{
                method: method,
                body: fd,
                headers:{
                    Authorization: 'Bearer' + ' ' + localStorage.getItem('token')
                }
            });

            const responseData = await response.json();
            return responseData;
        },

        extractPromise(data,arrayToPush){
            const array = data.message;

            array.forEach(val =>{
                arrayToPush.push(val);
            });
        }
    }
}