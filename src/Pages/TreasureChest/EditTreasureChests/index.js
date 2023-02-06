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

const EditTreasure = (props) => {

    const [addAdmin, setAddAdmin] = useState(false);


    const navigate = useNavigate();

    const [file, setFile] = useState([]);

    const schema = object().shape({
    title: string().required(),
    description: string().required(),
    latitude: string().required(),
    longitude: string().required(),
    updatedDate: string().required(),
    createdDate: string().required(),
    eventTime: string().required(),
    no_of_participants: string().required(),
    });
    console.log(props.editItem)


    const handleSubmit = async (data) => {
    // console.log("handleSubmit ~ data", data)

    ENDPOINT.treasure_chests.edit_user.id = props.editItem.id;
    return await AuthService.patchMethod(ENDPOINT.treasure_chests.edit_user.url+ENDPOINT.treasure_chests.edit_user.id, true, data)
    .then((res) => {
        setTimeout(() => {
            setAddAdmin(props.onHide);
            props.treasureChestsListData()
            // props.subAdminAllData();
          }, 1000);
        //setContent(res.data);
        //setIsLoader(true);
        console.log(res);
    })
    .catch((err) => {
        swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
    });

    }

    if (props.editItem === null) {
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

    return [month, day, year].join('/');
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
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
                "createdDate": props.editItem.createdDate,
                "updatedDate": props.editItem.updatedDate,
                title: props.editItem.title,
                description: props.editItem.description,
                latitude: props.editItem.location.latitude,
                longitude: props.editItem.location.longitude,
                eventDate: props.editItem.eventDate,
                "eventTime": props.editItem.eventTime,
                "status": "pending",
                "no_of_participants": props.editItem.no_of_participants,
                "a_r": "augmented reality",
                "winnerId": "uuid",
                "picture": "Picture",
                "a_r": "augmented reality"

            }}
        >
            {({
                handleSubmit,
                handleChange,
                values,
                touched,
                isValid,
                errors,
            }) => (
                <section className={"section"}>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                            <Col md={4}>

                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text"
                                        name="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        isValid={touched.title && !errors.title}
                                        className={"mb-3"} placeholder="First On The List" />
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" type="text"
                                        name="description"

                                        value={values.description}
                                        onChange={handleChange}
                                        isValid={touched.description && !errors.description}
                                        className={"mb-3"} placeholder="Write something here ..." />
                                    <Form.Label>Treasure Location</Form.Label>
                                    <Form.Control type="text"
                                        name="latitude"

                                        value={values.latitude}
                                        onChange={handleChange}
                                        isValid={touched.latitude && !errors.latitude}
                                        className={"mb-3"} placeholder="65.5234°" />
                                    <Form.Control type="text"
                                        name="longitude"
                                        value={values.longitude}
                                        onChange={handleChange}
                                        isValid={touched.longitude && !errors.longitude}
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
                                                            name="eventDate"
                                                            value={values.eventDate}
                                                            // value={(formatDate(values.eventDate))}
                                                            onChange={handleChange}
                                                            isValid={touched.eventDate && !errors.eventDate}
                                                            className={"mb-3"} />
                                                    </Form.Group>
                                                </Form.Group>

                                            </Col>

                                            <Col md={4}>
                                                <Form.Label>Upload Augmented Reality</Form.Label>
                                                <label className={"fileUpload v2"} htmlFor="upload-photo">
                                                    <Form.Control
                                                        type="file"
                                                        name="picture"
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
                                                    <Form.Control type="time"
                                                        name="eventTime"
                                                        value={values.eventTime}
                                                        onChange={handleChange}
                                                        isValid={touched.eventTime && !errors.eventTime}
                                                        className={"mb-3"} placeholder="00:00" />
                                                </Form.Group>
                                            </Col>
                                            <Col md={3}>

                                                <Form.Group>
                                                    <Form.Label>Number of participants</Form.Label>
                                                    <Form.Control type="number"
                                                        name="no_of_participants"
                                                        value={values.no_of_participants}
                                                        onChange={handleChange}
                                                        min="1"
                                                        isValid={touched.no_of_participants && !errors.no_of_participants}
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
                                        <Button type="submit" className={"w-50 my-4 m-auto"}>Update</Button>
                                    </Form.Group>
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

export default EditTreasure;