//     import { React, useState, useEffect, useRef } from "react";
//     import PageTitle from "../../../Components/Pagetitle";
//     import { Button, Col, Form, Row } from "react-bootstrap";
//     import map1 from "Images/map1.jpg";
//     import rectangle from "Images/Rectangle.png";
//     import img2 from "Images/chestcpAsset .png";
//     import { ENDPOINT, KEY } from "config/constants";
//     import AuthService from "services/auth.service";
//     import accessHeader from "services/headers/access-header";
//     import swal from 'sweetalert';
//     import { ToastContainer, toast } from 'react-toastify';
//     import 'react-toastify/dist/ReactToastify.css';
//     import { useNavigate } from "react-router-dom";
// import DynamicFileUpload from "../DynamicFileUpload.js";
//     // °

//     const CreateTreasure = () => {

//     const navigate = useNavigate();
//     const [val, setVal] = useState([]);

//     const [file, setFile] = useState([]);
//     const [formData, setFormData] = useState({});
//     const [uploadFile, setUploadFile] = useState({});
//     const [uploadFiles, setUploadFiles] = useState({});



//     const handleChange = (event) => {
//         let value = event.target.value;
//         let name = event.target.name;
//         setFormData((prevalue) => {
//             return {
//                 ...prevalue,   // Spread Operator               
//                 [name]: value
//             }
//         })
//     }


//     const submitForm = async (event) => {
//         event.preventDefault();
//         try {
//             // First API call
//             const dataObj = {
//                 "title": formData.title,
//                 "description": formData.description,
//                 "location": {
//                     "latitude": JSON.parse(formData.latitude),
//                     "longitude": JSON.parse(formData.longitude)
//                 },
//                 "eventDate": formData.date,
//                 "eventTime": formData.time,
//                 "no_of_participants": formData.number,
//                 "picture": formData.picture
//             }
//             const res = await AuthService.postMethod(`${ENDPOINT.treasure_chests.listing}`, true, dataObj);

//             if (res.status === 201) {
//                 toast.success('Form data submitted successfully', {
//                     position: "bottom-right",
//                     autoClose: 5000,
//                     hideProgressBar: false,
//                     closeOnClick: true,
//                     pauseOnHover: true,
//                     draggable: true,
//                     progress: undefined,
//                     theme: "dark",
//                 });
//             }

//             // 2nd API call
//             console.log(res.data);
//             const dataArray = new FormData();
//             dataArray.append("file", uploadFile.uploadFile);
//             const res2 = await AuthService.postMethod(`${ENDPOINT.treasure_chests.update_picture}${res.data.id}/update-picture`, true, dataArray, false, true);
//             console.log("res2", res2.data);

//             // 3rd API call
//             const linkObj = {
//                 "treasure_chest": res.data.id,
//                 "link": formData.link,
//             }
//             const res3 = await AuthService.postMethod(`${ENDPOINT.admin_sponsor.sponsor}`, true, linkObj);
//                 console.log("res3", res3.data);
//             // 4th API call

//             // setFormData("");
//             // event.target.reset();
//             // console.log(res.data);
//             const dataArray1 = new FormData();
//             dataArray1.append("file", uploadFiles.uploadFiles);
//             const res4 = await AuthService.postMethod(`${ENDPOINT.admin_sponsor.sponsor_img}${res3.data.id}/update-image`, true, dataArray1, false, true);
//             setTimeout(() => {
//                 navigate('/treasure-chests-list');
//             }, 1000);
//             console.log("res4", res4.data);

//         } catch (err) {
//             swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
//         }
//     };



//     function uploadHandleChange(e) {
//         const file = e.target.files[0];
//         if (file && file.type.substr(0, 5) === "image") {
//             setImage(file)
//         } else {
//             setImage(null);
//         }
//         setUploadFiles({ uploadFiles: e.target.files[0] })
//         console.log("uploadFiles", e.target.files[0])
//     }

//     function uploadSingleFile(e) {
//         // setUploadFile(e.target.files[0])
//         setUploadFile({ uploadFile: e.target.files[0] })
//         console.log("uploadFile", e.target.files[0])

