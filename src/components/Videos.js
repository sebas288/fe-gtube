import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/axios';
import Nav from './Nav';

const Videos = () => {
    const [info, guardarInfo] = useState([]);
    const [consultar, guardarConsulta] = useState(true)
    const [data, setData] = useState(info);
    const [dinamicData, setDinamicData] = useState([]);

    useEffect(() => {
        console.log('si se ejecuto?')
        guardarConsulta(!consultar);
        if (consultar) {
            const consultarAPI = async () => {
                clienteAxios.get('/videos')
                    .then(respuesta => {
                        //poner en el state el resultado
                        guardarInfo(respuesta?.data);
                        setDinamicData(respuesta?.data);
                        console.log('cual es la respuesta?', respuesta)
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
            consultarAPI();
        }

    }, [guardarConsulta]);

    

    const [count, setCount] = useState(20)

    const settings = {
        filters: ['tags', 'title']
    };
    
    const filter = e => {
        var text = e.target.value;
        const dataOld = info;
        const newData = dataOld.filter(item => {
            let params = "";
            if (settings?.filters.length) {
                console.log(settings?.filters.length)
                settings?.filters.map(ref => {
                    params += item[ref] && item[ref].toString().toUpperCase() + " ";
                });
            }
            const campo = params;
            const textData = text.toUpperCase();
            return campo.indexOf(textData) > -1;
        });
        setDinamicData(newData);
    };


    return (
        <Fragment>
            <Nav filter={filter} />
            <div>
               {/*  <div className="categories">
                    <section className="category-section">
                        <button className="category active">All</button>
                        <button className="category">Category 1</button>
                        <button className="category">Category 2</button>
                        <button className="category">Category 3</button>
                        <button className="category">Category 4</button>
                        <button className="category">Category 5</button>
                        <button className="category">Category 6</button>
                        <button className="category">Category 7</button>
                        <button className="category">Category 8</button>
                        <button className="category">Category 9</button>
                    </section>
                </div> */}


                <div className="videos">
                    <section className="video-section">
                        {dinamicData.map(data => (
                            <div key={data._id} className="video-container">
                                <video src={data.videoURL} width="300" controls />
                                <div className="video-bottom-section">
                                    <Link to="">
                                        <img className="channel-icon" src="http://unsplash.it/36/36?gravity=center" />
                                    </Link>
                                    <div className="video-details">
                                        <Link to="" className="video-title">{data.title}</Link>
                                        <Link to="" className="video-channel-name">Channel: @{data.author}</Link>
                                        <div className="video-metadata">
                                            <span>Views {count}</span>
                                            <span> one year ago</span>
                                        </div>
                                        <div className="col-md-12 text-center">
                                            <Link className="" to="">
                                                <img src="bxs-like.svg" alt="Upload Video" />
                                            </Link>
                                            <Link className="" to="">
                                                <img src="bxs-dislike.svg" alt="Upload Video" />
                                            </Link>

                                        </div>


                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                </div>
            </div>


        </Fragment>
    );
}

export default Videos;