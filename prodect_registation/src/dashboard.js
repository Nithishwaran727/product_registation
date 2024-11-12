const popup = document.getElementById('addpopup');
const productname=document.getElementById("Productname");
const description = document.getElementById('productdescription');
const price = document.getElementById("Productprice");
const offer = document.getElementById("Productoffers");
//const file = document.getElementById("fileinput");
const ul = document.getElementById("Productlist");
const fileInfo = document.getElementById('fileinfo');
const Editpopup = document.getElementById('Editpopup'); 
 
const product= document.getElementById("updateproduct");

const eidtproduct = document.getElementById("")
const infoAlert = document.getElementById('Alertinfo');

const productname1=document.getElementById("Productname1");
const description1 = document.getElementById('productdescription1');
const price1 = document.getElementById("Productprice1");
const file1 = document.getElementById("fileinput1");
const offer1 = document.getElementById("Productoffers1");
const username = document.getElementById('username');

const parameterid = new URLSearchParams(window.location.search);
const uname  = parameterid.get('name');
if (uname){
  UserName(uname);
}
else{
    console.error("id not found");
    //location.href='employee.html'
}

function UserName(uname){
        username.innerHTML="Hi "+uname+'!';
    console.log(uname)
}

function addproduct(){
    popup.style.display = " block";
}

