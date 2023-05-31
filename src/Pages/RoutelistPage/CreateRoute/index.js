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
import RouteMapBox from "../MapBox";
import polyline from '@mapbox/polyline';
import {point as turfPoint, distance as turfDistance} from '@turf/turf';
const CreateRoute = () => {

  const addHistoryBtnRef = useRef(null);
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [files, setFiles] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [historicalCoordinates, setHistoricalCoordinates] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [coordinatesData, setCoordinatesData] = useState([
    {
      lat:'',
      lng:''
    },
    {
      lat:'',
      lng:''
    }
  ]);
  const [directionsData, setDirectionsData] = useState(null);
  const [accordionActiveKey, setAccordionActiveKey] = useState('0');
  const [inputFields, setInputFields] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [routesData, setRoutesData] = useState({});
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
    addedToMap: false,
  }) // For Testing Purpose

  const [formArray, setFormArray] = useState([{}]);
  const [validated, setValidated] = useState(false);
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

  const schema = object().shape({
    title: string().required(),
    description: string().required()
  });

  useEffect(() => {
    console.log(`marker: ${JSON.stringify(markers)}`);
  }, [markers]);

  useEffect(() => {
    console.log(`routesData: ${JSON.stringify(routesData)}`);
  }, [routesData]);

  useEffect(() => {
    console.log(`coordinatesData: ${JSON.stringify(coordinatesData)}`);
  }, [coordinatesData]);

  useEffect(() => {
    console.log(`coordinates: ${JSON.stringify(coordinates)}`);
    console.log(`historicalCoordinates: ${JSON.stringify(historicalCoordinates)}`);
  }, [coordinates,historicalCoordinates]);

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
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
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
          subtitle: data.subtitle,
          description: data.description,
        })
      }
      let prevPoint = [];
      let meterDistance = 0;

      coordinates.forEach(point => {
        if(prevPoint.length>0) {
          const turfPoint1 = turfPoint(prevPoint);
          const turfPoint2 = turfPoint(point);
          const options = { units: 'meters' };
          const distance = turfDistance(turfPoint1, turfPoint2, options);
          meterDistance = meterDistance + distance;
          prevPoint = point;
        } else {
          prevPoint = point;
        }

      });
      const averageHikingSpeedKmPerHour = 4;
      const conversionFactor = 0.62137119;
      const averageHikingSpeedMilesPerHour = averageHikingSpeedKmPerHour * conversionFactor;
      let mileDistance = meterDistance * 0.00062137;
      const estimatedTime = mileDistance / averageHikingSpeedMilesPerHour;
      const encodedPolylines = polyline.encode(coordinates,6);
      console.log(coordinates,'coordinates');
      console.log(estimatedTime,'estimatedTime');
      console.log(encodedPolylines,'encodedPolylines');
      console.log(mileDistance,'mileDistance');
      console.log(meterDistance,'meterDistance');
      const routeData = {
        title: customRoutesData.title,
        description: customRoutesData.description,
        distance_miles: Math.round(mileDistance),
        distance_meters: Math.ceil(meterDistance),
        estimate_time: Math.ceil(estimatedTime*60),
        route_path: encodedPolylines,
        startLocation: "-",
        endLocation: "-",
        start: {
          latitude: parseFloat(coordinates[0][1]),
          longitude: parseFloat(coordinates[0][0]),
        },
        end: {
          latitude: parseFloat(coordinates[1][1]),
          longitude: parseFloat(coordinates[1][0]),
        },
        historical_route: payloadHistorical
      }
      console.log("DUCK", "customRoutesData", customRoutesData);
      console.log("DUCK", "historicalData", historicalData);
      return AuthService.postMethod(
          ENDPOINT.admin_route.listing,
          true,
          routeData
      )
          .then((res) => {
            if (res.data?.historical_route && res.data?.historical_route.length> 0) {
              for (let i =0;i<res.data?.historical_route.length;i++) {
                const url = ENDPOINT.historical_event.add_image.replace(
                    ":id",
                    res.data?.historical_route[i].id
                );
                let data = new FormData();
                data.append("file", historicalData[i].file);
                if (historicalData[i]?.file){
                  AuthService.postMethod(url, true, data)
                      .then((res) => {
                        console.log('Success Historical Route Image Upload')
                      }).catch((err) => {
                    setShowButton(true);
                    deleteRoute()
                    swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
                  });
                }
              }
            }
            let data = new FormData();
            data.append("file", customRoutesData.picture);
            setId(res.data.id);
            const url = ENDPOINT.admin_route.update_pictures.replace(
                ":id",
                res.data.id
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
                      setFormData("");
                    }
                  })
                  .catch((err) => {
                    setShowButton(true);
                    deleteRoute()
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
              setFormData("");
            }
          })
          .catch((err) => {
            setShowButton(true);
            deleteRoute()
            swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
          });
    }



  };

  const deleteRoute = () => {
    if (id){
      ENDPOINT.route.delete.id = id;
      setId(null)
      AuthService.deleteMethod(
          ENDPOINT.route.delete.url + ENDPOINT.route.delete.id,
          true
      )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log('Deleted Successfully')
          });
    }
  }
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
  const handleCoordinates = (event, index) => {
    const newRows = [...coordinatesData];
    newRows[index][event.target.name] = event.target.value;
    setCoordinatesData(newRows);
  };

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
  const handleAddCoordinates= useCallback(
      (position = 0) => {
        setCoordinatesData([
            ...coordinatesData,
          {
            lat: '',
            lng: ''
          }
        ])
      },
      [coordinatesData]
  );
  const handleRemoveCoordinates = useCallback(
      (index) => {
        setCoordinatesData((prevData) =>
            prevData.filter((data, i) => i !== index)
        );
      },
      [coordinatesData]
  );

  const addRouteToMap = () => {
    const dataCoordinates = [];
    const isDataValid = coordinatesData.every(obj => {
      return Object.values(obj).every(value => {
        return value !== null && value !== '';
      });
    });
    if (isDataValid) {
      coordinatesData.map((data, index) => (
          dataCoordinates.push([parseFloat(data.lng),parseFloat(data.lat)])
      ))
      setCoordinates(dataCoordinates);
    }

  }
  const addHistoricalToMap = () => {
    const dataCoordinates = [];
    historicalData.map((data, index) => (
        dataCoordinates.push([parseFloat(data.longitude),parseFloat(data.latitude)])
    ))
    setHistoricalCoordinates(dataCoordinates);
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
  const findMiddleElement = (arr) => {
    const middleIndex = Math.floor(arr.length / 2);
    return arr[middleIndex];
  };
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
                <div className={"mapImgBox"} id="map-container">
                  <RouteMapBox coordinates={coordinates} center={findMiddleElement(coordinates)} zoom={15} historicalCoordinates={historicalCoordinates}
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
                      {coordinatesData.map((data, index) => (
                      <div key={index} className={'addBtnRow'}>
                        <Row >
                          <Col lg={6}>
                            <Form.Group>
                              <Form.Label>
                                Latitude
                              </Form.Label>
                              <Form.Control
                                  type="text"
                                  className={"mb-3"}
                                  name="lat"
                                  required
                                  value={data.lat}
                                  onChange={(e) =>
                                      handleCoordinates(e, index, "lat")
                                  }
                                  placeholder="latitude"
                              />
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                            <Form.Group>
                              <Form.Label>
                                Longitude
                              </Form.Label>
                              <Form.Control
                                  type="text"
                                  className={"mb-3"}
                                  name="lng"
                                  required
                                  value={data.lng}
                                  onChange={(e) =>
                                      handleCoordinates(e, index, "lng")
                                  }
                                  placeholder="longitude"
                              />
                              <Form.Control.Feedback type="invalid">
                                Field is required.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Col>
                        </Row>
                        <div className={'btnGroup'}>
                          {index === 0 && <Button onClick={handleAddCoordinates}><i className={"fal fa-plus"}></i></Button> }
                          {index !== 0 && index !== 1 && (
                              <Button onClick={() => handleRemoveCoordinates(index)} className={'delete'}>
                                <i className={"fal fa-times"}></i>
                              </Button>
                          )}
                        </div>
                      </div>
                      ))}
                      <Row>
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
                                accept={".jpg,.jpeg,.png"}
                                className=""
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
                      <Accordion.Item eventKey={`${index}`} key={index}>
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

export default CreateRoute;