//         let ImagesArray = Object.entries(e.target.files).map((e) =>
//             URL.createObjectURL(e[1])
//         );
//         console.log(ImagesArray);
//         setFile([...file, ...ImagesArray]);
//         // console.log("file", file);
//     }

//     // add input field
//     function deleteFile(e) {
//         const s = file.filter((item, index) => index !== e);
//         setFile(s);
//         console.log(s);
//     }

//     const handleAdd = () => {
//         const addItem = [...val, []]
//         setVal(addItem)
//     }
//     const handleChanges = (onChangeValue, i) => {
//         const inputdata = [...val]
//         inputdata[i] = onChangeValue.target.value;
//         setVal(inputdata)
//     }
//     const handleDelete = (i) => {
//         const deletVal = [...val]
//         deletVal.splice(i, 1)
//         setVal(deletVal)
//     }


//     //  image upload and preview
//     const [image, setImage] = useState();
//     const [preview, setPreview] = useState();
//     const fileInputRef = useRef(null);

//     useEffect(() => {
//         if (image) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setPreview(reader.result);
//             };
//             reader.readAsDataURL(image);
//         } else {
//             setPreview(null);
//         }
//     }, [image]);



//     return (
//         <>
//             <PageTitle title="Normal Route" />
//             <section className={"section treasure_chests"}>
//                 <Form onSubmit={submitForm}>
//                     <Row>
//                         <Col md={4}>

//                             <Form.Group>
//                                 <Form.Label><b>Title</b></Form.Label>
//                                 <Form.Control type="text"
//                                     name="title"
//                                     required
//                                     value={formData.title}
//                                     onChange={handleChange}
//                                     className={"mb-3"} placeholder="First On The List" />
//                                 <Form.Label><b>Description</b></Form.Label>
//                                 <Form.Control as="textarea" type="text"
//                                     name="description"
//                                     required
//                                     value={formData.description}
//                                     onChange={handleChange}
//                                     className={"mb-3"} placeholder="Write something here ..." />
//                                 <Form.Label><b>Treasure Location</b></Form.Label>
//                                 <Form.Control type="text"
//                                     name="latitude"
//                                     required
//                                     value={formData.latitude}
//                                     onChange={handleChange}
//                                     className={"mb-3"} placeholder="65.5234°" />
//                                 <Form.Control type="text"
//                                     name="longitude"
//                                     required
//                                     value={formData.longitude}
//                                     onChange={handleChange}
//                                     className={"mb-3"} placeholder="1.12378°" />
//                             </Form.Group>

//                         </Col>
//                         <Col md={8}>
//                             <div className={"img-box"}>
//                                 <img src={map1} alt={"img"} />
//                             </div>
//                         </Col>

//                     <Col md={12}>
//                         <div className={"pt-5"}>
//                         </div>
//                         <Row>
//                             <Col md={12}>
//                                 <Row>
//                                     <Col md={8}>
//                                         <Row>
//                                             <Col md={6}>
//                                             <DynamicFileUpload />
//                                                 <Form.Group>
//                                                     <Form.Label className="mt-1"><b>Sponsors</b></Form.Label>
//                                                     <div className="d-flex">
//                                                         {/* <img src={rectangle} width="20%" alt="" /> */}
//                                                         {preview ? (<img src={preview} width="20%" alt="" />) : ""}
//                                                         <Form.Control type="text"
//                                                             name="link"
//                                                             required
//                                                             value={formData.link}
//                                                             onChange={handleChange}
//                                                             className={"mb-1 ms-2 mb-md-2"} placeholder="🔗 www.redbull.com" style={{ marginBottom: '0px !important' }} />
//                                                     </div>

//                                                 </Form.Group>
//                                             </Col>
//                                             <Col md={5}>
//                                                 <Form.Group>
//                                                     <Form.Label><b>Event Date</b></Form.Label>
//                                                     <Form.Group>
//                                                         <Form.Control type="date"
//                                                             name="date"
//                                                             value={formData.date}
//                                                             onChange={handleChange}
//                                                             className={"mb-1"} />
//                                                     </Form.Group>
//                                                 </Form.Group>

