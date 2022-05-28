import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { async } from '@firebase/util'
import Swal from 'sweetalert2'

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
        console.log(autos)
    }

    //Eliminar
    const deleteAuto = async (id) =>{
        const AutoDoc = doc(db, "Autos", id)
        await deleteDoc(AutoDoc)
        getAutos() 

    }


    //Confirmación de eliminación

    //Usando useEffect
    useEffect(() => {
        getAutos()

    }, [])

    //Se muestran los componentes


  return (
      <>
      <div className='container'>
          <div className='row'>
              <div className='col'>
                  <div className='d-grid gap-2'>
                      <Link to='/create' className='btn btn-secondary mt-2 mb-2'>Create</Link>
                  </div>
                  <table className='table table-link-dark table-hover'>
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
                                          <button onClick={() => {deleteAuto(index.id)}} className='btn btn-danger'><i className="fa-solid fa-trash-can"></i></button>

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