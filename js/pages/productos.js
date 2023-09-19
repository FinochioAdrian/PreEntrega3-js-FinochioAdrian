export default function productos () {
   
    const formProductos = document.querySelector("#form-productos")
    formProductos.addEventListener('submit', (e)=>{
    e.preventDefault()
    const form=new FormData(e.target)
    mostrarObjetos(form)
    const dataForm = (Object.fromEntries(new FormData(e.target)))
    mostrarObjetos(dataForm)
    
})


}

function mostrarObjetos(obj){
    console.log(obj);
}


const validacionesFormulario ={
    name:{
        required:true,
        type:"text",
        msgInvalid:"Debe de ingresar un nombre"
    },
    price:{
        required:true,
        type:"number",
        min:0,
        msgInvalid:"Debe de ingresar un precio"
    },
    stock:{
        required:true,
        type:"text",
        msgInvalid:"Debe de ingresar un nombre"
    },
    category:{
        required:true,
        type:"text",
        msgInvalid:"Debe de ingresar un nombre"
    },
    datails:{
        required:true,
        type:"text",
        msgInvalid:"Debe de ingresar un nombre"
    }
    
}