//                                             </Col>
//                                             <Col md={1}>
//                                             </Col>
//                                             <Col md={6}>
//                                                 <Form.Group className="mt-2">
//                                                     <div className="d-flex">
//                                                         {/* <p className="sponser">add <br /> image</p> */}
//                                                         <p className="sponser">
//                                                             <button onClick={(event) => {
//                                                                 event.preventDefault();
//                                                                 fileInputRef.current.click();
//                                                             }}>add <br /> image</button>

//                                                             <input type="file" name="file"
//                                                                 onChange={uploadHandleChange}
//                                                                 style={{ display: 'none' }} ref={fileInputRef}
//                                                                 accept="image/*"
//                                                             />
//                                                         </p>
//                                                         {/* <Form.Control type="file"
//                                             name="file"
//                                             onChange={uploadHandleChange}
//                                             className={"ms-2 mb-0"} placeholder="🔗 link" /> */}
//                                                     <Form.Control type="text"
//                                                         name="file"
//                                                         value={preview}
//                                                         onChange={uploadHandleChange}
//                                                         className={"ms-2 mb-0"} placeholder="🔗 link" />

//                                                 </div>
//                                             {val.map((data, i) => {
//                                                 return (
//                                                     <>
//                                                         <Form.Group>

//                                                             <div className="d-flex">
//                                                                 {preview ? (<img src={preview} width="20%" alt="" />) : ""}
//                                                                 <Form.Control type="text"
//                                                                     name="link"
//                                                                     required
//                                                                     value={formData.link}
//                                                                     onChange={handleChange}
//                                                                     className={"mb-1 ms-2 mb-md-2"} placeholder="🔗 www.redbull.com" style={{ marginBottom: '0px !important' }} />
//                                                             </div>

//                                                         </Form.Group>
//                                                         <div className="d-flex">
//                                                             <p className="sponser">
//                                                                 <button onClick={(event) => {
//                                                                     event.preventDefault();
//                                                                     fileInputRef.current.click();
//                                                                 }}>add <br /> image</button>

//                                                                 <input type="file" style={{ display: 'none' }} ref={fileInputRef}
//                                                                     accept="image/*"
//                                                                     onChange={(event) => {
//                                                                         const file = event.target.files[0];
//                                                                         if (file) {
//                                                                             setImage(file)
//                                                                         } else {
//                                                                             setImage(null);
//                                                                         }
//                                                                     }} />
//                                                             </p>
//                                                             <input type="text" className="form-control"
//                                                                 value={preview} onChange={e => handleChanges(e, i)} placeholder="🔗 link" />
//                                                             <button className="deleteButton" onClick={() => handleDelete(i)}>x</button>
//                                                         </div>
//                                                         {/* <button className="deleteButton" onClick={() => handleDelete(i)}>x</button> */}
//                                                     </>
//                                                 )
//                                             })}
//                                                 <p className="mb-0 float-right addMore" onClick={() => handleAdd()}>Add more</p>

//                                             </Form.Group>
//                                             </Col>
//                                             <Col md={5}>
//                                                 <Form.Group>
//                                                     <Form.Label><b>Time</b></Form.Label>
//                                                     <Form.Control type="time"
//                                                         name="time"
//                                                         required
//                                                         value={formData.time}
//                                                         onChange={handleChange}
//                                                         className={"mb-3"} />
//                                                 </Form.Group>
//                                             </Col>
//                                             <Col md={1}>
//                                             </Col>
//                                             <Col md={6}>
//                                             </Col>
//                                             <Col md={5}>

