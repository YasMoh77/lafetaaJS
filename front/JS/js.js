


var searchWord='';
var top=document.querySelector('.top-container');
var form=document.querySelector('.form-parent');
var formSearch=document.getElementById('formSearch');
var torch=document.getElementById('torch');
var loadMoreBtn=document.getElementById('loadMore');
var show=document.getElementById('show');
var show2=document.getElementById('show2');
var country=document.getElementById('country');
var state=document.getElementById('state');
var city=document.getElementById('city');


//click img
function clickImg(e){
	var src=e.src;
 var newDiv=	document.createElement('div');
 var newImg=	document.createElement('img');
 var newSpan=	document.createElement('span');
 //add src to img
 newImg.src=src;
 //add class overlay to newDiv
 newDiv.classList.add('overlay');
//add class close-btn to the span
 newSpan.className = 'close-btn'; 
 newSpan.innerHTML='&times';
 //hide newDive when clicking the close-btn
 newSpan.addEventListener('click',function(){
	newDiv.style.display='none';
	document.body.classList.remove('no-scroll');
 });
//add img to newDiv and add newDiv to the div with id='show'
 newDiv.appendChild(newImg);
 newDiv.appendChild(newSpan);
 show.appendChild(newDiv);
 //
 document.body.classList.add('no-scroll');
}

//get the first 12 items on homepage
let bringLinks=()=>{
	//empty top-container, show spinner and hide the search form
	top.innerHTML='';
	show.innerHTML='<span  class="spinner-border d-block m-auto gray" role="status" aria-hidden="true" ></span>	';
	form.style.display='none';
	//fetch data
	fetch('http://localhost/abdu/index.php?key=123&email=hgq1100@yahoo.com&all=items').then(res=>res.json()).then(data=>{		
	var item='';
	var baseURL='http://localhost/abdu/f/data/upload/';
	
	data.map(e=>{
		    item+="<div class='col-sm-4 main'>";
				//item+="<div>"+e.NAME+"</div>";
				//item+="<span>"+e.description2+"</span>";
				if (e.photo) { // Check if there is an image extension provided
					const imageURL = baseURL + e.photo; // Construct the URL and replace the underscore with a dot
					item += "<img onclick='clickImg(this)' src='" + imageURL + "' alt='" + e.NAME + "' class='w-100 h-100 mx-auto d-block img' />";
				}else if (e.photo2) { // Check if there is an image extension provided
					const imageURL = baseURL + e.photo2; // Construct the URL and replace the underscore with a dot
					item += "<img onclick='clickImg(this)' src='" + imageURL + "' alt='" + e.NAME + "' class='w-100 h-100 mx-auto d-block img' />";
				}else if (e.photo3) { // Check if there is an image extension provided
					const imageURL = baseURL + e.photo3; // Construct the URL and replace the underscore with a dot
					item += "<img onclick='clickImg(this)' src='" + imageURL + "' alt='" + e.NAME + "' class='w-100 h-100 mx-auto d-block img' />";
				}else if (e.photo4) { // Check if there is an image extension provided
					const imageURL = baseURL + e.photo4; // Construct the URL and replace the underscore with a dot
					item += "<img onclick='clickImg(this)' src='" + imageURL + "' alt='" + e.NAME + "' class='w-100 h-100 mx-auto d-block img' />";
				}else if (e.photo5) { // Check if there is an image extension provided
					const imageURL = baseURL + e.photo5; // Construct the URL and replace the underscore with a dot
					item += "<img onclick='clickImg(this)' src='" + imageURL + "' alt='" + e.NAME + "' class='w-100 h-100 mx-auto d-block img' />";
				}
				
		    item+="</div>";	
	});
	//add data to div with id='show' and unhide the search form
	show.innerHTML=item; 
	form.style.display='block';
  });
}

 //search with a word [cancelled]
 /* let search=(e)=>{
  if(e.target.value===''){return searchWord=null;}
  if(e.target.value !=null){
    searchWord=e.target.value;
	var show=document.getElementById('show');
	var item='';
	show.innerHTML='';
	fetch('http://localhost/abdu/index.php?key=123&email=hgq1100@yahoo.com&search='+searchWord).then(res=>res.json()).then(data=>{		
		console.log(data)
		if(data.length>0){
	    data.map((e)=>{
		
			    item+="<div class='col-sm-4 main'>";
					item+="<div id='title'>"+e.NAME+"</div>";
					item+="<span id='desc'>"+e.description2+"</span>";
				item+="</div>";	
    	});}else {item='No search results';}
	 show.innerHTML +=item;

   });
  }else {item='Enter search word';}
}*/


