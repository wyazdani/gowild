import { React, useState } from "react";
import PageTitle from "../../../Components/Pagetitle";
import { Button, Col, Form, Row } from "react-bootstrap";
import map1 from "Images/map1.jpg";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// °

const CreateRoute = () => {
    const [file, setFile] = useState([]);
    const [formData, setFormData] = useState({});


    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;
        setFormData((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                [name]: value
            }
        })
    }


    const submitForm = async (event) => {
        event.preventDefault();
        const dataObj = {
            "title": formData.title,
            "description": formData.description,
            "start": {
                "latitude": formData.startLattitude,
                "longitude": formData.startLongtitude
            },
            "saved": true,
            "end": {
                "latitude": formData.endLattitude,
                "longitude": formData.endLongtitude
            }
        }

        return await AuthService.postMethod(ENDPOINT.admin_route.listing, true, dataObj)
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
                setFormData("");
                event.target.reset();
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });

    };


    function uploadSingleFile(e) {
        let ImagesArray = Object.entries(e.target.files).map((e) =>
            URL.createObjectURL(e[1])
        );
        console.log(ImagesArray);
        setFile([...file, ...ImagesArray]);
        console.log("file", file);
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
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className={"mb-3"} placeholder="My Race Title" />
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
                        <div className={"img-box"}>
                            <img src={map1} alt={"img"} />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div className={"d-md-flex item-center-between pt-5"}>
                            <h3 className={"my-2 fw-bold"}>Historical</h3>
                            <Button><i className={"fal fa-plus"}></i> Add Historical</Button>
                        </div>
                        <hr />
                        <Row>
                            <Col md={8}>
                                <Form>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Historical Event</Form.Label>
                                                <Form.Control type="text" className={"mb-3 mb-md-5"} placeholder="Longtitude" />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Control type="text" className={"mb-3"} placeholder="Lattitude" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control type="text" className={"mb-3"} placeholder="Historical Item" />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Sub-Title</Form.Label>
                                                <Form.Control type="text" className={"mb-3"} placeholder="Write something here..." />
                                            </Form.Group>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Group>
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control as="textarea" className={"mb-3"} placeholder="Write something here ..." />
                                            </Form.Group>
                                        </Col>

                                    </Row>

                                </Form>
                            </Col>
                            <Col md={4}>
                                <Row>
                                    <Col md={12} className={"mb-3"}>
                                        <label className={"fileUpload v2"} htmlFor="upload-photo">
                                            <Form.Control
                                                type="file"
                                                id={"upload-photo"}
                                                disabled={file.length === 1}
                                                className=""
                                                onChange={uploadSingleFile}
                                            />
                                            <span>Attach Images</span>
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
                        </Row>
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