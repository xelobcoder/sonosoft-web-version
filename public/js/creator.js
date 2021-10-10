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
           <tr dbid=${item.ID}>
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
                <td>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" style="color: lightseagreen;" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                </td>
                <td>
                    <svg xmlns="http://www.w3.org/2000/svg" style="color: red;" width="16" height="16" fill="currentColor" class="bi bi-archive-fill" viewBox="0 0 16 16">
                    <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                    </svg>
                </td>
                <td><button class="btn btn-warning p-0" id="vh">view history</button><td>
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
            delete_Item();
        }).catch( (err) => {console.log(err)})
    }

    render_ClientList();

    const delete_Item = function (){
        const button = document.querySelectorAll("#vh");
        button.forEach( (item) => {
            item.onClick = function (item){
                let parent = item.parentElement;
                let id = parent.getAttribute("dbid");
            }
        })
    }

    delete_Item()

}