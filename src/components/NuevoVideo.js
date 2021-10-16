import React, { Fragment, useState } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom'
import clienteAxios from '../config/axios';
import Nav from './Nav';

const NuevoVideo = () => {

    const [file, setFile] = useState();
    const [redirect, setRedirect] = useState(false);
    //crear un objeto para el state
    const [data, setData] = useState({
        title: '',
        author: '',
        description: '',
        category: '',
        tags: '',
        videoURL: '',
        createdAt: ''

    });

    //Leer los datos del form
    const actualizarState = e => {

        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const handleChange = e => {
        setFile(e.target.files[0])
    }

    //Enviar una petición al API
    const crearNuevoVideo = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('videoURL', file);
        formData.append('title', data.title)
        formData.append('author', data.author)
        formData.append('description', data.description)
        formData.append('category', data.category)

        //Solicitar el guardado del video en el back
        await clienteAxios.post('/videos', formData) //el segundo parámetro es lo que quiere agregar
            .then(respuesta => {
                console.log('respuesta final sebas?', respuesta);
                //redireccionar
                setRedirect(true);
                //props.history.push('/')
            })
    }

    if (redirect) {
        return <Redirect to={'/videos'} />
    }
    const filter = console.log("Acción no permitida")

    return (
        <Fragment>
            <Nav filter={filter} />
            <div className="videos-upload">
                <div className="container pt-5">
                    <div className="row">

                        <div className="col-md-8 max-auto ">
                            <form
                                onSubmit={crearNuevoVideo}
                                className="bg-white p-5 bordered"
                                multiple
                                encType="multipart/form-data">
                                <div className="form-group">
                                    <label>Seleccione un archivo</label>
                                    <input
                                        type="file"
                                        name="videoURL"
                                        id="videoURL"
                                        className="form-control"
                                        onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="title">Nombre del video</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="title"
                                        name="title"
                                        placeholder="Nombre del Video"
                                        onChange={actualizarState}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="author">Autor</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="author"
                                        name="author"
                                        placeholder="Nombre del Autor"
                                        onChange={actualizarState}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category">Categoría</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="category"
                                        name="category"
                                        placeholder="Categoría"
                                        onChange={actualizarState}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="description">Descripción</label>
                                    <textarea
                                        className="form-control"
                                        name="description"
                                        rows="6"
                                        onChange={actualizarState}
                                    ></textarea>
                                </div>


                                <input type="submit" className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold" value="Subir video" />
                            </form>
                        </div>

                        <div className="col-md-4 max-auto ">
                            <video src={data.videoURL} width="300" height="200" controls />

                        </div>
                    </div>

                </div>
            </div>

        </Fragment>
    );
}

export default withRouter(NuevoVideo);