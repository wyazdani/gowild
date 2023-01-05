import {React, useState} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import PhoneInput from 'react-phone-number-input';
import classes from "../../../treasureHuntRegistration/index.module.scss";
import card1 from "../../../../Images/card1.jpg";
import card2 from "../../../../Images/card2.jpg";
import {ENDPOINT} from "../../../../config/constants";
import AuthService from "../../../../services/auth.service";
import swal from "sweetalert";
import { Formik } from 'formik';
import { object, string } from 'yup';




const ViewProfilePopup = (props) => {
    //const [value, setValue] = useState();
    const schema = object().shape({
        firstName: string().required(),
        lastName: string().required(),
        phoneNo: string().required(),
        birthDate: string().required(),
    });
    //console.log(props.editItem)
    const handleSubmit = async  (data) => {
        ENDPOINT.admin_user.edit_user.id = props.editItem;
        return await AuthService.patchMethod(ENDPOINT.admin_user.edit_user.url+ENDPOINT.admin_user.edit_user.id, true,data)
            .then((res) => {
                //setContent(res.data);
                //setIsLoader(true);
                console.log(res.data);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    }
    const approveUser = async  () => {
        ENDPOINT.admin_user.approve.id = props.editItem.id;
        let url = ENDPOINT.admin_user.approve.url+ENDPOINT.admin_user.approve.id+ENDPOINT.admin_user.approve.type;
        console.log(url)
        return ;
        return await AuthService.postMethod(url, true)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    }
    const rejectUser = async  (data) => {
        ENDPOINT.admin_user.reject.id = props.editItem.id;
        let url = ENDPOINT.admin_user.reject.url+ENDPOINT.admin_user.reject.id+ENDPOINT.admin_user.reject.type;
        return await AuthService.postMethod(url, true,data)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    }

    if(props.editItem===null){
        return "";
    }

    return(
        <>
            <Modal
                {...props}
                size="xl"
                centered
            >
                <Button variant="close" onClick={props.onHide}><i className={"fal fa-times"}></i> </Button>
                <Modal.Body>
                    <Formik
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                        initialValues={{
                            firstName: props.editItem.firstName,
                            lastName: props.editItem.lastName,
                            birthDate: props.editItem.birthDate,
                            phoneNo: props.editItem.phoneNo,
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
                            <Form noValidate onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <div className={classes.box}>
                                    <h3 className={"font-20 text-orange mb-3"}>Perosnal Data</h3>
                                    <Row>
                                        <Col md={12} className={"mb-3"}>
                                            <Form.Label className={"text-orange mb-0"}>First Name</Form.Label>
                                            <Form.Control
                                                className={"bottom-border"}
                                                type="text"
                                                name="firstName"
                                                value={values.firstName}
                                                onChange={handleChange}
                                                placeholder="Enter First Name"
                                                isValid={touched.firstName && !errors.firstName}
                                            />
                                        </Col>
                                        <Col md={12} className={"mb-3"}>
                                            <Form.Label className={"text-orange mb-0"}>Last Name</Form.Label>
                                            <Form.Control
                                                className={"bottom-border"}
                                                type="text"
                                                placeholder="Last name"
                                                name="lastName"
                                                value={values.lastName}
                                                onChange={handleChange}
                                                isValid={touched.lastName && !errors.lastName}
                                            />
                                        </Col>
                                        <Col md={12} className={"mb-3"}>
                                            <Form.Label className={"text-orange mb-0"}>Phone Number</Form.Label>
                                            <PhoneInput
                                                placeholder="Phone Number"
                                                className={"bottom-border"}
                                                defaultCountry="CA"
                                                international
                                                countryCallingCodeEditable={false}
                                                //onChange={setValue}
                                                name="phoneNo"
                                                value={values.phoneNo}
                                                onChange={handleChange}
                                                isValid={touched.lastName && !errors.lastName}
                                            />
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
                                            <Form.Control
                                                className={"bottom-border"}
                                                type="date"
                                                placeholder="00/00/0000"
                                                name="birthDate"
                                                value={values.birthDate}
                                                onChange={handleChange}
                                                isValid={touched.birthDate && !errors.birthDate}
                                            />
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
                        <Row className={"text-center pt-5"}>
                            <Col md={6}>
                                <Button variant="danger w-50" onClick={props.onHide}>Reject</Button>
                            </Col>
                            <Col md={6}>
                                <Button variant="success w-50" onClick={approveUser}>Approve</Button>
                            </Col>
                        </Row>
                    </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ViewProfilePopup;