import React, { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import AuthService from "../../../services/auth.service";
import { ENDPOINT } from "../../../config/constants";
import swal from "sweetalert";
import { Formik } from 'formik';
import { object, string } from 'yup';
import { useNavigate } from "react-router-dom";
import map1 from "Images/map1.jpg";
import rectangle from "Images/Rectangle.png";
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditRoute from "./EditRoute";

const EditRouteList = (props) => {


    const navigate = useNavigate();

    const [file, setFile] = useState([]);
    const [values, setvalues] = useState({})
    const { editItem, ...other } = props;


    console.log(props)
    const schema = object().shape({
    title: string().required(),
    description: string().required(),
    latitude: string().required(),
    longitude: string().required(),
    // date: string().required(),
    // time: string().required(),
    // number: string().required(),
    });


    const handleSubmit = async (data) => {
    ENDPOINT.route.edit_user.id = props?.editItem?.id;
    return await AuthService.patchMethod(ENDPOINT.route.edit_user.url+ENDPOINT.route.edit_user.id, true, data)
    .then((res) => {
        if (res.status === 200) {
            toast.success('Route Updated Successfully', {
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
        //setContent(res.data);
        //setIsLoader(true);
        console.log(res);
    })
    .catch((err) => {
        swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
    });

    }

    if (props?.editItem === null) {
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
        {...other}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
    >
    <Button variant="close" onClick={props.onHide}><i className={"fal fa-times"}></i> </Button>
    <Modal.Body>
        <section className={"section"}>
            <EditRoute editItem={props.editItem}  />
        </section>

    </Modal.Body>
</Modal>
</>
)
}

export default EditRouteList;