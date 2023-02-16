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
import { ENDPOINT, GOOGLE_KEY } from "config/constants";
import AuthService from "services/auth.service";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import RouteMap from "./RouteMap";
import axios from "axios";

const CreateRoute = () => {
  const addHistoryBtnRef = useRef(null);
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [files, setFiles] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [directionsData, setDirectionsData] = useState(null);
  const [inputFields, setInputFields] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [routesData, setRoutesData] = useState({});

  const [formArray, setFormArray] = useState([{}]);
  const [formData, setFormData] = useState({
    startLongtitude: "",
    startLattitude: "",
    endLongtitude: "",
    endLattitude: "",
    title: "",
    description: "",
    picture: "",
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

  // useEffect(() => {
  //   if (historicalData.length > 0) {
  //     //console.log(`handleAddRow: ${JSON.stringify(historicalData)}`);
  //     //console.log(`marker: ${JSON.stringify(markers)}`);
  //     const newLoc = historicalData.slice(-1)[0];
  //     console.log(`lastValue: ${JSON.stringify(newLoc)}`);
  //     addMarker(newLoc.latitude, newLoc.longitude);
  //   }
  // }, [historicalData]);

  useEffect(() => {
    console.log(`marker: ${JSON.stringify(markers)}`);
  }, [markers]);

  useEffect(() => {
    console.log(`routesData: ${JSON.stringify(routesData)}`);
  }, [routesData]);

  useEffect(() => {
    console.log(`historicalData: ${JSON.stringify(historicalData)}`);

    if (historicalData.length > 2) {
      setRoutesData({
        start: {
          latitude: parseFloat(historicalData[0].latitude),
          longitude: parseFloat(historicalData[0].longitude),
        },
        end: {
          latitude: parseFloat(historicalData[1].latitude),
          longitude: parseFloat(historicalData[1].longitude),
        },
        distance_miles: 0,
        distance_meters: 0,
        estimate_time: "-",
        startLocation: "-",
        endLocation: "-",
        title: historicalData[0].title,
        description: historicalData[0].description,
        history_ponts: [],
      });
      if (historicalData.length >= 3) {
        // history_ponts;
        historicalData.slice(2).map((item, index) => {
          setRoutesData((prevState) => ({
            ...prevState,
            history_ponts: [
              ...prevState.history_ponts,
              {
                historical_event: {
                  latitude: parseFloat(item.latitude),
                  longitude: parseFloat(item.longitude),
                },
                title: item.title,
                subtitle: item.subtitle,
                description: item.description,
              },
            ],
          }));
        });
      }
    }
  }, [historicalData]);

  const submitForm = async (event) => {
    event.preventDefault();

    // let routesData = [];

    // console.log("DUCK", "formData", formData);
    console.log("DUCK", "routesData", routesData);
    //return;
    // if (historicalData.length > 2) {
    //   routesData.start = {
    //     latitude: historicalData[0].latitude,
    //     longitude: historicalData[0].longitude,
    //   };
    //   routesData.end = {
    //     latitude: historicalData[1].latitude,
    //     longitude: historicalData[1].longitude,
    //   };

    //   // FUCK THIS Direction API
    //   // const origin = routesData.start.toString();
    //   // const destination = routesData.end.toString();
    //   // //const url = `http://cors.appscorridor.com?url=https://maps.googleapis.com/maps/api/directions/json?origin=${historicalData[0].longitude},${historicalData[0].latitude}&destination=${historicalData[1].longitude},${historicalData[1].latitude}&key=${GOOGLE_KEY}`;
    //   // const url = `https://maps.googleapis.com/maps/api/directions/json?origin=51,0&destination=51.5,-0.1&sensor=false&key=AIzaSyAoyevYqWkjKEJjq6vPXzfhulxkIecZhX0`;

    //   // console.log("DUCK", "url", url);

    //   // axios
    //   //   .get(url, {
    //   //     "Access-Control-Allow-Origin": "*",
    //   //   })
    //   //   .then((response) => {
    //   //     console.log("Success");
    //   //     setDirectionsData(response.data);
    //   //     // Extract the distance value from the response
    //   //     console.log(response.data);
    //   //   })
    //   //   .catch((error) => console.error(error));

    //   routesData.distance_miles = 0;
    //   routesData.distance_meters = 0;
    //   routesData.estimate_time = "-";
    //   routesData.startLocation = "-";
    //   routesData.endLocation = "-";
    //   routesData.history_ponts = [];
    //   if (historicalData.length >= 3) {
    //     // history_ponts;
    //     historicalData.slice(2).map((item, index) => {
    //       routesData.history_ponts.push({
    //         historical_event: {
    //           latitude: item.latitude,
    //           longitude: item.longitude,
    //         },
    //         title: item.title,
    //         subtitle: item.subtitle,
    //         description: item.description,
    //       });
    //     });
    //   }
    // }

    // console.log("DUCK", "routesData", routesData);
    // setFormData(routesData);

    // setTimeout(() => {
    //   console.log("DUCK", "formData", JSON.stringify(formData));
    // }, 2000);

    // formData.distance_miles =
    //   directionsData?.routes[0]?.legs[0]?.distance?.value ?? 0;
    // formData.distance_meters =
    //   directionsData?.routes[0]?.legs[0]?.duration?.value ?? 0;
    // formData.estimate_time =
    //   directionsData?.routes[0]?.legs[0]?.distance?.text ?? "-";
    // formData.startLocation =
    //   directionsData?.routes[0]?.legs[0]?.start_address ?? "-";
    // formData.endLocation =
    //   directionsData?.routes[0]?.legs[0]?.end_address ?? "-";

    return AuthService.postMethod(
      ENDPOINT.admin_route.listing,
      true,
      routesData
    )
      .then((res) => {
        let data = new FormData();
        data.append("file", uploadFile);
        setId(res.data.id);
        const url = ENDPOINT.admin_route.update_pictures.replace(
          ":id",
          res.data.id
        );
        AuthService.postMethod(url, true, data)
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
              setShowButton(true);
              navigate("/route-list");
              setFormData("");
            }
          })
          .catch((err) => {
            swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
          });
        console.log(res);
        // event.target.reset();
      })
      .catch((err) => {
        swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
      });
  };

  // add historical event

  const handleHistorical = (event, index) => {
    const newRows = [...historicalData];
    // switch (name) {
    //   case 'longitude':
    //     newRows[index][event.target.name] = parseFloat(event.target.value);
    //     break;
    //   case 'latitude':
    //     newRows[index][event.target.name] = parseFloat(event.target.value);
    //     break;
    //   default:
    //     newRows[index][event.target.name] = event.target.value;
    // }
    newRows[index][event.target.name] = event.target.value;
    setHistoricalData(newRows);
  };

  const updateStartEndPosition = useCallback(
    (startPos, endPos) => {
      console.log(updateStartEndPosition);
      // console.log(
      //   `updateStartEndPosition: ${JSON.stringify(startPos)} ${JSON.stringify(
      //     endPos
      //   )}`
      // );
      setStartingPoint(startPos);
      setEndingPoint(endPos);
      /*if (directionsData == null) {
        const origin = "51,0";
        const destination = "51.5,-0.1";
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_KEY}`;
        const corsAnywhereUrl = `https://cors-proxy.htmldriven.com/?url=${url}`;

        axios.get(corsAnywhereUrl)
            .then(response => {
              console.log('Success')
       setDirectionsData(response.data);
              // Extract the distance value from the response
              console.log(response.data)
            })
            .catch(error => console.error(error));
      }*/
    },
    [startingPoint, endingPoint]
  );

  const addMarker = useCallback(
    (lat, lng) => {
      let color;
      if (markers.length === 0) {
        color = "black";
      } else if (markers.length === 1) {
        color = "red";
      } else {
        color = "yellow";
      }

      setMarkers((prevMarkers) => [
        ...prevMarkers,
        {
          position: {
            lat: parseFloat(lat),
            lng: parseFloat(lng),
          },
          color,
        },
      ]);
    },
    [markers]
  );

  // const addMarker = (lat, lng) => {
  //   let color;
  //   if (markers.length === 0) {
  //     color = "black";
  //   } else if (markers.length === 1) {
  //     color = "red";
  //   } else {
  //     color = "yellow";
  //   }
  //   setMarkers((prevMarkers) => [
  //     ...prevMarkers,
  //     {
  //       position: {
  //         lat: lat,
  //         lng: lng,
  //       },
  //       color,
  //     },
  //   ]);
  // };

  const handleAddRow = useCallback(
    (position = 0) => {
      console.log(position);
      if (historicalData.length > 0) {
        //console.log(`handleAddRow: ${JSON.stringify(historicalData)}`);
        console.log(`marker: ${JSON.stringify(markers)}`);
        const newLoc = historicalData.slice(-1)[0];
        console.log(`lastValue: ${JSON.stringify(newLoc)}`);
        addMarker(newLoc.latitude, newLoc.longitude);
      }
      setHistoricalData([
        ...historicalData,
        {
          latitude: position.lat ?? "",
          longitude: position.lng ?? "",
          title: "",
          subtitle: "",
          description: "",
          file: "",
        },
      ]);
    },
    [historicalData]
  );

  function uploadSingleFileHistorical(e, index) {
    console.log(e.target.name);
    console.log(e.target.files);
    const newRows = [...historicalData];
    newRows[index][e.target.name] = e.target.files;
    //setHistoricalData(newRows);
    //setFiles([...files, ...ImagesArray]);
    //console.log("files", files);
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
            <Col md={12}>
              <div className={"mapImgBox"}>
                <RouteMap
                  markers={markers}
                  startingPoint={startingPoint}
                  endingPoint={endingPoint}
                  travelMode={"WALKING"}
                  handleAddRow={handleAddRow}
                  updateStartEndPosition={updateStartEndPosition}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className={"d-md-flex item-center-between pt-5"}>
                <h3 className={"my-2 fw-bold"}>Routes</h3>
                <Button onClick={handleAddRow} ref={addHistoryBtnRef}>
                  <i className={"fal fa-plus"}></i> Add Routes
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
                            <Form.Label>
                              {index === 0
                                ? "Starting Longitude"
                                : index === 1
                                ? "Ending Longitude"
                                : "Historical Event"}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              className={"mb-3 mb-md-5"}
                              name="longitude"
                              required
                              value={data.longitude}
                              onChange={(e) =>
                                handleHistorical(e, index, "longitude")
                              }
                              placeholder="longitude"
                            />
                          </Form.Group>
                          <Form.Group>
                            {index <= 1 && (
                              <Form.Label>
                                {index === 0
                                  ? "Starting Latitude"
                                  : index === 1
                                  ? "Ending Latitude"
                                  : ""}
                              </Form.Label>
                            )}
                            <Form.Control
                              type="text"
                              className={"mb-3"}
                              name="latitude"
                              required
                              value={data?.latitude}
                              onChange={(e) =>
                                handleHistorical(e, index, "latitude")
                              }
                              placeholder="latitude"
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
                          {index > 1 && (
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
                          )}
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
                              onChange={(e) =>
                                uploadSingleFileHistorical(e, index)
                              }
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

              <Button
                onClick={() => {
                  if (historicalData.length > 0) {
                    const newLoc = historicalData.slice(-1)[0];
                    addMarker(newLoc.latitude, newLoc.longitude);
                  }
                }}
                ref={addHistoryBtnRef}
              >
                Save
              </Button>
              <Button onClick={handleAddRow} ref={addHistoryBtnRef}>
                Save & Add More
              </Button>
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
        <Form.Group>
          <Button type="submit" className={"w-100"}>
            Save
          </Button>
        </Form.Group>
      </Form>
    </Fragment>
  );
};

export default CreateRoute;
