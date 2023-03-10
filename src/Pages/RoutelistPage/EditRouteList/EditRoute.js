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
import RouteMap from "../RouteMap";
import Accordion from 'react-bootstrap/Accordion';
import axios from "axios";
import {object, string} from "yup";
import {imageUrl} from "../../../Helper/Helpers";

const EditRoute = (props) => {
  const addHistoryBtnRef = useRef(null);
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [files, setFiles] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [directionsData, setDirectionsData] = useState(null);
  const [accordionActiveKey, setAccordionActiveKey] = useState('0');
  const [markers, setMarkers] = useState([]);
  const [editData, setEditData] = useState([]);
  const [addedToMap, setAddedToMap] = useState(false);
  const [validRouteFlag, setValidRouteFlag] = useState(false);
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
    image: "",
    addedToMap: false,
  }) // For Testing Purpose

  const [validated, setValidated] = useState(false);
  const [showButton, setShowButton] = useState(true);

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

  useEffect(() => {
    setEditData(props.editItem)
    setId(props.editItem?.id)
    if (!addedToMap){
      setCustomRoutesData({
        title: props.editItem?.title,
        description: props.editItem?.description,
        startLatitude: props.editItem?.start?.latitude,
        startLongitude: props.editItem?.start?.longitude,
        endLatitude:props.editItem?.end?.latitude,
        endLongitude:props.editItem?.end?.longitude,
        distance_miles: props.editItem?.distance_miles,
        distance_meters: props.editItem?.distance_meters,
        estimate_time: props.editItem?.estimate_time,
        route_path: '',
        startLocation: props.editItem?.startLocation,
        endLocation: props.editItem?.endLocation,
        picture: "",
        image: props.editItem?.picture,
        addedToMap: false
      })

      const historicalEditData = [];
      for (let i =0;i<(props.editItem?.historicalEvents.length);i++) {
        const hData = props.editItem?.historicalEvents[i];
        historicalEditData[i] = {
          latitude: hData.historical_event.latitude,
          id: hData.id,
          longitude: hData.historical_event.longitude,
          title: hData.title,
          subtitle: hData.subtitle,
          description: hData.description,
          file: "",
          addedToMap: false,
          imageIndex: '',
          image: hData.image
        }
      }
      setHistoricalData(historicalEditData);
    }

    console.log(`marker: ${JSON.stringify(markers)}`);
  }, [markers, editData]);
