import React from "react";
import classes from "./index.module.scss";
import PageTitle from "../../Components/Pagetitle";
import {Button, Col, Form, Row} from "react-bootstrap";



const TreasureHuntEWaiver =(props) => {
    return(
        <>
            <PageTitle title={"Treasure Hunt - E Waiver"} />
            <section className={"section"}>
                <Row>
                    <Col md={8}>
                        <div className={"d-flex justify-content-between align-items-center pb-3"}>
                            <h5>E - Waiver</h5>
                            <Form.Select className={"form-select"} aria-label="Default select example" style={{maxWidth: "150px"}}>
                                <option>Select Events</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </div>
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
            </section>
        </>
    )
}

export default TreasureHuntEWaiver;