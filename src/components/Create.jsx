import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { Link } from 'react-router-dom'
import logo_1 from '../img/logo_1.png'

const Create = () => {
  const [Nombre, setNombre] = useState()
  const [Marca, setMarca] = useState()
  const [Modelo, setModelo] = useState()

  const navigate = useNavigate()

  const autosCollection = collection(db,'Autos')

  const store = async (e) => {
    e.preventDefault()
    await addDoc(autosCollection, {
      Nombre: Nombre,
      Marca: Marca,
      Modelo: Modelo
    })
    navigate('/')
  };

  return (
    
      <div className="container">
        <div className="row">
          <div className="col">
            <div className='title'>
              <h1>AÑADE UN NUEVO AUTO</h1>
            </div>
            <img  src={logo_1} aria-hidden className='img-fluid' alt='Responsive image' />
            <form onSubmit={store}>

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

              <button type="submit" className="btn btn-primary">Guardar</button>
              <Link to='/' className='btn btn-danger mx-2'>Cancelar</Link>

            </form>

          </div>
        </div>
      </div>
    
  );
};

export default Create;
