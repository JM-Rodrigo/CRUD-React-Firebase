import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebase/firebase'
import Swal from 'sweetalert2'
import logo from '../img/logobn.png'


const Show = () => {
    //Configurando los hooks
    const [autos, setAutos] = useState( [] )

    //Referencia a la BD
    const autosCollection = collection(db,'Autos')

    //Mostrar los datos
    const getAutos = async () => {
        const data = await getDocs(autosCollection)
       
        setAutos(
            data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
        )
        //console.log(autos)
    }

    //Eliminar
    const deleteAuto = async (id) =>{
        const AutoDoc = doc(db, "Autos", id)
        await deleteDoc(AutoDoc)
        getAutos() 

    }


    //Confirmación de eliminación

    const confirmDelete = (id) =>{

        Swal.fire({
            title: '¿Deseas eliminar?',
            text: "Se eliminará el registro!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, deseo eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteAuto(id)
              Swal.fire(
                'Eliminado!',
                'Has eliminado el registro',
                'Exitosamente'
              )
            }
          })
          
      }

    //Usando useEffect
    useEffect(() => {
        getAutos()
    }, [])

    //Se muestran los componentes


  return (
      <>
      <div className='container mt-2'>
      <img src={logo} alt="img" width="1250" height="200" />

          <div className='row'>
                <div className='col'>
                    <h5>Crea un nuevo registro: </h5>
                  <div className='d-grid gap-2'>
                      <Link id= 'btn-create'to='/create' className='btn btn-success mt-2 mb-2'>Añadir</Link>
                  </div>
                 
                  <table className='table table-borderless mt-4'>
                      <thead>
                          <tr>
                              <th>Nombre</th>
                              <th>Marca</th>
                              <th>Modelo</th>
                              <th>Acciones</th>
                          </tr> 
                      </thead>
                      <tbody>
                          {
                              autos.map((index)=>(
                                  <tr key={index.id}>
                                      <td>{index.Nombre}</td>
                                      <td>{index.Marca}</td>
                                      <td>{index.Modelo}</td>
                                      <td>
                                          <Link to={`/edit/${index.id}`} className='btn btn-light'><i className="fa-solid fa-pen"></i></Link>
                                          <button  onClick={() => {confirmDelete(index.id)}} className='btn btn-danger mx-2'><i className="fa-solid fa-trash-can"></i></button>

                                      </td>

                                  </tr>
                              ))
                          }
                      </tbody>


                  </table>
              </div>

          </div>
      </div>

      </>
  )
}

export default Show