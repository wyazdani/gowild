import {React, useState} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import PhoneInput from 'react-phone-number-input';
import classes from "../../treasureHuntRegistration/index.module.scss";
import card1 from "../../../Images/card1.jpg";
import card2 from "../../../Images/card2.jpg";




const ViewProfilePopup = (props) => {
    const [value, setValue] = useState();

    return(
        <>
            <Modal
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Button variant="close" onClick={props.onHide}><i className={"fal fa-times"}></i> </Button>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <div className={classes.box}>
                                    <h3 className={"font-20 text-orange mb-3"}>Perosnal Data</h3>
                                    <Row>
                                        <Col md={12} className={"mb-3"}>
                                            <Form.Label className={"text-orange mb-0"}>Event Name</Form.Label>
                                            <Form.Control className={"bottom-border"} type="text" placeholder="Event Name" />
                                        </Col>
                                        <Col md={12} className={"mb-3"}>
                                            <Form.Label className={"text-orange mb-0"}>First Name</Form.Label>
                                            <Form.Control className={"bottom-border"} type="text" placeholder="First Name" />
                                        </Col>
                                        <Col md={12} className={"mb-3"}>
                                            <Form.Label className={"text-orange mb-0"}>Last Name</Form.Label>
                                            <Form.Control className={"bottom-border"} type="text" placeholder="Last name" />
                                        </Col>
                                        <Col md={12} className={"mb-3"}>
                                            <Form.Label className={"text-orange mb-0"}>Phone Number</Form.Label>
                                            <PhoneInput
                                                placeholder="Phone Number"
                                                className={"bottom-border"}
                                                defaultCountry="CA"
                                                international
                                                countryCallingCodeEditable={false}
                                                value={value}
                                                onChange={setValue}/>
                                        </Col>
                                        <Col md={12} className={"mb-3"}>
                                            <Form.Label className={"text-orange mb-0"}>Gender</Form.Label>
                                            <Form.Select className={"bottom-border"}>
                                                <option>Male</option>
                                                <option>Female</option>
                                            </Form.Select>

                                        </Col>
                                        <Col md={12} className={"mb-3"}>
                                            <Form.Label className={"text-orange mb-0"}>Date of Birth</Form.Label>
                                            <Form.Control className={"bottom-border"} type="date" placeholder="00/00/0000" />
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className={`${classes.box} h-100`}>
                                    <div className={classes.imgBox}>
                                        <img src={card1} alt={"card1"} />
                                    </div>
                                    <div className={classes.imgBox}>
                                        <img src={card2} alt={"card2"} />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Modal.Footer>
                            <Button variant="danger" onClick={props.onHide}>Close</Button>
                            <Button variant="success" onClick={props.onHide}>Save changes</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ViewProfilePopup;