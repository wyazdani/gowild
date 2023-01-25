import { React, useState , useEffect } from "react";
import PageTitle from "../../../Components/Pagetitle";
import { Button, Col, Form, Row } from "react-bootstrap";
import map1 from "Images/map1.jpg";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import GoogleMaps from "./GoogleMap";




const CreateRoute = () => {

    const navigate = useNavigate();

    const [file, setFile] = useState([]);
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({});
    const [historicalData, setHistoricalData] = useState({});
    const [uploadFile, setUploadFile] = useState();
    const [showButton, setShowButton] = useState(false);
    // store id when user submit form
    const [id, setId] = useState();
    console.log("id", id)


    const handleChange = (event) => {
        let name = event.target.name;
        const value = event.target.value;
        // const value = event.target.value.replace(/\D/g, "");
        // const value = event.target.value.replace(/(0|)\D/g, "");
        setFormData((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                [name]: value
            }
        })
    }


    const submitForm = async (event) => {
        event.preventDefault();
        const dataObj =   {

            "title": formData.title,
            "description": formData.description,
            "start": {
              "latitude": JSON.parse(formData.startLattitude),
              "longitude": JSON.parse(formData.startLongtitude)
            },
            "end": {
              "latitude": JSON.parse(formData.endLattitude),
              "longitude": JSON.parse(formData.endLongtitude)
            },
            "picture": formData.picture,
            "distance_miles": 34,
            "distance_meters": 600,
            "estimate_time": "1h 14m"
          }

        return  AuthService.postMethod(ENDPOINT.admin_route.listing, true, dataObj)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Form data submitted successfully', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
                console.log(res);
                setId(res.data.id)
                setShowButton(true)
                // navigate('/route-list');
                setFormData("");
                // event.target.reset();
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });

    };


    // add historical event

       
    const handleHistorical = (event) => {
        let name = event.target.name;
        const value = event.target.value;
        setHistoricalData((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                [name]: value
            }
        })
    }

    
    const submitEventForm = async (event) => {
        console.log("1233"+id);
        // console.log("historicalData" , historicalData);
        event.preventDefault();
        const dataObj = {
            "historical_event": {
                "latitude": JSON.parse(historicalData.lattitude),
                "longitude": JSON.parse(historicalData.longtitude),
            },
            "title": historicalData.title,
            "subtitle": historicalData.subTitle,
            "description": historicalData.description
        }

        return  AuthService.postMethod(ENDPOINT.historical_event.add_event+id, true, dataObj)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('Historical Event Routes submitted Successfully!', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
                console.log(res);
                // navigate('/route-list');
                // setFormData("");
                // event.target.reset();
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });

    };
    

    // const submitForm = async (id) => {
    //     id.preventDefault();
    //     const dataArray = new FormData();
    //     dataArray.append("csv", uploadFile[0]);
    //     return  AuthService.postMethod(ENDPOINT.admin_route.update_pictures, true, dataArray)
    //     .then((res) => {          
    //         console.log(res);
    //         // navigate('/route-list');
    //         // setFormData("");
    //         // event.target.reset();
    //     })
    //     .catch((err) => {
    //         swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
    //     });
    // };

    // useEffect(() => {
    //     submitForms();
    // }, [])
    

    function uploadSingleFile(e) {
        setUploadFile(e.target.files[0])
        let ImagesArray = Object.entries(e.target.files).map((e) =>
            URL.createObjectURL(e[1])
        );
        console.log(ImagesArray);
        setFile([...file, ...ImagesArray]);
        console.log("file", file);
    }

    function uploadSingleFile1(e) {
        let ImagesArray = Object.entries(e.target.files).map((e) =>
            URL.createObjectURL(e[1])
        );
        console.log(ImagesArray);
        setFile([...files, ...ImagesArray]);
        console.log("files", files);
    }

    function upload(e) {
        e.preventDefault();
        console.log(file);
    }

    function deleteFile(e) {
        const s = file.filter((item, index) => index !== e);
        setFile(s);
        console.log(s);
    }

    return (
        <>
            <PageTitle title="Normal Route" />
            <section className={"section"}>
                <Row>
                    <Col md={4}>
                        <div className={"py-3"}>
                            <p><i className={"fas fa-map-marker-alt text-dark mx-3"}></i> Starting Point</p>
                            <p><i className={"fas fa-map-marker-alt text-danger mx-3"}></i> Finishing Point</p>
                            <p><i className={"fas fa-map-marker-alt text-yellow mx-3"}></i> Historical Event</p>
                        </div>
                        <Form onSubmit={submitForm}>
                            <Form.Group>
                                <Form.Label>Starting Point</Form.Label>
                                <Form.Control type="text"
                                    name="startLongtitude"
                                    required
                                    value={formData.startLongtitude}
                                    onChange={handleChange}
                                    className={"mb-3"} placeholder="Longtitude" />
                                <Form.Control type="text"
                                    name="startLattitude"
                                    required
                                    value={formData.startLattitude}
                                    onChange={handleChange}
                                    className={"mb-3"} placeholder="Lattitude" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>End Point</Form.Label>
                                <Form.Control type="text"
                                    name="endLongtitude"
                                    required
                                    value={formData.endLongtitude}
                                    onChange={handleChange}
                                    className={"mb-3"} placeholder="Longtitude" />
                                <Form.Control type="text"
                                    name="endLattitude"
                                    required
                                    value={formData.endLattitude}
                                    onChange={handleChange}
                                    className={"mb-3"} placeholder="Lattitude" />
                            </Form.Group>
                            <Col md={12} className={"mb-3"}>
                                        <label className={"fileUpload v2"} htmlFor="upload-photo">
                                            <Form.Control
                                                type="file"
                                                id={"upload-photo"}
                                                value={formData.picture}
                                                disabled={file.length === 1}
                                                className=""
                                                onChange={uploadSingleFile}
                                            />
                                            <span>Attach images of thumbnail</span>
                                        </label>

                                    </Col>
                                    <Col md={12} className={"mb-3"}>
                                        <div className="form-group previewBox">
                                            {file.length > 0 &&
                                                file.map((item, index) => {
                                                    return (
                                                        <div className={"preview"} key={item}>
                                                            <img src={item} alt="" />
                                                            <Button type="button" onClick={() => deleteFile(index)}>
                                                                <i className={"fal fa-times"}></i>
                                                            </Button>
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </Col>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className={"mb-3"} placeholder="My Race Title" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" type="text"
                                    name="description"
                                    required
                                    value={formData.description}
                                    onChange={handleChange}
                                    className={"mb-3"} placeholder="Write something here ..." />
                            </Form.Group>
                            <Form.Group>
                                <Button type="submit" className={"w-100"}>Save</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md={8}>
                        {/* <div className={"img-box"}>
                            <img src={map1} alt={"img"} />
                        </div> */}
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16821.829686653797!2d74.27623355730282!3d31.475672333592822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919023103af0bf3%3A0xc69a4d92168bdf89!2sDoctors%20Hospital%20%26%20Medical%20Center!5e0!3m2!1sen!2s!4v1673965953749!5m2!1sen!2s" width="100%" height="650"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>  */}
                        <iframe
                            width="100%"
                            height="80%"
                            loading="lazy"
                            allowfullscreen
                            referrerpolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAoyevYqWkjKEJjq6vPXzfhulxkIecZhX0
                            &q=Space+Needle,Seattle+WA">
                        </iframe>
                  {/* <GoogleMaps /> */}
                  
                    </Col>
                    
                </Row>
                <Row>
                    <Col md={12}>
                        <div className={"d-md-flex item-center-between pt-5"}>
                            <h3 className={"my-2 fw-bold"}>Historical</h3>
                            <Button><i className={"fal fa-plus"}></i> Add Historical</Button>
                        </div>
                        <hr />
                        <Form onSubmit={submitEventForm}>
                        <Row>                        
                                <Col md={8}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Historical Event</Form.Label>
                                                <Form.Control type="text" className={"mb-3 mb-md-5"}
                                                    name="longtitude"
                                                    required
                                                    value={historicalData.longtitude}
                                                    onChange={handleHistorical}
                                                    placeholder="Longtitude" />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Control type="text" className={"mb-3"}
                                                    name="lattitude"
                                                    required
                                                    value={historicalData.lattitude}
                                                    onChange={handleHistorical}
                                                    placeholder="Lattitude" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control type="text" className={"mb-3"}
                                                    name="title"
                                                    required
                                                    value={historicalData.title}
                                                    onChange={handleHistorical}
                                                    placeholder="Historical Item" />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Sub-Title</Form.Label>
                                                <Form.Control type="text" className={"mb-3"}
                                                    name="subTitle"
                                                    required
                                                    value={historicalData.subTitle}
                                                    onChange={handleHistorical}
                                                    placeholder="Write something here..." />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control as="textarea" className={"mb-3"}
                                                    name="description"
                                                    required
                                                    value={historicalData.description}
                                                    onChange={handleHistorical}
                                                    placeholder="Write something here..." />
                                            </Form.Group>
                                        </Col>

                                    </Row>

                                </Col>
                                <Col md={4}>
                                    <Row>
                                        <Col md={12} className={"mb-3"}>
                                            <label className={"fileUpload v2"} htmlFor="upload-photo">
                                                <Form.Control
                                                    type="file"
                                                    id={"upload-photo"}
                                                    disabled={files.length === 1}
                                                    className=""
                                                    onChange={uploadSingleFile1}
                                                />
                                                <span>Attach Images</span>
                                            </label>

                                        </Col>
                                        <Col md={12} className={"mb-3"}>
                                            <div className="form-group previewBox">
                                                {files.length > 0 &&
                                                    files.map((item, index) => {
                                                        return (
                                                            <div className={"preview"} key={item}>
                                                                <img src={item} alt="" />
                                                                <Button type="button" onClick={() => deleteFile(index)}>
                                                                    <i className={"fal fa-times"}></i>
                                                                </Button>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        </Col>
                                        <Col md={12} className={"mb-3 text-center"}>
                                            <button
                                                type="button"
                                                className="btn btn-primary btn-block w-50"
                                                onClick={upload}
                                            >
                                                Upload
                                            </button>
                                        </Col>

                                    </Row>
                                </Col>
                                <Col md={12} className={"mb-3 text-center"}>
                                    <Form.Group>
                                   {showButton ? <Button type="submit" className={"mt-3"} style={{ width: "25%" }}>Save</Button> : ""}     
                                    </Form.Group>
                                </Col>
                         
                        </Row>
                        </Form>
                    </Col>
                </Row>

                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </section>
        </>
    )
}

export default CreateRoute;