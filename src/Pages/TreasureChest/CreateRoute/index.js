import { React, useState, useEffect } from "react";
import PageTitle from "../../../Components/Pagetitle";
import { Button, Col, Form, Row } from "react-bootstrap";
import map1 from "Images/map1.jpg";
import rectangle from "Images/Rectangle.png";
import img2 from "Images/chestcpAsset .png";
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
    const [uploadFile, setUploadFile] = useState({});



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
        try {
            // First API call
            const dataObj = {
                "title": formData.title,
                "description": formData.description,
                "location": {
                    "latitude": JSON.parse(formData.latitude),
                    "longitude": JSON.parse(formData.longitude)
                },
                "eventDate": formData.date,
                "eventTime": formData.time,
                "no_of_participants": formData.number,
                "picture": formData.picture
            }
            const res = await AuthService.postMethod(`${ENDPOINT.treasure_chests.listing}`, true, dataObj);

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
            // setFormData("");
            // event.target.reset();
            console.log(res.data);
            const dataArray = new FormData();
            dataArray.append("file", uploadFile.uploadFile);
            const res2 = await AuthService.postMethod(`${ENDPOINT.treasure_chests.update_picture}${res.data.id}/update-picture`, true, dataArray, false, true);
            setTimeout(() => {
                navigate('/treasure-chests-list');
            }, 1000);
            console.log("res2", res2.data);
        } catch (err) {
            swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
        }
    };



    function uploadSingleFile(e) {
        // setUploadFile(e.target.files[0])
        setUploadFile({ uploadFile: e.target.files[0] })
        console.log("uploadFile", e.target.files[0])

        let ImagesArray = Object.entries(e.target.files).map((e) =>
            URL.createObjectURL(e[1])
        );
        console.log(ImagesArray);
        setFile([...file, ...ImagesArray]);
        // console.log("file", file);
    }


    function deleteFile(e) {
        const s = file.filter((item, index) => index !== e);
        setFile(s);
        console.log(s);
    }


    // const date = new Date();
    // const utcDate = date.toISOString();
    // const eventDate = { "eventDate": `${utcDate}` };
    // console.log(eventDate);



    return (
        <>
            <PageTitle title="Normal Route" />
            <section className={"section treasure_chests"}>
                <Form onSubmit={submitForm}>
                    <Row>
                        <Col md={4}>

                            <Form.Group>
                                <Form.Label><b>Title</b></Form.Label>
                                <Form.Control type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className={"mb-3"} placeholder="First On The List" />
                                <Form.Label><b>Description</b></Form.Label>
                                <Form.Control as="textarea" type="text"
                                    name="description"
                                    required
                                    value={formData.description}
                                    onChange={handleChange}
                                    className={"mb-3"} placeholder="Write something here ..." />
                                <Form.Label><b>Treasure Location</b></Form.Label>
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
                                        <Col md={8}>
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Group>
                                                        <Form.Label className="mt-3"><b>Sponsors</b></Form.Label>
                                                        <div className="d-flex">
                                                            <img src={rectangle} width="20%" alt="" />
                                                            <Form.Control type="text" className={"mb-1 ms-2 mb-md-2"} placeholder="🔗 www.redbull.com" style={{ marginBottom: '0px !important' }} />

                                                        </div>

                                                    </Form.Group>
                                                </Col>
                                                <Col md={5}>
                                                    <Form.Group>
                                                        <Form.Label><b>Event Date</b></Form.Label>
                                                        <Form.Group>
                                                            <Form.Control type="date"
                                                                name="date"
                                                                value={formData.date}
                                                                onChange={handleChange}
                                                                className={"mb-1"} />
                                                        </Form.Group>
                                                    </Form.Group>

                                                </Col>
                                                <Col md={1}>
                                                </Col>
                                                {/* <Col md={2}>
                                            <Form.Group>
                                               <p className="sponser">add <br /> image</p>
                                            </Form.Group>
                                        </Col> */}
                                                <Col md={6}>
                                                    <Form.Group className="mt-2">
                                                        <div className="d-flex">
                                                            <p className="sponser">add <br /> image</p>
                                                            <Form.Control type="text" className={"ms-2 mb-0"} placeholder="🔗 link" />
                                                        </div>
                                                        <p className="mb-0 float-right addMore">Add more</p>

                                                    </Form.Group>
                                                </Col>
                                                <Col md={5}>
                                                    <Form.Group>
                                                        <Form.Label><b>Time</b></Form.Label>
                                                        <Form.Control type="time"
                                                            name="time"
                                                            required
                                                            value={formData.time}
                                                            onChange={handleChange}
                                                            className={"mb-3"} />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={1}>
                                                </Col>
                                                <Col md={6}>
                                                </Col>
                                                <Col md={5}>

                                                    <Form.Group>
                                                        <Form.Label><b>Number of participants</b></Form.Label>
                                                        <Form.Control type="number"
                                                            name="number"
                                                            min="1"
                                                            //  max="20"
                                                            value={formData.number}
                                                            onChange={handleChange}
                                                            className={"mb-3"} placeholder="200" />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Label className="d-flex "><b>Upload Augmented Reality</b></Form.Label>
                                            <label className={"treasureChest_img"} htmlFor="upload-photo">
                                               <img src={img2} width="85%" alt="" />
                                            </label>
                                            <Form.Label className="d-flex mt-4 mb-0 "><b>Upload Thumbnail</b></Form.Label>
                                            <label className={"fileUpload v2 mb-0"} htmlFor="upload-photo">
                                                <Form.Control
                                                    type="file"
                                                    name="file"
                                                    id={"upload-photo"}
                                                    // value={formData.picture}
                                                    disabled={file.length === 1}
                                                    className="mt-4"
                                                    // onChange={handleChange}
                                                    onChange={uploadSingleFile}
                                                />
                                                {/* <span>Attach images of thumbnail</span> */}
                                            </label>
                                            {/* preview image */}
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
                                <Col md={4}>
                                    <Row>

                                        <Col md={12} className={"mb-3"}>
                                            <div className="form-group previewBox">

                                            </div>
                                        </Col>

                                    </Row>
                                </Col>
                                <Form.Group style={{ width: "55%" }}>
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