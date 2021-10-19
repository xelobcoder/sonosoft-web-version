window.onload = (ev) => {
    /**
     * @param method tcp method
     * @param api api
     * @param data data to send if method = "POST"
     */
    const deliverPost = function(methood,api,data){
        let validData = typeof(data) === "object" ? JSON.stringify(data) : data;
        if(typeof (method) == "POST"){
            let url = await fetch(api, {
                method: method,
                headers: {
                    "content-type":"application/json"
                },
                body: validData
            }) 

            return url;
            
        }
        return;
    }




}