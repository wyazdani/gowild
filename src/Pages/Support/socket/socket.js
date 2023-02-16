import io from 'socket.io-client';
import {SOCKET_URL} from "../../../config/constants";

const socket = io(SOCKET_URL);

export default socket;