//                                                 <Form.Group>
//                                                     <Form.Label><b>Number of participants</b></Form.Label>
//                                                     <Form.Control type="number"
//                                                         name="number"
//                                                         min="1"
//                                                         //  max="20"
//                                                         value={formData.number}
//                                                         onChange={handleChange}
//                                                         className={"mb-3"} placeholder="200" />
//                                                 </Form.Group>
//                                             </Col>
//                                         </Row>
//                                     </Col>
//                                     <Col md={4}>
//                                         <Form.Label className="d-flex "><b>Upload Augmented Reality</b></Form.Label>
//                                         <label className={"treasureChest_img"} htmlFor="upload-photo">
//                                             <img src={img2} width="85%" alt="" />
//                                         </label>
//                                         <Form.Label className="d-flex mt-4 mb-0 "><b>Upload Thumbnail</b></Form.Label>
//                                         <label className={"fileUpload v2 mb-0"} htmlFor="upload-photo">
//                                             <Form.Control
//                                                 type="file"
//                                                 name="file"
//                                                 id={"upload-photo"}
//                                                 // value={formData.picture}
//                                                 disabled={file.length === 1}
//                                                 className="mt-4"
//                                                 // onChange={handleChange}
//                                                 onChange={uploadSingleFile}
//                                             />
//                                             {/* <span>Attach images of thumbnail</span> */}
//                                         </label>
//                                         {/* preview image */}
//                                         <div className="form-group previewBox">
//                                             {file.length > 0 &&
//                                                 file.map((item, index) => {
//                                                     return (
//                                                         <div className={"preview"} key={item}>
//                                                             <img src={item} alt="" />
//                                                             <Button type="button" onClick={() => deleteFile(index)}>
//                                                                 <i className={"fal fa-times"}></i>
//                                                             </Button>
//                                                         </div>
//                                                     );
//                                                 })}
//                                         </div>
//                                     </Col>

//                                 </Row>
//                             </Col>
//                             <Col md={4}>
//                                 <Row>

//                                     <Col md={12} className={"mb-3"}>
//                                         <div className="form-group previewBox">

//                                         </div>
//                                     </Col>

//                                 </Row>
//                             </Col>
//                             <Form.Group style={{ width: "55%" }}>
//                                 <Button type="submit" className={"w-50 my-4 m-auto"}>Submit</Button>
//                             </Form.Group>
//                         </Row>
//                     </Col>
//                     </Row>
//                 </Form>


//                 <ToastContainer
//                     position="bottom-right"
//                     autoClose={5000}
//                     hideProgressBar={false}
//                     newestOnTop={false}
//                     closeOnClick
//                     rtl={false}
//                     pauseOnFocusLoss
//                     draggable
//                     pauseOnHover
//                     theme="dark"
//                 />
//             </section>
//         </>
//     )
//     }

//     export default CreateTreasure;
















import { React, useState, useEffect, useRef } from "react";
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
import DynamicFileUpload from "../DynamicFileUpload.js";
// °