useEffect(() => {
  setMarkers([]);
}, [addedToMap]);

  useEffect(() => {

    console.log(`customRoutesData: ${JSON.stringify(customRoutesData)}`);
    if (!addedToMap){
      const initialPositions = markers;
      initialPositions[0] = {
        position: {
          lat: parseFloat(props.editItem?.start.latitude),
          lng: parseFloat(props.editItem?.start.longitude),
        },
        color:'black'
      };
      initialPositions[1] = {
        position: {
          lat: parseFloat(props.editItem?.end.latitude),
          lng: parseFloat(props.editItem?.end.longitude),
        },
        color:'red',
      };
      for (let i =2;i<(props.editItem?.historicalEvents.length+2);i++) {
        initialPositions[i] = {
          position: {
            lat: parseFloat(props.editItem?.historicalEvents[i-2].historical_event.latitude),
            lng: parseFloat(props.editItem?.historicalEvents[i-2].historical_event.longitude),
          },
          color:'yellow',
        };
      }
      setMarkers(initialPositions);
    }



  });

  useEffect(() => {

    console.log(`historicalData: ${JSON.stringify(historicalData)}`);

  }, [historicalData]);
  const submitForm = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else if(!validRouteFlag) {
      swal("Error", 'Invalid Route Entered', "error");
    }
    else {
      const payloadHistorical = [];
      setShowButton(false);
      for (const data of historicalData) {
        payloadHistorical.push({
          historical_event: {
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
          },
          title: data.title,
          id: data.id,
          subtitle: data.subtitle,
          description: data.description,
        })
      }
      const routeData = {
        title: customRoutesData.title,
        description: customRoutesData.description,
        distance_miles: (directionsData?.routes[0]?.legs[0]?.distance?.value * 0.000621371) ?? 0,
        distance_meters: directionsData?.routes[0]?.legs[0]?.duration?.value ?? 0,
        estimate_time: directionsData?.routes[0]?.legs[0]?.duration?.text ?? "-",
        route_path: directionsData?.routes[0]?.overview_polyline?.points ?? "-",
        startLocation: directionsData?.routes[0]?.legs[0]?.start_address ?? "-",
        endLocation: directionsData?.routes[0]?.legs[0]?.end_address ?? "-",
        start: {
          latitude: parseFloat(customRoutesData.startLatitude),
          longitude: parseFloat(customRoutesData.startLongitude),
        },
        end: {
          latitude: parseFloat(customRoutesData.endLatitude),
          longitude: parseFloat(customRoutesData.endLongitude),
        },
        historical_route: payloadHistorical
      }
      console.log("DUCK", "customRoutesData", customRoutesData);
      console.log("DUCK", "historicalData", historicalData);
      const postRouteUrl = ENDPOINT.admin_route.update.replace(
          ":id",
          id
      );
      return AuthService.patchMethod(
          postRouteUrl,
          true,
          routeData
      )
          .then((res) => {
            if (res.data?.data?.historicalEvents && res.data?.data?.historicalEvents.length> 0) {
              for (let i =0;i<res.data?.data?.historicalEvents.length;i++) {
                const url = ENDPOINT.historical_event.add_image.replace(
                    ":id",
                    res.data?.data?.historicalEvents[i].id
                );
                let data = new FormData();
                data.append("file", historicalData[i].file);
                if (historicalData[i]?.file){
                  AuthService.postMethod(url, true, data)
                      .then((res) => {
                        console.log('Success Historical Route Image Upload')
                      }).catch((err) => {
                    setShowButton(true);
                    swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
                  });
                }
              }
            }
            let data = new FormData();
            data.append("file", customRoutesData.picture);
            //setId(res.data.id);
            const url = ENDPOINT.admin_route.update_pictures.replace(
                ":id",
                id
            );
            if (customRoutesData.picture) {
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
                      props.refresh()
                      props.hidePopup()
                    }
                  })
                  .catch((err) => {
                    setShowButton(true);
                    swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
                  });
            }else {
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
              props.refresh()
              props.hidePopup()
            }
          })
          .catch((err) => {
            console.log('err',err)
            setShowButton(true);
            swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
          });
    }
  };

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
        setStartingPoint(startPos);
        setEndingPoint(endPos);
        if (directionsData == null) {
          const origin = `${startPos.lat}, ${startPos.lng}`;
          const destination = `${endPos.lat}, ${endPos.lng}`;
          const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_KEY}`;
          const corsAnywhereUrl = `https://cors.appscorridor.com/${url}`;
          axios.get(corsAnywhereUrl)
              .then(response => {
                if (response.data.status === "ZERO_RESULTS") {
                  setMarkers([])
                  setTimeout(() => {
                    setMarkers([])
                  }, 1000);
                  updateCustomRouteKey('addedToMap', false)
                  setValidRouteFlag(false)
                  swal("Error", 'Invalid Route Entered', "error");
                }else {
                  setValidRouteFlag(true)
                  setDirectionsData(response.data);
                }
              })
              .catch(error => console.error(error));
        }
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
            image: ''
          },
        ]);
        setAccordionActiveKey(`${historicalData.length}`)
      },
      [historicalData, accordionActiveKey]
  );

  const addRouteToMap = () => {
    const oldValues = markers;
    setAddedToMap(true)
    setTimeout(function () {
      setMarkers([])

    }, 1000);

    setTimeout(function () {
      const startLatitude = customRoutesData.startLatitude;
      const startLongitude = customRoutesData.startLongitude;
      const endLatitude = customRoutesData.endLatitude;
      const endLongitude = customRoutesData.endLongitude;
      if (startLatitude && startLongitude && endLatitude && endLongitude){
        const newRows = [...oldValues];
        newRows[0] = {
          position: {
            lat: parseFloat(startLatitude),
            lng: parseFloat(startLongitude),
          },
          color: 'black'
        };
        newRows[1] = {
          position: {
            lat: parseFloat(endLatitude),
            lng: parseFloat(endLongitude),
          },
          color: 'red'
        };
        setMarkers(newRows);
      }
    },1500);


  }

  const clearRoutes = () => {
    setMarkers([]);
  }
  const addHistoricalToMap = (index) => {
    const latitude = historicalData[index].latitude;
    const longitude = historicalData[index].longitude;
    const oldMarkers = markers;
    if (latitude && longitude){
      setAddedToMap(true)
      setTimeout(function () {
        clearRoutes()
      } , 1000)
      if (oldMarkers[index+2]) {

        setTimeout(function () {
          oldMarkers[index+2] = {
            position: {
              lat: parseFloat(latitude),
              lng: parseFloat(longitude),
            },
            color: 'yellow'
          }
          setMarkers(oldMarkers)
        } , 1500)
      }else {
        setTimeout(function () {
          oldMarkers[markers.length] = {
            position: {
              lat: parseFloat(latitude),
              lng: parseFloat(longitude),
            },
            color: 'yellow'
          }
          setMarkers(oldMarkers)
        } , 1500)
        //addMarker(latitude, longitude, 'yellow')
      }

    }
    // if (!historicalData[index].addedToMap && latitude && longitude) {
    //   updateHistoricalRouteKey(index,'addedToMap', true)
    // }
  }
  const updateHistoricalRouteKey = (index, key, value) => {
    const newRows = [...historicalData];
    newRows[index][key] = value;
    setHistoricalData(newRows);
  };
  const updateRouteMap = (oldValues,lat,lng,color, index) => {
    const newRows = [...oldValues];
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
        <Form onSubmit={submitForm} noValidate validated={validated}>
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
                    <Col lg={8}>
                      <Row>
                        <Col lg={6}>
                          <Form.Group>
                            <Form.Label>
                              Starting Longitude
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className={"mb-3"}
                                name="startLongitude"
                                required
                                value={customRoutesData.startLongitude}
                                onChange={handleCustomRoute}
                                placeholder="longitude"
                            />
                            <Form.Control.Feedback type="invalid">
                              Field is required.
                            </Form.Control.Feedback>
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
                        <Col lg={6}>
                          <Form.Group>
                            <Form.Label>
                              Ending Longitude
                            </Form.Label>
                            <Form.Control
                                type="text"
                                className={"mb-3"}
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
                        <Col md={12}>
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
                        <Col md={12}>
                          <Form.Group className={'d-flex justify-content-end'}>
                            {customRoutesData.addedToMap
                                ? <Button disabled={true} type="button" className={""}>
                                  Generate Route
                                </Button>
                                : <Button  type="button" className={""} onClick={addRouteToMap}>
                                  Generate Route
                                </Button>
                            }
                          </Form.Group>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={4}>
                        <Form.Group md={12} className={"mb-3"}>
                          <label
                              className={"fileUpload v2"}
                              htmlFor="upload-photo"
                          >
                            <Form.Control
                                type="file"
                                id={"upload-photo"}
                                disabled={file.length === 1}
                                className=""
                                accept={".jpg,.jpeg,.png"}
                                onChange={(e) =>
                                    uploadSingleFile(e)
                                }
                            />
                            <span>Attach Images</span>
                          </label>
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
                            {file.length === 0 && customRoutesData.image &&
                                <div className={"preview"} key={customRoutesData.image}>
                                  <img src={imageUrl(customRoutesData.image)} alt="" />
                                </div>}
                          </div>
                        </Form.Group>
                    </Col>
                    <Col md={12}>
                      <hr className={'my-5'} />
                    </Col>
                    <div md={12} className={"mb-3 d-flex justify-content-end"}>
                      <Button onClick={handleAddRow} ref={addHistoryBtnRef}>
                        <i className={"fal fa-plus"}></i> Add Historical Routes
                      </Button>
                    </div>
                    <Col md={12} className={"mb-3 text-center"}>
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
                              <Col lg={8}>
                                <Row>
                                  <Col lg={6}>
                                    <Form.Group>
                                      <Form.Label>
                                        Longitude
                                      </Form.Label>
                                      <Form.Control
                                          type="text"
                                          className={"mb-3"}
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
                                      <Form.Label>Latitude</Form.Label>
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
                                  <Col lg={6}>
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
                                          name="subtitle"
                                          required
                                          value={data?.subtitle}
                                          onChange={(e) =>
                                              handleHistorical(e, index, "subtitle")
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
                                  <Col md={12}>
                                    <Form.Group className={'d-flex justify-content-end'}>
                                      {data.addedToMap
                                          ? <Button disabled={true} type="button">
                                            Generate
                                          </Button>
                                          : <Button  type="button" onClick={() => addHistoricalToMap(index)}>
                                            Generate
                                          </Button>
                                      }
                                    </Form.Group>
                                  </Col>
                                </Row>
                              </Col>
                              <Col lg={4}>
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
                                          accept={".jpg,.jpeg,.png"}
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
                                      {!files[data.imageIndex] && data.image &&
                                          <div className={"preview"} key={data.image}>
                                            <img src={imageUrl(data.image)} alt="" />
                                          </div>}
                                    </div>
                                  </Col>
                                </Row>
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
          <Form.Group className={'py-3 d-flex justify-content-center'}>
            {showButton ? (
                <Button
                    type="submit"
                    className={"w-50"}
                >
                  Save
                </Button>
            ) : (
                ""
            )}
          </Form.Group>
        </Form>
      </Fragment>
  );
};

export default EditRoute;