async function addlist(event){    

    console.log("name=",productname.value,price.value,description.value);
    let ispersent = false;
        if(productname.value == ""||productname.value==null){
            document.getElementById('nameerr').style.color = "red";
            document.getElementById('nameerr').innerHTML="Product name requried";
            ispersent = true;
        }
        else {
            document.getElementById('nameerr').innerHTML="";
            ispersent = false;
        }
        if(description.value == ""||description.value==null){
            document.getElementById('descriptionerr').style.color = "red";
            document.getElementById('descriptionerr').innerHTML="Product descriptoin requried";
            ispersent = true;
        }
        else {
            document.getElementById('descriptionerr').innerHTML="";
            ispersent = false;
        }
        if(price.value==""||price.value==null){
            document.getElementById('priceerr').style.color = "red";
            document.getElementById('priceerr').innerHTML="Product price requried";
            ispersent = true;
        }
        else {
            document.getElementById('priceerr').innerHTML="";
            ispersent = false;
        }
        if(offer.value==""||offer1.value==null){
            document.getElementById('offerserr').style.color = "red";
            document.getElementById('offerserr').innerHTML="Product offer requried";
            ispersent = true;
        }
        else {
            document.getElementById('offerserr').innerHTML="";
            ispersent = false;
        }/*
        if (file.value=='' || file.value==null){
            fileInfo.style.color = 'red';
            fileInfo.innerHTML = 'image is requried';
               file.value = '';
               ispersent = true ;
        }
        else{
           const filePath = file.value;
           const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
           const fileSizeLimit = 2 * 1024 * 1024; // 2 MB
           if (!allowedExtensions.exec(filePath)) {
               fileInfo.style.color = 'red';
               fileInfo.innerHTML = 'Invalid file type';
               file.value = '';
               ispersent  = true ;
           } else if (file.files[0].size > fileSizeLimit) {
               fileInfo.style.color = 'red';
               file.value = 'File size exceeds 2 MB';
               ispersent= true;
           } else {
               fileInfo.innerHTML = ``;
               ispersent=false;
           }
        }*/
    
    console.log(!ispersent);
    if(!ispersent) {  
            const productdetails = {
               productName:productname.value,
               description:description.value,
               price:price.value,
               offers:offer.value,
              //images:file.value,
            }
            

        const api ='https://6704f3c3031fd46a830e07d0.mockapi.io/product'; 

        try {
           // Fetch request to send data
           const response = await fetch(api, {
               method: 'POST',
               headers: {
   
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(productdetails)
               
           });
   
           if (!response.ok) {
               throw new Error('Network response was not ok');
           }
           console.log('add product successfully');
           if (document.getElementById('notask').childElementCount != 0){
           document.getElementById('noTask').style.display="none";
           }
           listout()
          
           popup.style.display = "none";
           productname.value = "";
           description.value='';
           price.value='';
           offer.value='';
           file.value='';
           infoAlert.innerHTML="add product successfully"; 
           setTimeout(function() {
            infoAlert.innerHTML='';
                }, 3000)

       } catch (error) {
           console.error('Error:', error);
       }
    }

}



function addclose(){
    popup.style.display="none";
    productname.value = "";
    description.value='';
    price.value='';
    offer.value='';
    //file.value='';
    document.getElementById('nameerr').innerHTML="";
    document.getElementById('descriptionerr').innerHTML="";
    document.getElementById('priceerr').innerHTML="";
    document.getElementById('offerserr').innerHTML="";
    fileInfo.innerHTML="";

}

async function listout(){
    var count=1;
    var response = await fetch(`https://6704f3c3031fd46a830e07d0.mockapi.io/product`);
    if (!response.ok){
       throw new Error("Reponse is :",response.status);
    }
   let data =await response.json();
   ul.innerHTML="";
   
  data.forEach(user=> {
    const row = document.createElement('tr');
    var productlist =`
               <th scope="row">${count}</th>
               <td>${user.productName}</td>
              <td>&#8377 ${user.price}</td>
              <td> ${user.offers}&#37</td>
            <td><button class="btn btn-warning" type="button" id="viewbtn" title="view" onclick='viewpage(${user.id})'>view</button>   
                            <button class="btn btn-primary" type="button" id="updatebtn" title="Edit" onclick='EditItems(${user.id})'>Edit</button>
                            <button class="btn btn-danger" type="button" onclick='DeleteItems(${user.id})' title="Delete"  >Delete</button></td>   `

            count+=1
        row.innerHTML = productlist    
        ul.appendChild(row);
        
    /*
    const li = document.createElement('li');
    li.className = "col-sm-4";
    var productlist = `
    <div class="row d-inline" >
    <div class="col-sm-12">
    <div class="card">
      <div class="card-body">
        <img src="${user.image}" title="product image" style="width:200px; height:150px;">
                        </div>
                        <div>${user.productName}</div>
                        <div class="price">price:&#8377 ${user.price}</div>
                        <div class="card-footer mb-6">
                            <button class="btn btn-warning" type="button" id="viewbtn" title="view" onclick='viewpage(${user.id})'>view</button>   
                            <img class="edit product-controls" type="button" id="updatebtn" title="Edit" onclick='EditItems(${user.id})' src='../images/edit.png'/>
                            <img class="delete product-controls" onclick='DeleteItems(${user.id})' title="Delete" src="../images/Delete.png" />
                        </div>
      </div>
    </div>
  </div> </div>` ;

    li.innerHTML = (productlist);
    ul.appendChild(li);*/
  });
  
  if (ul.childElementCount == 0){
    
    var h3 = document.createElement('h3');
    h3.className = "noTask";
    h3.setAttribute('id','noTask');
    h3.innerHTML = "<img src='../images/no-products-found.jpg' alt='no item found' width='200px' height='200px'>";
    h3.style.display = 'block';
    document.getElementById('notask').appendChild(h3); // Append the task to the list
} 
}
listout();
const Alert=document.getElementById('Alert');


async function DeleteItems(id){
    try{
        const response =await( fetch(`https://6704f3c3031fd46a830e07d0.mockapi.io/product/${id}`,{
            method:'DELETE',
        }));
        if (response.ok){
            listout();
            console.log("Task Delete successfull");
            infoAlert.style.color= "red";
            infoAlert.innerHTML="product  Deleted successfull";
            setTimeout(function() {
                infoAlert.style.color='';
              infoAlert.innerHTML = "";
            }, 3000);
        }
        else{ 
            
            console.log("can't delete task");
            infoAlert.style.color= "red";
            infoAlert.innerHTML="can't delete product ";
            setTimeout(function() {
                infoAlert.style.color='';
                infoAlert.innerHTML = "";
            }, 2000)
        }
    }
    catch{
        console.error("Error:",response.status);
        
        setTimeout(function() {
          alert("Error",error);
        }, 2000);
    }
}

//update the a file
let Taskdata;

async function EditItems(id)
{
        fetch(`https://6704f3c3031fd46a830e07d0.mockapi.io/product/${id}`)
        .then(response => response.json())
        .then(json => {
            updata=json
             // Moved inside the then block
        productname1.value=updata.productName;
        description1.value=updata. description;
        price1.value=updata.price;
        offer1.value = updata.offers;
        //file1.ariaPlaceholder=updata.image;
                 
        }
    )
        .catch(error => {
            console.error("Error: ", error);
            alert("Can't get data ."); // Moved inside the catch block
        });
       
        Editpopup.style.display = "block";
        product.addEventListener("click",function(){
            let ispersent = false;
            if(productname1.value == ""||productname1.value==null){
                document.getElementById('nameerr1').style.color = "red";
                document.getElementById('nameerr1').innerHTML="Product name requried";
                ispersent = true;
            }
            else {
                document.getElementById('nameerr1').innerHTML="";
                ispersent = false;
            }
            if(description1.value == ""||description1.value==null){
                document.getElementById('descriptionerr1').style.color = "red";
                document.getElementById('descriptionerr1').innerHTML="Product description requried";
                ispersent = true;
            }
            else {
                document.getElementById('descriptionerr1').innerHTML="";
                ispersent = false;
            }
            if(price1.value==""||price1.value==null){
                document.getElementById('priceerr1').style.color = "red";
                document.getElementById('priceerr1').innerHTML="Product price requried";
                ispersent = true;
            }
            else{
                document.getElementById('priceerr1').innerHTML="";
                ispersent = false;
            }

            if(offer1.value==""||offer1.value==null){
                document.getElementById('offerserr1').style.color = "red";
                document.getElementById('offerserr1').innerHTML="Product offer requried";
                ispersent = true;
            }
            else {
                document.getElementById('offerserr1').innerHTML="";
                ispersent = false;
            }
            
            if (!ispersent){
             /*if(file1.value == " "||file1.value==null){
                Taskdata={
                    productName:productname1.value,
                    decription:description1.value,
               price:price1.value,
               offers:offer1.value
                }  
             }   
             else{
                Taskdata = {
                    productName:productname1.value,
                    decription:description1.value,
               price:price1.value,
               offers:offer1.value,
               image:file1.value,
                }
             }*/
            Taskdata={productName:productname1.value,
                description:description1.value,
           price:price1.value,
           offers:offer1.value}

            var url = (`https://6704f3c3031fd46a830e07d0.mockapi.io/product/${id}`)
            const xhr = new XMLHttpRequest;
            xhr.open('PUT',url,true);
            xhr.setRequestHeader('Content-Type','application/json;charset=UTF-8');
    
            xhr.onreadystatechange =function (){
                  if(xhr.readyState === 4 && xhr.status===200){
                    listout();
                    Editpopup.style.display = 'none';
                    infoAlert.innerHTML="updated succssfully";
                    setTimeout(()=> {
                        infoAlert.innerHTML='';
                    }, 3000)
                    }
                  else if (xhr.readyState===4){
                    infoAlert.style.color='red';
                    infoAlert.innerHTML="product update failed.";
                    setTimeout(function() {
                        infoAlert.style.color='';
                          infoAlert.innerHTML=""; 
                    }, 2000)
                  }
            };      
    
            xhr.send(JSON.stringify(Taskdata));
    
      }});         
    }
function Editclose() {
   Editpopup.style.display="none";
   document.getElementById('nameerr1').innerHTML="";
    document.getElementById('descriptionerr1').innerHTML="";
    document.getElementById('priceerr1').innerHTML="";
    document.getElementById('offerserr1').innerHTML="";
}
    
function viewpage(id){
    window.location.href=`view.html?id=${id}`;
}

function signOut(){
    if (confirm("Are you sure ?")){
        window.location.replace(`../Html/login.html`);
    }
    else{
        
    }
}


function loader() {
    
    document.querySelector(".containerL").style.visibility = "visible";

    setTimeout(()=>{document.querySelector(".containerL").style.display = "none"},5000)
};

loader();
