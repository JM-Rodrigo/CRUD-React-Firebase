import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import logo_2 from '../img/logo_2.png'



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
            <div className='title'>
              <h1>EDITA LA INFORMACIÓN DEL AUTO</h1>
            </div>
            <img  src={logo_2} aria-hidden className='img-fluid' alt='Responsive image' />
            <form onSubmit={update}>

              <div className="mb-3 mt-4">
                <label  className="form-label">Nombre : </label>
                <input 
                value={Nombre} 
                onChange={(e)=>setNombre(e.target.value)} 
                type="text" 
                className="form-control"  
                placeholder="Ingresa el nombre del auto" required/>            
              </div>

              <div className="mb-3">
                <label  className="form-label">Marca : </label>
                <input 
                value={Marca} 
                onChange={(e)=>setMarca(e.target.value)} 
                type="text" 
                className="form-control"  
                placeholder="Ingresa la marca del auto" required/>            
              </div>

              <div className="mb-3">
                <label className="form-label">Modelo : </label>
                <input 
                value={Modelo} 
                onChange={(e)=>setModelo(e.target.value)} 
                type="text" 
                className="form-control"  
                placeholder="Ingresa el modelo del auto" required/>            
              </div>

              <button type="submit" className="btn btn-warning">Actualizar</button>
          
              <Link to='/' className='btn btn-danger mx-2'>Cancelar</Link>

            </form>

          </div>
        </div>
      </div>
  )
}

export default Edit