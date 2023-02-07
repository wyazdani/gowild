import {
  React,
  useState,
  useEffect,
  useCallback,
  useRef,
  Fragment,
} from "react";
import PageTitle from "../../../Components/Pagetitle";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ENDPOINT } from "config/constants";
import AuthService from "services/auth.service";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import RouteMap from "./RouteMap";

const CreateRoute = () => {
  const addHistoryBtnRef = useRef(null);

  const [file, setFile] = useState([]);
  const [files, setFiles] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [inputFields, setInputFields] = useState([]);

  const [formArray, setFormArray] = useState([{}]);
  const [formData, setFormData] = useState({
    startLongtitude: "",
    startLattitude: "",
    endLongtitude: "",
    endLattitude: "",
    title: "",
    description: "",
  });

  const [uploadFile, setUploadFile] = useState();
  const [showButton, setShowButton] = useState(false);

  const [startingPoint, setStartingPoint] = useState({
    lat: 0,
    lng: 0,
  });

  const [endingPoint, setEndingPoint] = useState({
    lat: 0,
    lng: 0,
  });

  // store id when user submit form
  const [id, setId] = useState();
  console.log("id", id);

  useEffect(() => {
    console.log(startingPoint);
  }, [startingPoint]);

  const handleChange = (event) => {
    let name = event.target.name;
    const value = event.target.value;

    if (name == "startLongtitude") {
      setStartingPoint({ ...startingPoint, lng: parseFloat(value) });
    }

    if (name == "startLattitude") {
      setStartingPoint({ ...startingPoint, lat: parseFloat(value) });
    }

    if (name == "endLongtitude") {
      setEndingPoint({ ...endingPoint, lng: parseFloat(value) });
    }

    if (name == "endLattitude") {
      setEndingPoint({ ...endingPoint, lat: parseFloat(value) });
    }
    // const value = event.target.value.replace(/\D/g, "");
    // const value = event.target.value.replace(/(0|)\D/g, "");
    setFormData((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [name]: value,
      };
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    console.log(`DUCK`, "formData", JSON.stringify(formData));
    console.log(`DUCK`, "historicalData", JSON.stringify(historicalData));
    const mergedState = Object.assign({}, formData, {
      history_ponts: historicalData,
    });
    console.log(`DUCK`, "mergeArray", JSON.stringify(mergedState));

    return AuthService.postMethod(
      ENDPOINT.admin_route.listing,
      true,
      mergedState
    )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Form data submitted successfully", {
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
        console.log(res);
        setId(res.data.id);

        setShowButton(true);
        // navigate('/route-list');
        setFormData("");
        // event.target.reset();
      })
      .catch((err) => {
        swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
      });
  };

  // add historical event

  const handleHistorical = (event, index) => {
    console.log(`handleHistorical: ${index}`);

    const newRows = [...historicalData];
    newRows[index][event.target.name] = event.target.value;
    setHistoricalData(newRows);
  };

  const handleAddRow = useCallback(
    (position = 0) => {
      //console.log(`handleAddRow: ${JSON.stringify(position)}`);
      setHistoricalData([
        ...historicalData,
        {
          historical_event: {
            latitude: position.lat ?? 0,
            longitude: position.lng ?? 0,
          },
          title: "",
          subtitle: "",
          description: "",
        },
      ]);
    },
    [historicalData]
  );

  function uploadSingleFile(e) {
    setUploadFile(e.target.files[0]);
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    console.log(ImagesArray);
    setFile([...file, ...ImagesArray]);
    console.log("file", file);
  }

  function uploadSingleFile1(e) {
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    console.log(ImagesArray);
    setFile([...files, ...ImagesArray]);
    console.log("files", files);
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

  return (
    <Fragment>
      <PageTitle title="Normal Route" />
      <Form onSubmit={submitForm}>
        <section className={"section"}>
          <Row>
            <Col md={4}>
              <div className={"py-3"}>
                <p>
                  <i className={"fas fa-map-marker-alt text-dark mx-3"}></i>{" "}
                  Starting Point
                </p>
                <p>
                  <i className={"fas fa-map-marker-alt text-danger mx-3"}></i>{" "}
                  Finishing Point
                </p>
                <p>
                  <i className={"fas fa-map-marker-alt text-yellow mx-3"}></i>{" "}
                  Historical Event
                </p>
              </div>

              <Form.Group>
                <Form.Label>Starting Point</Form.Label>
                <Form.Control
                  type="text"
                  name="startLongtitude"
                  id="startLongtitude"
                  required
                  value={formData.startLongtitude}
                  onChange={handleChange}
                  className={"mb-3"}
                  placeholder="Longtitude"
                />
                <Form.Control
                  type="text"
                  name="startLattitude"
                  id="startLattitude"
                  required
                  value={formData.startLattitude}
                  onChange={handleChange}
                  className={"mb-3"}
                  placeholder="Lattitude"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>End Point</Form.Label>
                <Form.Control
                  type="text"
                  name="endLongtitude"
                  id="endLongtitude"
                  required
                  value={formData.endLongtitude}
                  onChange={handleChange}
                  className={"mb-3"}
                  placeholder="Longtitude"
                />
                <Form.Control
                  type="text"
                  id="endLattitude"
                  name="endLattitude"
                  required
                  value={formData.endLattitude}
                  onChange={handleChange}
                  className={"mb-3"}
                  placeholder="Lattitude"
                />
              </Form.Group>
              <Col md={12} className={"mb-3"}>
                <label className={"fileUpload v2"} htmlFor="upload-photo">
                  <Form.Control
                    type="file"
                    id={"upload-photo"}
                    value={formData.picture}
                    disabled={file.length === 1}
                    className=""
                    onChange={uploadSingleFile}
                  />
                  <span>Attach images of thumbnail</span>
                </label>
              </Col>
              <Col md={12} className={"mb-3"}>
                <div className="form-group previewBox">
                  {file.length > 0 &&
                    file.map((item, index) => {
                      return (
                        <div className={"preview"} key={item}>
                          <img src={item} alt="" />
                          <Button
                            type="button"
                            onClick={() => deleteFile(index)}
                          >
                            <i className={"fal fa-times"}></i>
                          </Button>
                        </div>
                      );
                    })}
                </div>
              </Col>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className={"mb-3"}
                  placeholder="My Race Title"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className={"mb-3"}
                  placeholder="Write something here ..."
                />
              </Form.Group>
              <Form.Group>
                <Button type="submit" className={"w-100"}>
                  Save
                </Button>
              </Form.Group>
            </Col>
            <Col md={8}>
              <div className={"img-box"}>
                <RouteMap
                  startingPoint={startingPoint}
                  endingPoint={endingPoint}
                  travelMode={"WALKING"}
                  handleAddRow={handleAddRow}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className={"d-md-flex item-center-between pt-5"}>
                <h3 className={"my-2 fw-bold"}>Historical</h3>
                <Button onClick={handleAddRow} ref={addHistoryBtnRef}>
                  <i className={"fal fa-plus"}></i> Add Historical
                </Button>
              </div>
              <hr />

              {historicalData.map((data, index) => (
                <div key={index}>
                  <Row>
                    <Col md={8}>
                      <Row>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Historical Event</Form.Label>
                            <Form.Control
                              type="text"
                              className={"mb-3 mb-md-5"}
                              name="longtitude"
                              required
                              value={data?.historical_event?.longitude}
                              onChange={(e) =>
                                handleHistorical(e, index, "longtitude")
                              }
                              placeholder="Longtitude"
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Control
                              type="text"
                              className={"mb-3"}
                              name="lattitude"
                              required
                              value={data?.historical_event?.latitude}
                              onChange={(e) =>
                                handleHistorical(e, index, "lattitude")
                              }
                              placeholder="Lattitude"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                              type="text"
                              className={"mb-3"}
                              name="title"
                              required
                              value={data?.title}
                              onChange={(e) =>
                                handleHistorical(e, index, "title")
                              }
                              placeholder="Historical Item"
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Sub-Title</Form.Label>
                            <Form.Control
                              type="text"
                              className={"mb-3"}
                              name="subTitle"
                              required
                              value={data?.subTitle}
                              onChange={(e) =>
                                handleHistorical(e, index, "subTitle")
                              }
                              placeholder="Write something here..."
                            />
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              className={"mb-3"}
                              name="description"
                              required
                              value={data?.description}
                              onChange={(e) =>
                                handleHistorical(e, index, "description")
                              }
                              placeholder="Write something here..."
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={4}>
                      <Row>
                        <Col md={12} className={"mb-3"}>
                          <label
                            className={"fileUpload v2"}
                            htmlFor="upload-photo"
                          >
                            <Form.Control
                              type="file"
                              id={"upload-photo"}
                              disabled={files.length === 1}
                              className=""
                              onChange={uploadSingleFile1}
                            />
                            <span>Attach Images</span>
                          </label>
                        </Col>
                        <Col md={12} className={"mb-3"}>
                          <div className="form-group previewBox">
                            {files.length > 0 &&
                              files.map((item, index) => {
                                return (
                                  <div className={"preview"} key={item}>
                                    <img src={item} alt="" />
                                    <Button
                                      type="button"
                                      onClick={() => deleteFile(index)}
                                    >
                                      <i className={"fal fa-times"}></i>
                                    </Button>
                                  </div>
                                );
                              })}
                          </div>
                        </Col>
                        <Col md={12} className={"mb-3 text-center"}>
                          <button
                            type="button"
                            className="btn btn-primary btn-block w-50"
                            onClick={upload}
                          >
                            Upload
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={12} className={"mb-3 text-center"}>
                      <Form.Group>
                        {showButton ? (
                          <Button
                            type="submit"
                            className={"mt-3"}
                            style={{ width: "25%" }}
                          >
                            Save
                          </Button>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              ))}
            </Col>
          </Row>

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
      </Form>
    </Fragment>
  );
};

export default CreateRoute;
