


var searchWord='';
var loadMoreBtn=document.getElementById('loadMore');
var show=document.getElementById('show');

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
	show.innerHTML='<span class="spinner-border spinner-search" role="status" aria-hidden="true" ></span>	';
   fetch('http://localhost/abdu/index.php?key=123&email=hgq1100@yahoo.com&all=items').then(res=>res.json()).then(data=>{		
   //var show=document.getElementById('show');
   console.log(data);
	var item='';
	var baseURL='http://localhost/abdu/f/data/upload/';
	const imageURL='';
	
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
				
				//	item+="<p>"+ img+"</p>";

		    item+="</div>";	
	});
 show.innerHTML=item;
  });
}

 //search with a word
  let search=(e)=>{
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
}


//show more items when click a btn
/*const loadMoreFunc=()=>{
	let pageNum=2;
	show.innerHTML='<span class="spinner-border spinner-search" role="status" aria-hidden="true" ></span>	';
	fetch('http://localhost/abdu/index.php?key=123&email=hgq1100@yahoo.com&page=2').then(res=>res.json()).then(data=>{
		console.log(data);
		if(data.length>0){
			data.map((e)=>{
			
					item+="<div>";
						item+="<div id='title'>"+e.title+"</div>";
						item+="<span id='desc'>"+e.description+"</span>";
					item+="</div>";	
			});}else {item='No search results';}
		 show.innerHTML=item;
	
	})
}*/

//send form
async function formSearchFunc(e){
    e.preventDefault(); // Prevent the form from submitting the traditional way
  const show2=document.getElementById('show2');
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
	    const imageURL='';

        // Update the UI with the JSON response
		if(jsonResponse.length>0){
			let item = '';
			jsonResponse.map(e => {
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
				loadMoreBtn.style.display='block';
		}else{
			show2.innerHTML = '';
			loadMoreBtn.style.display='none';
		}		
		
};

//load more results
let currentPage = 1;
const loadMoreFunc = async(e) => {
	e.preventDefault();
	var show2=document.getElementById('show2');
	var state=document.getElementById('formSearch').children[0].children[0].value;
    var city=document.getElementById('formSearch').children[0].children[1].value;
	
    currentPage++;
    loadMoreBtn.children[0].style.display='inline-block';//show spinner
   
	try {
        const response = await fetch(`http://localhost/abdu/index.php?state=${state}&city=${city}&page=${currentPage}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();   
		var baseURL='http://localhost/abdu/f/data/upload/';
	    const imageURL='';    
			//console.log(data);
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
			 if(state==0||city==0){show2.nextElementSibling.innerHTML = '';}else{show2.nextElementSibling.innerHTML = '<p class="max-auto">لا توجد نتائج أخرى</p>';}
		 }
	} catch(error){
		//console.error('Error:', error);
	}finally{
		loadMoreBtn.children[0].style.display='none'; // remove spinner
	}
        
}





//vars
//load ads on home page automatically
window.addEventListener('load',bringLinks);
//search using input
//var inputSearch=document.getElementById('inputSearch');
//inputSearch.addEventListener("keyup",search);
//send search form 
var loadMoreBtn=document.getElementById('loadMore');
var formSearch=document.getElementById('formSearch');
formSearch.addEventListener("submit",formSearchFunc);
//load more ads after sending search form
loadMoreBtn.addEventListener("click",loadMoreFunc);

if (window.navigator=='false') {
	alert('check connectio');
}