window.onload = (ev) => {
    const deliverPost = async (api,methods = "GET",data = null) => {
        if(methods == "GET"){
            return await fetch(api);
        }else{
            return await fetch(api,{
                method: methods,
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
        }
    }

    // socket io connection
    const socket = io.connect("http://localhost:8000");

    console.log(socket)

    const renderHtml = function(array){
       let isArray = Array.isArray(array) ? true : false;
       
       const singleItem = function(item){
           return (` 
           <tr>
                <td>${item.ID}</td>
                <td>${item.UUID}</td>
                <td>${item.FULLNAME}</td>
                <td>${item.GENDER}</td>
                <td>${item.AGE}</td>
                <td>${item.REFERER}</td>
                <td>${item.INSTITUTION}</td>
                <td>${item.SCAN}</td>
                <td>${item.COST}</td>
                <td>${item.AMOUNT_PAID}</td>
                <td>${item.DISCOUNT}</td>
                <td>edit</td>
                <td>delete</td>
                <td><button class="btn btn-warning p-0">view history</button><td>
         </tr>
           `);
       }
       const displaydata= function(){
            let tbody = document.querySelector("tbody");
            let clients =  array.map((item)=>{
                return singleItem(item);
            }).join("");
         return tbody.innerHTML = clients;
       }

       if(isArray){
         displaydata();
       }
    }

    const render_ClientList =  function(){
        deliverPost("http://localhost:8000/registration")
        .then ( (response) => {
            return response.json();
        })
        .then( (response) => {
            console.log(renderHtml(response))
        }).catch( (err) => {console.log(err)})
    }

    render_ClientList();
}