const CreateTreasure = () => {

    const navigate = useNavigate();
    const [val, setVal] = useState([]);

    const [file, setFile] = useState([]);
    const [formData, setFormData] = useState({});
    const [uploadFile, setUploadFile] = useState({});
    const [uploadFiles, setUploadFiles] = useState({});



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

            // 2nd API call
            console.log(res.data);
            const dataArray = new FormData();
            dataArray.append("file", uploadFile.uploadFile);
            const res2 = await AuthService.postMethod(`${ENDPOINT.treasure_chests.update_picture}${res.data.id}/update-picture`, true, dataArray, false, true);
            console.log("res2", res2.data);

            // 3rd API call
            const linkObj = {
                "treasure_chest": res.data.id,
                "link": formData.link,
            }
            const res3 = await AuthService.postMethod(`${ENDPOINT.admin_sponsor.sponsor}`, true, linkObj);
            console.log("res3", res3.data);
            // 4th API call

            // setFormData("");
            // event.target.reset();
            // console.log(res.data);
            const dataArray1 = new FormData();
            dataArray1.append("file", uploadFiles.uploadFiles);
            const res4 = await AuthService.postMethod(`${ENDPOINT.admin_sponsor.sponsor_img}${res3.data.id}/update-image`, true, dataArray1, false, true);
            setTimeout(() => {
                navigate('/treasure-chests-list');
            }, 1000);
            console.log("res4", res4.data);

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

    //   add input field
    function deleteFile(e) {
        const s = file.filter((item, index) => index !== e);
        setFile(s);
        console.log(s);
    }


    const [fields, setFields] = useState([{ sponsor: '', file: null, imgLink: '' }]);
    const [show, setShow] = useState(false);

    const handleAddField = () => {
        setFields([...fields, { sponsor: '', file: null, imgLink: '' }]);
        setShow(true);
    };

    const handleRemoveField = index => {
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    };

    const handleChanges = (index, event) => {

        let value = event.target.value;
        let name = event.target.name;
        setFormData((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                [name]: value
            }
        })


        setUploadFiles({ uploadFiles: event.target.files[0] })
        console.log("uploadFiles", event.target.files[0])

        const newFields = [...fields];
        if (event.target.name === 'file') {
            newFields[index][event.target.name] = URL.createObjectURL(event.target.files[0]);
        } else {
            newFields[index][event.target.name] = event.target.value;
        }
        setFields(newFields);
    };

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
                                        <Col md={4}>
                                            <Row>
                                                <Col md={12}>
                                                    <Form.Group>
                                                        <Form.Label className="mt-1"><b>Sponsors</b></Form.Label>
                                                        <Form.Group className="mt-2">

                                                            <div>
                                                                {fields.map((formData, index) => (
                                                                    <div key={index}>
                                                                        <div className="d-flex">
                                                                            {fields[0].file ? <img src={formData.file} width="10%" alt="Preview" /> : ""}
                                                                            <input
                                                                                type="text"
                                                                                name="link"
                                                                                required
                                                                                value={formData.link}
                                                                                // onChange={handleChange}
                                                                                className={"mb-1 ms-2 mb-md-2"} placeholder="🔗 www.redbull.com"
                                                                                onChange={event => handleChanges(index, event)}
                                                                                style={{ marginBottom: '0px !important' }}
                                                                            />

                                                                        </div>
                                                                        <div className="d-flex my-2">
                                                                            <p className="sponser">
                                                                                <button>add <br /> image  <input
                                                                                    type="file"
                                                                                    className="fileCss"
                                                                                    name="file"
                                                                                    onChange={event => handleChanges(index, event)}
                                                                                // style={{ display: 'none' }} ref={fileInputRef}
                                                                                /></button>

                                                                            </p>
                                                                            <input
                                                                                type="text"
                                                                                name="file"
                                                                                required
                                                                                value={formData.file}
                                                                                // onChange={handleChange}
                                                                                className={"mb-1 ms-2 mb-md-2"} placeholder="🔗Link" style={{ marginBottom: '0px !important' }}
                                                                                onChange={event => handleChanges(index, event)}
                                                                            />
                                                                            {show ? <button className="deleteButton" onClick={() => handleRemoveField(index)}>X</button> : ""}
                                                                        </div>

                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <p className="mb-0 float-right addMore" onClick={handleAddField}>Add more</p>

                                                        </Form.Group>

                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col md={4}>
                                            <Row>
                                                <Col md={12}>
                                                    <Form.Group style={{ width: "90%" }}>
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
                                                <Col md={12}>
                                                    <Form.Group className="mt-3" style={{ width: "90%" }}>
                                                        <Form.Label><b>Time</b></Form.Label>
                                                        <Form.Control type="time"
                                                            name="time"
                                                            required
                                                            value={formData.time}
                                                            onChange={handleChange}
                                                            className={"mb-3"} />
                                                    </Form.Group>
                                                </Col>
                                                <Col md={12}>
                                                    <Form.Group className="mt-3" style={{ width: "90%" }}>
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
                                            <Row>
                                                <Col md={12}>
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
                                    </Row>
                                </Col>
                                <Col md={12} className="d-flex justify-content-center">
                                    <Form.Group className="text-center" style={{ width: "58%" }}>
                                        <Button type="submit" className={"w-50 my-4 m-auto text-center"}>Submit</Button>
                                    </Form.Group>
                                </Col>
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