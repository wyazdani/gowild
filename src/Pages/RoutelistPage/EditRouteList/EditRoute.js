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
import {imageUrl} from "../../../Helper/Helpers";
const EditRoute = (props) => {

  const addHistoryBtnRef = useRef(null);
  const navigate = useNavigate();
  const [file, setFile] = useState([]);
  const [files, setFiles] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [historicalCoordinates, setHistoricalCoordinates] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [editData, setEditData] = useState([]);
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
    console.log(`routesData: ${JSON.stringify(routesData)}`);
  }, [routesData]);

  useEffect(() => {
    console.log(`coordinatesData: ${JSON.stringify(coordinatesData)}`);
  }, [coordinatesData]);

  useEffect(() => {
    console.log(`coordinates: ${JSON.stringify(coordinates)}`);
  }, [coordinates]);
  useEffect(() => {
    console.log(`historicalCoordinates: ${JSON.stringify(historicalCoordinates)}`);
  }, [historicalCoordinates]);
  useEffect(() => {
    const decodedCoordinates = polyline.decode(props.editItem.route_path,6);
    const coordinatesEditData = [];
    decodedCoordinates.map((coordinate) =>
        coordinatesEditData.push({
          lat:coordinate[1],
          lng:coordinate[0]})
    );
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

    setCoordinatesData(coordinatesEditData);
    setCoordinates(decodedCoordinates);
    const historicalData = props.editItem?.historicalEvents;
    const historicalCoordinatesData = [];
    historicalData.map((coordinate) =>
        historicalCoordinatesData.push([coordinate.historical_event?.longitude, coordinate.historical_event?.latitude])
    );
    setHistoricalCoordinates(historicalCoordinatesData);
    setEditData(props.editItem)
    setId(props.editItem?.id)

  }, []);

  useEffect(() => {
    console.log(`historicalData: ${JSON.stringify(historicalData)}`);
  }, [historicalData]);
  function isValidCoordinate(value) {
    return /^-?([1-8]?[0-9]\.{1}\d{1,6}|90\.{1}0{1,6})$/.test(value);
  }
  const submitForm = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const errors = coordinatesData.map((coordinate) => {
      const latValid = isValidCoordinate(coordinate.lat);
      const lngValid = isValidCoordinate(coordinate.lng);

      if (latValid && lngValid) {
        return '';
      } else {
        return 'error';
      }

    });
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }else if(errors.includes('error')) {
      swal("Error", 'Invalid Route Entered', "error");
    }else if(coordinates.length===0) {
      swal("Error", 'Pls generate route', "error");
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
      const reverseCoordinates = [];
      coordinates.forEach(point => {
        reverseCoordinates.push([point[1],point[0]])
      })
      const aPolyline = polyline.encode(reverseCoordinates,6);
      const routeData = {
        title: customRoutesData.title,
        description: customRoutesData.description,
        distance_miles: Math.round(mileDistance),
        distance_meters: Math.ceil(meterDistance),
        estimate_time: Math.ceil(estimatedTime*60),
        route_path: encodedPolylines,
        polyline: aPolyline,
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
      };
      const postRouteUrl = ENDPOINT.admin_route.update.replace(
          ":id",
          id
      );
      console.log('routeData',routeData)
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

                if (historicalData[i]?.file){
                  let data = new FormData();
                  data.append("file", historicalData[i].file);
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
        if (isValidCoordinate(value)) {

          return value
        }
        //return value !== null && value !== '';
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
  // const addHistoricalToMap = (index) => {
  //   const latitude = historicalData[index].latitude;
  //   const longitude = historicalData[index].longitude;
  //   if (latitude && longitude){
  //     addMarker(latitude, longitude, 'yellow')
  //   }
  //   if (!historicalData[index].addedToMap && latitude && longitude) {
  //     updateHistoricalRouteKey(index,'addedToMap', true)
  //   }
  // }
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