// search using a form
async function formSearchFunc(e){
	// Prevent the form from submitting the traditional way
    e.preventDefault(); 
  //empty show2 and the p element next to it
  show2.innerHTML = '';
  show2.nextElementSibling.innerHTML ='';
  var loadMoreBtn=document.getElementById('loadMore');

    // Get form data
	//const form=e.currentTarget;
    const formData = new FormData(this);

    // Convert form data to a JSON object
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

        // Send a POST request using Fetch API
        const response = await fetch('http://localhost/abdu/search.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
            
		// Try to parse the response as JSON
        const jsonResponse = await response.json();
		var baseURL='http://localhost/abdu/f/data/upload/';
		//store only data for displaying on search result part of the site
        const dt=jsonResponse.data;
        // Update the UI with the JSON response
		if(dt.length>0){
			torch.innerHTML=` نتائج البحث:  &nbsp; ${jsonResponse.ads} &nbsp; اعلان   `;
			let item = '';
			dt.map(e => {
						item+="<div class='col-sm-4 main'>";
						if (e.photo) { // Check if there is an image extension provided
							const imageURL = baseURL + e.photo; // Construct the URL and replace the underscore with a dot
							item += "<img onclick='clickImg(this)' src='" + imageURL + "' alt='" + e.NAME + "' class='w-100 h-100 mx-auto d-block img' />";
						}else if (e.photo2) { // Check if there is an image extension provided
							const imageURL = baseURL + e.photo2; // Construct the URL and replace the underscore with a dot
							item += "<img onclick='clickImg(this)' src='" + imageURL + "' alt='" + e.NAME + "' class='w-100 h-100 mx-auto d-block img' />";
						}else if (e.photo3) { // Check if there is an image extension provided
							const imageURL = baseURL + e.photo3; // Construct the URL and replace the underscore with a dot
							item += "<img onclick='clickImg(this)' src='" + imageURL + "' alt='" + e.NAME + "' class='w-100 h-100 mx-auto d-block img' />";
						}else if (e.photo4) { // Check if there is an image extension provided
							const imageURL = baseURL + e.photo4; // Construct the URL and replace the underscore with a dot
							item += "<img onclick='clickImg(this)' src='" + imageURL + "' alt='" + e.NAME + "' class='w-100 h-100 mx-auto d-block img' />";
						}else if (e.photo5) { // Check if there is an image extension provided
							const imageURL = baseURL + e.photo5; // Construct the URL and replace the underscore with a dot
							item += "<img onclick='clickImg(this)' src='" + imageURL + "' alt='" + e.NAME + "' class='w-100 h-100 mx-auto d-block img' />";
						}
								
							//   console.log(imageURL);
						item+="</div>";	
				});
				show2.innerHTML += item; // Append new items to the existing content
				loadMoreBtn.style.display='block'; //show loadmore button
		}else{
			show2.innerHTML = '<p class="m-auto red"> لا توجد نتائج بحث </p>';
			loadMoreBtn.style.display='none';
			torch.innerHTML=` نتائج البحث:  &nbsp; ${jsonResponse.ads} &nbsp; اعلان   `;
			
		}		
		
};

//load more results
let currentPage = 1;
const loadMoreFunc = async(e) => {
	e.preventDefault();
	var show2=document.getElementById('show2');
	var country=document.getElementById('formSearch').children[0].children[0].value;
    var state=document.getElementById('formSearch').children[0].children[1].value;
	var city=document.getElementById('formSearch').children[0].children[2].value;
	
    currentPage++;
    loadMoreBtn.children[0].style.display='inline-block';//show spinner
   
	try {
        const response = await fetch(`http://localhost/abdu/index.php?country=${country}&state=${state}&city=${city}&page=${currentPage}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();  
		console.log(data); 
		var baseURL='http://localhost/abdu/f/data/upload/';
	    
            let item = '';
			if(data.length>0){
				data.map(e => {
					item+="<div class='col-sm-4 main'>";
					if (e.photo) { // Check if there is an image extension provided
						const imageURL = baseURL + e.photo; // Construct the URL and replace the underscore with a dot
						item += "<img onclick='clickImg(this)' src='" + imageURL + "' alt='" + e.NAME + "' class='w-100 h-100 mx-auto d-block img' />";
					}else if (e.photo2) { // Check if there is an image extension provided
						const imageURL = baseURL + e.photo2; // Construct the URL and replace the underscore with a dot
						item += "<img onclick='clickImg(this)' src='" + imageURL + "' alt='" + e.NAME + "' class='w-100 h-100 mx-auto d-block img' />";
					}else if (e.photo3) { // Check if there is an image extension provided
						const imageURL = baseURL + e.photo3; // Construct the URL and replace the underscore with a dot
						item += "<img onclick='clickImg(this)' src='" + imageURL + "' alt='" + e.NAME + "' class='w-100 h-100 mx-auto d-block img' />";
					}else if (e.photo4) { // Check if there is an image extension provided
						const imageURL = baseURL + e.photo4; // Construct the URL and replace the underscore with a dot
						item += "<img onclick='clickImg(this)' src='" + imageURL + "' alt='" + e.NAME + "' class='w-100 h-100 mx-auto d-block img' />";
					}else if (e.photo5) { // Check if there is an image extension provided
						const imageURL = baseURL + e.photo5; // Construct the URL and replace the underscore with a dot
						item += "<img onclick='clickImg(this)' src='" + imageURL + "' alt='" + e.NAME + "' class='w-100 h-100 mx-auto d-block img' />";
					}
					item+="</div>";	
				});
				show2.innerHTML += item; // Append new items to the existing content
				
		 }else{
			 /*if(state==0||city==0){show2.nextElementSibling.innerHTML = '';}else{*/show2.nextElementSibling.innerHTML = '<p class="max-auto">لا توجد نتائج أخرى</p>';//}
		 }
	} catch(error){
		console.error('Error:', error);
	}finally{
		loadMoreBtn.children[0].style.display='none'; // remove spinner
	}
        
}

//get states
async function getStates(e){
	const country=e.target.value;
   //fetch states
 const res= await fetch('http://localhost/abdu/state.php?country='+country);
 const data= await res.json();
 
 let item=`<option value="0">اختر محافظة</option>`;
	if(data.length>0){
        data.map(e=>{
			item+=`<option value=${e.state_id}>${e.state_nameAR}</option>`;
		});
		state.innerHTML=item;
	}else{item+=`<option value='0'>لا توجد نتائج</option>`;state.innerHTML=item;}
}

//get the cities
async function getCities(e){
  const state=e.target.value;
  //fetch cities
 const res= await fetch('http://localhost/abdu/state.php?c='+state);
 const data= await res.json();
 
 let item=`<option value="0">اختر مدينة</option>`;
	if(data.length>0){
        data.map(e=>{
			item+=`<option value=${e.city_id}>${e.city_nameAR}</option>`;
		});
		city.innerHTML=item;
	}else{item+=`<option>لا توجد نتائج</option>`;city.innerHTML=item;}						

}




//vars
//load paid ads on home page automatically
window.addEventListener('load',bringLinks);
//search using input
//var inputSearch=document.getElementById('inputSearch');
//inputSearch.addEventListener("keyup",search);
//send search form 
var loadMoreBtn=document.getElementById('loadMore');
formSearch.addEventListener("submit",formSearchFunc);
//load more ads after sending search form
loadMoreBtn.addEventListener("click",loadMoreFunc);
//get states
country.addEventListener('change',getStates);
//get cities
state.addEventListener('change',getCities);



if (window.navigator=='false') {
	alert('check connectio');
}




