import {React} from "react";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

const PushNotificationPopup = (props) => {

    return(
        <>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                    <Button variant="close" onClick={props.onHide}><i className={"fal fa-times"}></i> </Button>

                <Modal.Body style={{padding: '14px 41px'}}>
                    <Button variant={"back"} className={"font-18 fw-bold"} onClick={props.onHide} >Push Notification</Button>

                    <Form>
                        <div className="d-flex">
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Send to all participants" />
                            </Form.Group>
                            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Send to all Participants" />
                            </Form.Group> */}
                        </div>
                        <Form.Group className="  mb-3" controlId="exampleForm.ControlInput1">
                            <div className="input-group mb-3">
                                <select className="form-select" name="actionRemove">
                                    <option value="value">Event Name</option>
                                    <option value="collect">COLLECT</option>
                                    <option value="smash">SMASH</option>
                                    <option value="cut">CUT</option>
                                </select>
                            </div>
                        </Form.Group>
                        <Form.Group className={"mb-3"}>
                            <Form.Control type="text" placeholder="Caption Here!" />
                        </Form.Group>
                        <Form.Group className={"mb-3"}>
                            <Form.Control type="email" placeholder="to: sender@gmail.com" />
                        </Form.Group>
                        <Form.Group className={"mb-3"}>
                            <textarea>
                                A Treasure Found!
                            </textarea>
                        </Form.Group>
                        <div className={"text-center"}>
                            <Button variant="success">Push</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default PushNotificationPopup;