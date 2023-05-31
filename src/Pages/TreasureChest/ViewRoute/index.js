import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import rectangle from "Images/Rectangle.png";
import img2 from "Images/chestcpAsset .png";
import RouteMap from "../../RoutelistPage/RouteMap";
import {imageUrl} from "../../../Helper/Helpers";
import RouteMapBox from "../../RoutelistPage/MapBox";



const ViewTreasure = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState(null);

    const [file, setFile] = useState([]);



    if (props.viewItem === null) {
        return "";
    }
    const marker = [[props.viewItem.location.longitude,props.viewItem.location.latitude]]
    const center = [props.viewItem.location.longitude,props.viewItem.location.latitude]
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
                    <section className={"section"}>
                        <Form>
                            <Row className="backGroundColor">
                                <Col md={4}>
                                    <Form.Group className={'mb-3'}>
                                        <Form.Label> <b>Title</b> </Form.Label>
                                        <Form.Control disabled value={props.viewItem.title} style={{border:'none'}} />
                                    </Form.Group>
                                    <Form.Group className={'mb-3'}>
                                        <Form.Label><b>Description</b></Form.Label>
                                        <Form.Control as={"textarea"}
                                                      disabled value={props.viewItem.description}
                                                      style={{border:'none'}}
                                        />
                                    </Form.Group>
                                    <Form.Group className={'mb-3'}>
                                        <Form.Label><b>Treasure Location</b></Form.Label>
                                        <Form.Control className={'mb-2'} disabled value={props.viewItem.location.latitude} style={{border:'none'}}  />
                                        <Form.Control disabled value={props.viewItem.location.longitude} style={{border:'none'}}  />
                                    </Form.Group>
                                </Col>
                                <Col md={8}>

                                    <div className={"img-box"}>
                                        <Col md={8}>
                                            <div className={"img-box"}>
                                                <RouteMapBox
                                                    coordinates={marker}
                                                    zoom={15}
                                                    center={center}
                                                />
                                            </div>
                                        </Col>
                                    </div>
                                </Col>

                                <Col md={12}>

                                    <Row>
                                        <Col md={12}>
                                            <Row>
                                                <Col md={8}>
                                                    <Row>
                                                        <Col md={6}>
                                                            <Form.Group>
                                                                <Form.Label className="mt-3"><b>Sponsors</b></Form.Label>
                                                                    {props.viewItem?.sponsor.map((formData, index) => (
                                                                        <div key={index} className="d-flex">
                                                                            <img src={imageUrl(formData.img,rectangle)} width="20%" alt={"img"} />
                                                                            <Form.Control disabled type="text" className={"mb-1 ms-2 mb-md-2"}
                                                                                          value={formData.link}
                                                                                          placeholder="🔗 www.redbull.com" style={{ marginBottom: '0px !important',border:'none' }} />
                                                                        </div>

                                                                    ))}
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={5}>
                                                            <Form.Group>
                                                                <Form.Label className="mt-3"><b>Event Date</b></Form.Label>
                                                                <Form.Group>
                                                                    <p className={"mb-3"}>
                                                                        {(formatDate(props.viewItem.eventDate))}
                                                                    </p>
                                                                </Form.Group>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={1}>
                                                        </Col>
                                                        <Col md={6}>
                                                        </Col>
                                                        <Col md={5}>
                                                            <Form.Group>
                                                                <Form.Label className="mt-3"><b>Time</b></Form.Label>
                                                                <p className={"mb-3"}>
                                                                    {props.viewItem.eventTime}
                                                                </p>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col md={1}>
                                                        </Col>
                                                        <Col md={6}>
                                                        </Col>
                                                        <Col md={5}>

                                                            <Form.Group>
                                                                <Form.Label className="mt-3"><b>Number of participants</b></Form.Label>
                                                                <p className={"mb-3"}>
                                                                    {props.viewItem.no_of_participants}
                                                                </p>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col md={4}>

                                                    <Form.Label className="d-flex  mt-3"><b>Upload Augmented Reality</b></Form.Label>
                                                    <label className={"treasureChest_img"} htmlFor="upload-photo">
                                                        <img src={img2} width="85%" alt="" />
                                                    </label> <br />
                                                    <Form.Label className="mt-2"><b>Uploaded Thumbnail</b></Form.Label>
                                                    <p className="text-danger"> {error}</p>
                                                    <img src={imageUrl(props.viewItem.picture)} width="70%" alt={"img"} />
                                                    {/* <img src={values.picture} width="100%" alt="" /> */}
                                                    <p></p>

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
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    </section>

                </Modal.Body>
            </Modal>
        </>
    )
}

export default ViewTreasure;