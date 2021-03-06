const grid = new Muuri('.grid' , {
	layout: {
		rounding: false
	}
});



window.addEventListener('load', () => {
	grid.refreshItems().layout();
	document.getElementById('grid').classList.add('imagenes-cargadas');


	//Agregamos los listener de los enlaces para filtrar por categoria
	const enlaces = document.querySelectorAll('#categorias a');
	enlaces.forEach((elemento) => {
		elemento.addEventListener('click',(evento) => {
			evento.preventDefault();

			enlaces.forEach((enlace) => enlace.classList.remove('activo'));
			evento.target.classList.add('activo');

			const categoria = evento.target.innerHTML.toLowerCase();

			categoria === 'todo' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria = "${categoria}"]`);

			
		});
	});


	//Agregamos el listener para la barra de busqueda
		document.querySelector('#barra-busqueda').addEventListener('input',(evento) => {
		const busqueda = evento.target.value;
		console.log(busqueda);
		grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));
	});

	//Agregamos listener para las imagenes
	const overlay = document.getElementById('overlay');
	document.querySelectorAll('.grid .item img').forEach( (elemento) => {
		

		elemento.addEventListener('click', () => {
			const ruta = elemento.getAttribute('src');
			const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
			const nombreObra = elemento.parentNode.parentNode.dataset.nombre;
			const precioObra = elemento.parentNode.parentNode.dataset.precio;


			overlay.classList.add('activo');
			document.querySelector('#overlay img').src = ruta;
			document.querySelector('#overlay .descripcion').innerHTML = descripcion;
			document.querySelector('#overlay .nombre').innerHTML = nombreObra;
			document.querySelector('#overlay .precio').innerHTML = '$ ' + precioObra;
		});
	});



	//Event listener del boton de cerrar
	document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
		overlay.classList.remove('activo');
	});


	//Event listener del overlay
	overlay.addEventListener( 'click', (evento) => {{
		
		evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';

	}});
});