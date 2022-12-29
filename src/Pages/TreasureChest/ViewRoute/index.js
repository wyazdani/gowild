import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import classes from "../index.module.scss";
import AuthService from "../../../services/auth.service";
import { ENDPOINT } from "../../../config/constants";
import swal from "sweetalert";
import { Formik } from 'formik';
import { object, string } from 'yup';
import { useNavigate } from "react-router-dom";
import map1 from "Images/map1.jpg";
import rectangle from "Images/Rectangle.png";
import moment from 'moment';

    const ViewTreasure = (props) => {


    const [file, setFile] = useState([]);

    /* Logging the props.viewItem to the console ... all data base on id seprate. */
    console.log(props.viewItem)

    if (props.viewItem === null) {
    return "";
    }


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

    // convert date format to month / day / year
    function formatDate(date) {

    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2)
    month = '0' + month;
    if (day.length < 2)
    day = '0' + day;

    return [month, day, , year].join('/');
    }


    return (
    <>
    <Modal
    {...props}
    size="xl"
    aria-labelledby="contained-modal-title-vcenter"
    >
    <Button variant="close" onClick={props.onHide}><i className={"fal fa-times"}></i> </Button>
    <Modal.Body>
    <Formik
        initialValues={{
            title: props.viewItem.title,
            description: props.viewItem.description,
            latitude: props.viewItem.location.latitude,
            longitude: props.viewItem.location.longitude,
            eventDate: props.viewItem.eventDate,
            "eventTime": props.viewItem.eventTime,
            "status": "pending",
            "no_of_participants": props.viewItem.no_of_participants,
            "a_r": "augmented reality"
        }}
    >
        {({
          
            handleChange,
            values,
            touched,
            isValid,
            errors,
        }) => (
            <section className={"section"}>
                <Form>
                    <Row>
                        <Col md={4}>

                            <Form.Group>
                                <Form.Label className="mb-3"> <b>Title</b> </Form.Label>
                                <p className={"mb-5"} > {values.title} </p>
                                <Form.Label><b>Description</b></Form.Label>
                                <p className={"mb-4"}>
                                    {values.description}
                                </p>
                                <Form.Label><b>Treasure Location</b></Form.Label>
                                <p className={"my-4"}>{values.latitude}</p>
                                <p className={"mb-4"}>{values.longitude}</p>

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
                                                <Form.Label className="mt-3"><b>Event Date</b></Form.Label>
                                                <Form.Group>

                                                    <p className={"mb-3"}>
                                                        {(formatDate(values.eventDate))}
                                                    </p>

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
                                                <Form.Label className="mt-3"><b>Time</b></Form.Label>
                                                <p className={"mb-3"}>
                                                    {values.eventTime}
                                                </p>
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>

                                            <Form.Group>
                                                <Form.Label className="mt-3"><b>Number of participants</b></Form.Label>
                                                <p className={"mb-3"}>
                                                    {values.no_of_participants}
                                                </p>
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
                            </Row>
                        </Col>
                    </Row>
                </Form>





            </section>
        )}
    </Formik>

    </Modal.Body>
    </Modal>
    </>
    )
}

export default ViewTreasure;