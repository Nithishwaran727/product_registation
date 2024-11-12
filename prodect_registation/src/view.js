const body =document.querySelector('#view');

async function viewprodect(id){
    try{
    var response = await fetch(`https://6704f3c3031fd46a830e07d0.mockapi.io/product/${id}`);
        if (!response.ok){
           throw new Error("Reponse is :",response.status);
        }
       let data =await response.json(); 
        var productlist = `
        <!--<img class="card-img-top" src="${data.images}" alt="Card image cap">-->
        <div class="card-body" style="text-align:center;">
            <h3 class="card-title">${data.productName}</h3>
            <h6 class="card-title" style="color:rgb(94, 7, 7)">Price:&#8377 ${data.price}</h6>
            <p class="card-text" style="color:rgb(55, 182, 55);">Offer: ${data.offers}&#37</p>
            <p class="card-text">${data.description}</p>

            <a href="#" onclick="GoBack()" class="btn btn-primary">Go home</a>
        </div>`
    
        document.querySelector('.card').innerHTML = productlist;
    }
   catch(error){
    console.log(error);
   }   

}

const parameterid = new URLSearchParams(window.location.search);
const id  = parameterid.get('id');
if (id){
  viewprodect(id);
}
else{
    console.error("id not found");
    //location.href='employee.html'
}

function GoBack(){
    window.location.replace("../Html/dashboard.html")
}

function loader() {
    
    document.querySelector(".containerL").style.visibility = "visible";

    setTimeout(()=>{document.querySelector(".containerL").style.display = "none"},5000)
};

loader();
