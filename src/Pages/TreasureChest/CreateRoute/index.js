import { React, useState, useEffect } from "react";
import PageTitle from "../../../Components/Pagetitle";
import { Button, Col, Form, Row } from "react-bootstrap";
import map1 from "Images/map1.jpg";
import rectangle from "Images/Rectangle.png";
import { ENDPOINT, KEY } from "config/constants";
import AuthService from "services/auth.service";
import accessHeader from "services/headers/access-header";
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
// °

const CreateTreasure = () => {

    const navigate = useNavigate();

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
            "location": {
                "latitude": JSON.parse(formData.latitude),
                "longitude":  JSON.parse(formData.longitude) 
            },
            "eventDate": formData.date,
            "eventTime": "string",
            "no_of_participants": formData.number
        }

        return await AuthService.postMethod(ENDPOINT.treasure_chests.listing, true, dataObj)
            .then((res) => {
                if (res.status === 201) {
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
                navigate('/treasure-chests-list');
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
                <Form onSubmit={submitForm}>
                    <Row>
                        <Col md={4}>

                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className={"mb-3"} placeholder="First On The List" />
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" type="text"
                                    name="description"
                                    required
                                    value={formData.description}
                                    onChange={handleChange}
                                    className={"mb-3"} placeholder="Write something here ..." />
                                <Form.Label>Treasure Location</Form.Label>
                                <Form.Control type="text"
                                    name="latitude"
                                    required
                                    value={formData.latitude}
                                    onChange={handleChange}
                                    className={"mb-3"} placeholder="65.5234°" />
                                <Form.Control type="text"
                                    name="longitude"
                                    required
                                    value={formData.longitude}
                                    onChange={handleChange}
                                    className={"mb-3"} placeholder="1.12378°" />
                            </Form.Group>

                        </Col>
                        <Col md={8}>
                            <div className={"img-box"}>
                                <img src={map1} alt={"img"} />
                            </div>
                        </Col>

                        <Col md={12}>
                            <div className={"pt-5"}>
                            </div>
                            <Row>
                                <Col md={12}>
                                    <Row>
                                        <Col md={2}>
                                            <Form.Group>
                                                <h6>Sponsors</h6>
                                                <img src={rectangle} width="50%" alt="" />
                                            </Form.Group>

                                        </Col>
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label className="mt-3"></Form.Label>
                                                <Form.Control type="text" className={"mb-3 mb-md-5"} placeholder="🔗 www.redbull.com" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label>Event Date</Form.Label>
                                                <Form.Group>

                                                    <Form.Control type="date"
                                                    name="date"
                                                    value={formData.date}
                                                     onChange={handleChange}
                                                     className={"mb-3"} />
                                                </Form.Group>
                                            </Form.Group>

                                        </Col>

                                        <Col md={4}>
                                            <Form.Label>upload Augmented Reality</Form.Label>
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
                                        <Col md={2}>
                                            <Form.Group>

                                                <Form.Control type="text" className={"mb-3 mt-4"} placeholder="🔗 link" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group>
                                                <Form.Label>Time</Form.Label>
                                                <Form.Control type="number" className={"mb-3"} placeholder="00:00" />
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>

                                            <Form.Group>
                                                <Form.Label>Number of participants</Form.Label>
                                                <Form.Control type="number"
                                                name="number"
                                                value={formData.number}
                                                     onChange={handleChange}
                                                 className={"mb-3"} placeholder="200" />
                                            </Form.Group>
                                        </Col>
                                    </Row>


                                </Col>
                                <Col md={4}>
                                    <Row>

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

                                    </Row>
                                </Col>
                                <Form.Group className={"text-center"} style={{ width: "40%" }}>
                                    <Button type="submit" className={"w-50 my-4 m-auto"}>Submit</Button>
                                </Form.Group>
                            </Row>
                        </Col>
                    </Row>
                </Form>


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

export default CreateTreasure;