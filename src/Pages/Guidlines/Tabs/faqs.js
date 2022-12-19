import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import classes from "../index.module.scss";

const Faqs = () => {
    return(
        <>
            <Row>
                <Col md={8}>
                    <div className={classes.editSection}>
                        <Form>
                            <Form.Group className={`${classes.formGroup} mb-3`}>
                                <textarea>
                                    To all our valued Users

                                    Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi. Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.

                                    Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi. Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.

                                    Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi. Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. testing.
                                </textarea>
                            </Form.Group>
                            <Form.Group>
                                <Button variant={"dark"}>Save</Button>
                            </Form.Group>
                        </Form>
                    </div>
                </Col>
                <Col md={4}>
                    <div className={classes.logBox}>
                        <h4>April 23, 2022</h4>
                        <div className={"text-muted font-12"}>Update Logs</div>
                        <ul className={classes.logList}>
                            <li>
                                <div className={classes.box}>
                                    <time className={"d-block"}>09/12/2021</time>
                                    <div>Term &amp; Conditions - Updated!</div>
                                </div>
                            </li>
                            <li>
                                <div className={classes.box}>
                                    <time className="d-block">06/19/2021</time>
                                    <div>FAQ</div>
                                </div>
                            </li>
                            <li>
                                <div className={classes.box}>
                                    <time className={"d-block"}>09/12/2021</time>
                                    <div>Term &amp; Conditions - Updated!</div>
                                </div>
                            </li>
                            <li>
                                <div className={classes.box}>
                                    <time className={"d-block"}>06/19/2021</time>
                                    <div>FAQ</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Faqs;