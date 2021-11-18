

const workedCases = async function () {
 
    postRequest('http://localhost:8000/workedcases/:msd', 'GET')
      .then((response) => {
        insertID(response);
        TransactionIDevent();
      })
      .catch((err) => {
        throw err
      })
  }

  workedCases()

const searchID = document.querySelector("#searchid");
if(searchID) {
  const filterTransactionID = function(data) {
    postRequest("http://localhost:8000/api/filterid","POST",data)
    .then( (response) => {
       if(response.length === 0) {
         return ;
       } else {
          insertID(response)
       }
    }).catch ((err) =>  {
       throw err;
    })
 }

 searchID.addEventListener("keyup" ,function(ev) {
  let parent = document.getElementById('look');
  parent.innerHTML = "" ;
   const transactionID = ev.target.value;
   if(transactionID != "") {
    const table = "MSD";
    const data = {transactionID,tablename: table};
    filterTransactionID(data);
   } else {
    //  called if search field is empty;
    // poplulate area with worked cases ID
     workedCases()
   }
 })
}
//  end