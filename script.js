const carrito = document.querySelector('#carrito');
const listaProductos = document.querySelector('#lista-1');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const cargarMasBtn = document.querySelector('#loading');

let articulosCarrito = [];
let productosCargados = false;

// Eventos
eventListeners();

function eventListeners(){

listaProductos.addEventListener('click', agregarProducto);

carrito.addEventListener('click', eliminarProducto);

vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

document.addEventListener('DOMContentLoaded', () => {
articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
carritoHTML();
});

cargarMasBtn.addEventListener('click', toggleProductos);

}

// Agregar al carrito

function agregarProducto(e){

if(e.target.classList.contains('agregar-carrito')){
e.preventDefault();

const producto = e.target.parentElement.parentElement;

leerDatosProducto(producto);

}

}

// Leer datos

function leerDatosProducto(producto){

const infoProducto = {
imagen: producto.querySelector('img').src,
titulo: producto.querySelector('h3').textContent,
precio: producto.querySelector('.precio').textContent,
id: producto.querySelector('a').getAttribute('data-id'),
cantidad: 1
}

const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);

if(existe){
const productos = articulosCarrito.map(producto => {
if(producto.id === infoProducto.id){
producto.cantidad++;
return producto;
}else{
return producto;
}
});
articulosCarrito = [...productos];
}else{
articulosCarrito = [...articulosCarrito, infoProducto];
}

carritoHTML();

}

// Mostrar carrito

function carritoHTML(){

limpiarHTML();

articulosCarrito.forEach(producto => {

const row = document.createElement('tr');

row.innerHTML = `
<td>
<img src="${producto.imagen}" width="50">
</td>

<td>${producto.titulo}</td>

<td>${producto.precio}</td>

<td>${producto.cantidad}</td>

<td>
<a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
</td>
`;

contenedorCarrito.appendChild(row);

});

sincronizarStorage();

}

// Eliminar

function eliminarProducto(e){

if(e.target.classList.contains('borrar-producto')){

const productoId = e.target.getAttribute('data-id');

articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);

carritoHTML();

}

}

// Vaciar carrito

function vaciarCarrito(e){
e.preventDefault();
articulosCarrito = [];
carritoHTML();
}

// Limpiar HTML

function limpiarHTML(){
contenedorCarrito.innerHTML = '';
}

// Guardar carrito

function sincronizarStorage(){
localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}


// Cargar más / menos productos

function toggleProductos(){

if(!productosCargados){

const nuevosProductos = document.createElement('div');
nuevosProductos.id = "nuevos-productos";

nuevosProductos.innerHTML = `

<div class="box">
<img src="images/pla5.png">
<div class="product-txt">
<h3>NutriFood Premium</h3>
<p>calidad premium</p>
<p class="precio">250$</p>
<a href="#" class="agregar-carrito btn-3" data-id="5">Agregar</a>
</div>
</div>

<div class="box">
<img src="images/pla6.png">
<div class="product-txt">
<h3>NutriFood Fit</h3>
<p>calidad premium</p>
<p class="precio">300$</p>
<a href="#" class="agregar-carrito btn-3" data-id="6">Agregar</a>
</div>
</div>

`;

listaProductos.appendChild(nuevosProductos);

cargarMasBtn.textContent = "Cargar menos";

productosCargados = true;

}else{

document.querySelector("#nuevos-productos").remove();

cargarMasBtn.textContent = "Cargar más";

productosCargados = false;

}

}