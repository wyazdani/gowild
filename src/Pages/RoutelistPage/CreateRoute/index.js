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
import Accordion from 'react-bootstrap/Accordion';
import axios from "axios";

const CreateRoute = () => {
  const addHistoryBtnRef = useRef(null);
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [files, setFiles] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [directionsData, setDirectionsData] = useState(null);
  const [accordionActiveKey, setAccordionActiveKey] = useState('0');
  const [inputFields, setInputFields] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [routesData, setRoutesData] = useState({});
  const [customRoutesData, setCustomRoutesData] = useState({
    title: "",
    description: "",
    startLatitude:'',
    startLongitude:'',
    endLatitude:'',
    endLongitude:'',
    distance_miles: 0,
    distance_meters: 0,
    estimate_time: '',
    route_path: '',
    startLocation: '',
    endLocation: '',
    picture: "",
    addedToMap: false,
  }) // For Testing Purpose

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
  }, [historicalData, accordionActiveKey]);
  const submitForm = async (event) => {
    event.preventDefault();
    const payloadHistorical = [];
    for (const data of historicalData) {
      payloadHistorical.push({
        historical_event: {
          latitude: data.latitude,
          longitude: data.longitude,
        },
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
      })
    }
    // let routesData = [];
    const routeData = {
      title: customRoutesData.title,
      description: customRoutesData.description,
      distance_miles: customRoutesData.distance_miles,
      distance_meters: customRoutesData.distance_meters,
      estimate_time: '-',
      route_path: customRoutesData.route_path,
      startLocation: '-',
      endLocation: '-',
      start: {
        latitude: customRoutesData.startLatitude,
        longitude: customRoutesData.startLongitude,
      },
      end: {
        latitude: customRoutesData.endLatitude,
        longitude: customRoutesData.endLongitude,
      },
      historical_route: payloadHistorical
    }

    // console.log("DUCK", "formData", formData);
    console.log("DUCK", "customRoutesData", customRoutesData);
    console.log("DUCK", "historicalData", historicalData);
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
        routeData
    )
      .then((res) => {

        // if (res.data?.historical_route && res.data?.historical_route.length> 0) {
        //
        //   for (const [i,event] in res.data?.historical_route) {
        //
        //     const url = ENDPOINT.historical_event.add_image.replace(
        //         ":id",
        //         event.id
        //     );
        //     let data = new FormData();
        //
        //     data.append("file", historicalData[i].file);
        //     console.log(url)
        //     console.log(historicalData[i].file)
        //     AuthService.postMethod(url, true, data)
        //         .then((res) => {
        //           console.log('Success Historical Route Image Upload')
        //         })
        //   }
        //
        // }
        let data = new FormData();
        data.append("file", customRoutesData.picture);
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
    newRows[index][event.target.name] = event.target.value;
    setHistoricalData(newRows);
  };
  const handleCustomRoute = (event) => {
    const {name, value} = event.target;
    setCustomRoutesData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const updateStartEndPosition = useCallback(
    (startPos, endPos) => {
      console.log(updateStartEndPosition);
      console.log(markers)
      // console.log(
      //   `updateStartEndPosition: ${JSON.stringify(startPos)} ${JSON.stringify(
      //     endPos
      //   )}`
      // );
      setStartingPoint(startPos);
      setEndingPoint(endPos);
      /*if (directionsData == null) {
        const origin = `${startPos.lat}, ${startPos.lng}`;
        const destination = `${endPos.lat}, ${endPos.lng}`;
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_KEY}`;
        const corsAnywhereUrl = `http://localhost:8080/${url}`;
console.log(corsAnywhereUrl)
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
    (lat, lng, rang='') => {
      let color;
      if (markers.length === 0) {
        color = "black";
      } else if (markers.length === 1) {
        color = "red";
      } else {
        color = "yellow";
      }
      if (rang){
        color = rang;
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

  const handleAddRow = useCallback(
    (position = 0) => {
      setHistoricalData([
        ...historicalData,
        {
          latitude: position.lat ?? "",
          longitude: position.lng ?? "",
          title: "",
          subtitle: "",
          description: "",
          file: "",
          addedToMap: false,
          imageIndex: '',
        },
      ]);
      setAccordionActiveKey(`${historicalData.length}`)
    },
    [historicalData, accordionActiveKey]
  );

  const addRouteToMap = () => {
    const startLatitude = customRoutesData.startLatitude;
    const startLongitude = customRoutesData.startLongitude;
    const endLatitude = customRoutesData.endLatitude;
    const endLongitude = customRoutesData.endLongitude;
    if (!customRoutesData.addedToMap && startLatitude && startLongitude && endLatitude && endLongitude){

      addMarker(startLatitude, startLongitude, 'black')
      addMarker(endLatitude, endLongitude, 'red')
    }
    else if (customRoutesData.addedToMap && startLatitude && startLongitude && endLatitude && endLongitude){
      updateRouteMap(startLatitude, startLongitude, 'black', 0)
      updateRouteMap(endLatitude, endLongitude, 'red', 1)
    }
    if (!customRoutesData.addedToMap && startLatitude && startLongitude && endLatitude && endLongitude) {
      updateCustomRouteKey('addedToMap', true)
    }
  }

  const addHistoricalToMap = (index) => {
    const latitude = historicalData[index].latitude;
    const longitude = historicalData[index].longitude;
    if (latitude && longitude){
      addMarker(latitude, longitude, 'yellow')
    }
    if (!historicalData[index].addedToMap && latitude && longitude) {
      updateHistoricalRouteKey(index,'addedToMap', true)
    }
  }
  const updateHistoricalRouteKey = (index, key, value) => {
    const newRows = [...historicalData];
    newRows[index][key] = value;
    setHistoricalData(newRows);
  };
  const updateRouteMap = (lat,lng,color, index) => {
    const newRows = [...markers];
    newRows[index] = {
      position: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
      color,
    };
    setMarkers(newRows);
  };
  function uploadSingleFileHistorical(e, index) {
    console.log('In Hostorical')
    let ImagesArray = Object.entries(e.target.files).map((e) =>
        URL.createObjectURL(e[1])
    );
    const newRows = [...historicalData];
    newRows[index]['file'] = e.target.files[0];
    newRows[index]['imageIndex'] = files.length;
    setHistoricalData(newRows);
    setFiles([...files, ...ImagesArray]);
  }
  function uploadSingleFile(e) {
    let ImagesArray = Object.entries(e.target.files).map((e) =>
        URL.createObjectURL(e[1])
    );
    setFile([...ImagesArray]);
    updateCustomRouteKey('picture', e.target.files[0])
  }

  function upload(e) {
    e.preventDefault();
    console.log(file);
  }

  const updateCustomRouteKey = (key, value) => {
    setCustomRoutesData((prevState) => {
      return {
        ...prevState,
        [key]: value
      };
    });
  }
  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
    updateCustomRouteKey('picture', '')
  }

  const deleteHistoricalFile = (index, imageIndex) => {
    const newRows = [...historicalData];
    const newFiles = [...files];
    newRows[index]['file'] = '';
    for (const row of newRows){
      if (row.imageIndex === imageIndex){
        row.imageIndex = '';
      }
      if (row.imageIndex > imageIndex){
        row.imageIndex--;
      }
    }
    newFiles.splice(imageIndex,1)
    setHistoricalData(newRows);
    setFiles([...newFiles]);
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
              </div>
              <hr />

              <div>
                <Row>
                  <Col md={8}>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            Starting Longitude
                          </Form.Label>
                          <Form.Control
                              type="text"
                              className={"mb-3 mb-md-5"}
                              name="startLongitude"
                              required
                              value={customRoutesData.startLongitude}
                              onChange={handleCustomRoute}
                              placeholder="longitude"
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>
                            Starting Latitude
                          </Form.Label>
                          <Form.Control
                              type="text"
                              className={"mb-3"}
                              name="startLatitude"
                              required
                              value={customRoutesData.startLatitude}
                              onChange={handleCustomRoute}
                              placeholder="latitude"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>
                            Ending Longitude
                          </Form.Label>
                          <Form.Control
                              type="text"
                              className={"mb-3 mb-md-5"}
                              name="endLongitude"
                              required
                              value={customRoutesData.endLongitude}
                              onChange={handleCustomRoute}
                              placeholder="longitude"
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>
                            Ending Latitude
                          </Form.Label>
                          <Form.Control
                              type="text"
                              className={"mb-3"}
                              name="endLatitude"
                              required
                              value={customRoutesData.endLatitude}
                              onChange={handleCustomRoute}
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
                              value={customRoutesData.title}
                              onChange={handleCustomRoute}
                              placeholder="My Race Title"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Label></Form.Label>
                        <Form.Group>

                          {customRoutesData.addedToMap
                              ? <Button disabled={true} type="button" className={"w-100"}>
                                Generate
                              </Button>
                              : <Button  type="button" className={"w-100"} onClick={addRouteToMap}>
                                Generate
                              </Button>
                          }
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
                              value={customRoutesData.description}
                              onChange={handleCustomRoute}
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
                              disabled={file.length === 1}
                              className=""
                              onChange={(e) =>
                                  uploadSingleFile(e)
                              }
                          />
                          <span>Attach Images</span>
                        </label>
                      </Col>
                      <Col md={12} className={"mb-3 text-center"}>
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
                      <Col md={12} className={"mb-3"}>
                      <Button onClick={handleAddRow} ref={addHistoryBtnRef}>
                        <i className={"fal fa-plus"}></i> Add Historical Routes
                      </Button>
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



            <Accordion defaultActiveKey={accordionActiveKey}>
              {historicalData.map((data, index) => (
                  <Accordion.Item eventKey={`${index}`}>
                    <Accordion.Header>{`Historical Route ${index +1}` }</Accordion.Header>
                    <Accordion.Body>
                      <div key={index}>
                        <Row>
                          <Col md={8}>
                            <Row>
                              <Col md={6}>
                                <Form.Group>
                                  <Form.Label>
                                    Historical Event
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
                                  <Form.Label>

                                  </Form.Label>
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
                                <Form.Label></Form.Label>
                                <Form.Group>
                                  {data.addedToMap
                                      ? <Button disabled={true} type="button" className={"w-100"}>
                                        Generate
                                      </Button>
                                      : <Button  type="button" className={"w-100"} onClick={() => addHistoricalToMap(index)}>
                                        Generate
                                      </Button>
                                  }
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
                                    htmlFor={`upload-photo${index}`}
                                >
                                  <Form.Control
                                      type="file"
                                      id={`upload-photo${index}`}
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
                                  {files.length > 0 && files[data.imageIndex] &&
                                      <div className={"preview"} key={files[data.imageIndex]}>
                                        <img src={files[data.imageIndex]} alt="" />
                                        <Button
                                            type="button"
                                            onClick={() => deleteHistoricalFile(index, data.imageIndex)}
                                        >
                                          <i className={"fal fa-times"}></i>
                                        </Button>
                                      </div>}
                                </div>
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
                    </Accordion.Body>
                  </Accordion.Item>

              ))}
            </Accordion>
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
