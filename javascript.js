		var cont = 0
			let init =4
		let info= ""
		const $app = document.getElementById('app');
		const $observe = document.getElementById('observe');
		
		document.addEventListener("DOMContentLoaded",() =>{
		
		loadData(init)
		});
	

		const getData = (api) => {
		fetch(api)
		.then(response => response.json())
		.then(response => {
	    let products = response;
		
		const allprod = products.map((product) =>product)
			guardar(allprod)
			convertido ()
		for (let prod of convertido()){
			pintapp(prod)
			}	
		pantalla()	  
		}).catch(error => console.log(error));
		}

		const loadData = () => {
		
	    const api = `https://api.escuelajs.co/api/v1/products?offset=${init}&limit=10`
			getData(api);
		
		window.addEventListener("beforeunload", limpiar() )
		
		init+=10
	} 	

	   function pantalla(){
		    window.removeEventListener("beforeunload",()=>{}) 
			const prodpant = document.querySelectorAll(".Card")  
			const ultprod = prodpant[prodpant.length -1] 
			console.log(ultprod)
			const root = document.querySelector(".BodyApp")
			intersectionObserver.observe(ultprod)
	   }
	   
		function pintapp(output){
		
		console.log(output.id)
		const contentapp = document.getElementById("app")
		const template = document.querySelector(".PintaCard").content
		const clonetemplate = template.cloneNode(true)
		const fragment = document.createDocumentFragment() 
		
		clonetemplate.querySelector(".Card").innerHTML=
		`<img src=${output.images} alt=${output.description} class = "Img"/><h2>${output.title} 
		<small>$ Precio:${output.price}</small>	</h2>`
		fragment.appendChild(clonetemplate)
		contentapp.appendChild(fragment)
		
		if (output.id == 200){
			window.alert("Todos los productos Obtenidos")
			localStorage.removeItem('pagination')
			IntersectionObserver.unobserve(ultprod)
		}
}

		const guardar= function guardarenLocal(allprod){
			info = JSON.stringify(allprod)
			localStorage.setItem("pagination", info)
			}

		const intersectionObserver = new IntersectionObserver(entries => {
			entries.forEach(entrie=>{
			if (entrie.isIntersecting == true){ 
				cont++
				if (cont >1){
					loadData()
				}
				
			}
		})
			// logic...
		},{
		rootMargin: '0px 0px 20% 0px',
		thresholds: 0.5
});
		const convertido=function convertir (){
			return convert = JSON.parse(localStorage.getItem("pagination"))
			 console.log(convert)
		}
		function limpiar(){
			localStorage.removeItem("pagination")
			localStorage.removeItem("init")
			}