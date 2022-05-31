import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'



const Edit = () => {
  const [Nombre, setNombre] = useState('')
  const [Marca, setMarca] = useState('')
  const [Modelo, setModelo] = useState('')

  const navigate = useNavigate()
  const {id}  = useParams()

  const update =async (e) =>{
    e.preventDefault()
    const product = doc(db,"Autos",id)
    const data ={ Nombre: Nombre,
      Marca: Marca,
      Modelo: Modelo}

      await updateDoc(product, data)

      Swal.fire({
        title: 'Desea guardar los cambios?',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate('/')
         
        } else if (result.isDenied) {
          Swal.fire('Cambios no guardados',)

        }
      })


  }

  const getProductById =async (id) => {
      const product = await getDoc(doc(db,"Autos",id))
      if (product.exists()) {
        //console.log(product.data())
        setNombre(product.data().Nombre)
        setMarca(product.data().Marca)
        setModelo(product.data().Modelo)
      } else {
        console.log("no existe")
      }
  }

  useEffect (() =>{
    getProductById(id)
  },[])
  return (
    <div className="container">
        <div className="row">
          <div className="col">
            <h1> EDIT</h1>

            <form onSubmit={update}>

              <div class="mb-3">
                <label  class="form-label">Nombre : </label>
                <input 
                value={Nombre} 
                onChange={(e)=>setNombre(e.target.value)} 
                type="text" 
                class="form-control"  
                placeholder="Ingresa el nombre del auto" required/>            
              </div>

              <div class="mb-3">
                <label  class="form-label">Marca : </label>
                <input 
                value={Marca} 
                onChange={(e)=>setMarca(e.target.value)} 
                type="text" 
                class="form-control"  
                placeholder="Ingresa la marca del auto" required/>            
              </div>

              <div class="mb-3">
                <label for="" class="form-label">Modelo : </label>
                <input 
                value={Modelo} 
                onChange={(e)=>setModelo(e.target.value)} 
                type="text" 
                class="form-control"  
                placeholder="Ingresa el modelo del auto" required/>            
              </div>

              <button type="submit" class="btn btn-success">Update</button>
            
              
                      <Link id= 'btn-create'to='/' className='btn btn-success mt-2 mb-2  mx-2'>Cancel</Link>
                  


            </form>

          </div>
        </div>
      </div>
  )
}

export default Edit