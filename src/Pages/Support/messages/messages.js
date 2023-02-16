import React, {useState, useEffect, useRef} from 'react';
import { Table, Form, Dropdown, Button, Row, Col } from "react-bootstrap";
import classes from "../index.module.scss";
import 'react-toastify/dist/ReactToastify.css';
import userImg from "../../../Images/userImg.png";
import {get_url_extension, imageUrl, timeSince} from "../../../Helper/Helpers";
import io from 'socket.io-client';
import {ENDPOINT, SOCKET_URL} from "../../../config/constants";
import AuthService from "../../../services/auth.service";
import swal from "sweetalert";

const Messages = (props) => {
    // const { content } = props;
    const [currentItems, setCurrentItems] = useState([]);
    const [file, setFile] = useState([]);
    const [uploadFile, setUploadFile] = useState();
    const [ticket, setTicket] = useState(null);
    const [msg, setMsg] = useState('');
    const [ticketId, setTicketId] = useState(null);
    const socket = io(SOCKET_URL);
    const messagesEndRef = useRef(null);
    const emitEvent = async (id)=> {
        if (msg) {
            socket.emit(ENDPOINT.support.emit_message,{
                user_id: '',
                message: msg,
                token: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
                ticket_id: id
            })
            setMsg('')

        } else if (file.length>0){
            let data = new FormData();
            data.append('file', uploadFile);
            await uploadAttachment(id, data)
        }
    };

    // socket.on('connect', ()=> {
    //     console.log('Connected');
    // })
    const uploadAttachment = async (id, data)=> {
        const url = (ENDPOINT.support.upload_attachment).replace(':id',id);
        await AuthService.postMethod(url, true,data)
            .then((res) => {
                setFile([]);
                setUploadFile(null)
                socket.emit('supportFileTrigger', res.data)
            })
            .catch((err) => {
                swal("Error", `${AuthService.errorMessageHandler(err)}`, "error");
            });
    };
    useEffect(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "auto" });
        if (props.rowUser?.id !== ticketId) {
            // handleMessages([])
            setCurrentItems([])
            socket.emit('support_users', {ticket_id:props.rowUser?.id})
        }
        if (currentItems.length < (props.message?.data).length) {
            setCurrentItems([...props.message?.data])
        }
        socket.on('msgSupport', (data)=>{
            //setCurrentItems([...currentItems, data.data])
            setCurrentItems((prevState) => [...prevState, data.data]);
        })
        handleChange(props)
    }, [props, currentItems]);

    // useEffect(() => {
    //     messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    //
    //     handleChange(props)
    // }, [currentItems, props]);


    const handleChange = (props) => {
        setTicket(props.rowUser)
        setTicketId(props.rowUser?.id)
    }
    const handleImage = (e) => {
        let ImagesArray = Object.entries(e.target.files).map((e) =>
            URL.createObjectURL(e[1])
        );
        setFile([...file, ...ImagesArray]);
        setUploadFile(e.target.files[0])
    }
    const handleMessages = (messages) => {
        setCurrentItems(messages)
    }
    function deleteFile(e) {
        const s = file.filter((item, index) => index !== e);
        setFile(s);
    }
    const downloadImage = (url) => {
        var filename = url.substring(url.lastIndexOf('/')+1);
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.send()
        xhr.onload = function () {
            const blob = new Blob([xhr.response], { type: 'image/png' })
            const a = document.createElement('a')
            a.href = URL.createObjectURL(blob)
            a.download = filename
            a.click()
        }
    }


    return (
        <>
            <div className={classes.msgPreview}>
                <div className={classes.chatheader}>
                    <div className={classes.userInfo}>
                        <div className={classes.userImg}>
                            <img key={ticket?.id} src={imageUrl(ticket?.user?.picture,userImg)} alt="username"/>
                        </div>
                        <div className={classes.description}>
                            <h6>{`${ticket?.user?.firstName} ${ticket?.user?.lastName}`}</h6>
                            <small className={classes.text}>{ticket?.user?.email}</small>
                        </div>
                    </div>

                </div>
                <div className={classes.mesgs}>
                    <div className={classes.msghistory}>
                        {currentItems.map((data) => (
                            <div key={data?.id} className={data?.role==='user'?classes.incoming:classes.outgoing}>
                                <div className={classes.userImg}>
                                    <img key={data.id} src={imageUrl(data?.user?.picture,userImg)} alt="username"/>
                                </div>
                                <div className={classes.description}>
                                    {data.message && data.attachment?.length===0 && <div className={classes.text}>{data?.message}
                                        <div className={classes.time}> {new Date(data.createdDate).toLocaleString('en-US', {hour:'numeric', minute: 'numeric', hour12: true })}</div>
                                    </div>}
                                    {data.attachment?.length>0 && (get_url_extension(imageUrl(data.attachment[0])) ==='png' || get_url_extension(imageUrl(data.attachment[0])) ==='jpg' || get_url_extension(imageUrl(data.attachment[0])) ==='jpeg') &&
                                        <div className={classes.text}>
                                            {data?.message}
                                           <div>
                                               <div className={classes.fileImg}>
                                                   <img key={data?.id} src={imageUrl(data.attachment[0])} style={{maxHeight: '50px',}} alt="username"/>
                                                   <Button type={"button"} variant={'btnDownload'} onClick={() => downloadImage(imageUrl(data.attachment[0]))}><i className={'fal fa-download'}></i> </Button>
                                               </div>
                                           </div>
                                            <div className={classes.time}> {new Date(data.createdDate).toLocaleString('en-US', {hour:'numeric', minute: 'numeric', hour12: true })}</div>
                                    </div>}
                                    {data.attachment?.length>0 && (get_url_extension(imageUrl(data.attachment[0])) ==='pdf' || get_url_extension(imageUrl(data.attachment[0])) ==='txt') &&
                                        <div className={classes.text}><a className={'btn btn-file'} href={imageUrl(data.attachment[0])} target = "_blank"><i className={'fas fa-file'}></i> </a>
                                            <div className={classes.time}> {new Date(data.createdDate).toLocaleString('en-US', {hour:'numeric', minute: 'numeric', hour12: true })}</div>
                                        </div>}
                                </div>
                            </div>
                        ))}
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
                        <div ref={messagesEndRef} />
                    </div>
                    <div className={classes.typemsg}>
                        <div className={classes.btngroup}>
                            <Form.Label htmlFor={'inputAttach'} className={classes.inputAttach}>
                                <Form.Control id={'inputAttach'} type={'file'} accept={".pdf"} onChange={handleImage} />
                            </Form.Label>
                            <Form.Label htmlFor={'inputPicture'} className={classes.inputPicture}>
                                <Form.Control id={'inputPicture'} type={'file'} accept={".jpg,.jpeg,.png"} onChange={handleImage}/>
                            </Form.Label>

                        </div>
                        <input type="text" className={classes.formcontrol} value={msg}
                               onChange={(e) => setMsg(e.target.value)} placeholder="Type a message"/>
                        <button className={`${classes.btn} ${classes.btnSend}`} onClick={emitEvent.bind(null,ticket?.id)} type="button"><i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messages;