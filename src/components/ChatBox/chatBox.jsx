import React, { useState, useEffect, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  PaperAirplaneIcon,
  XMarkIcon,
  ChatBubbleLeftIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import chatIcon from "../../assets/image/chatIcon.png";
import { wsApiUrl } from "../../constants/constants";
import { userAxiosInstant } from "../../utils/axiosUtils";
import jwtDecode from "jwt-decode";
import { w3cwebsocket as W3CWebSocket } from "websocket";

export default function UserChat({ recieverid }) {
  const [senderdetails, setSenderDetails] = useState({});
  const [recipientdetails, setRecipientDetails] = useState({});
  const [clientState, setClientState] = useState(null);
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  console.log("dexoo", messages);
  const onClose = () => {
    setIsOpen(false);
  };

  const RecieverChat = async () => {
    try {
      const res = await userAxiosInstant.get(
        `/account/guide_details/${recieverid}/`
      );
      console.log("---->>><<<--, account guide id", res.data.id);
      setRecipientDetails({
        id: res.data.id,
        email: res.data.email,
        profile_image: res.data.profile_image,
      });

      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const response = await userAxiosInstant.get(
        `/account/guide_details/${decoded.user_id}/`);
      setSenderDetails({
        id: decoded.user_id,
        email: decoded.email,
        profile_image:response.data.profile_image,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
 
    RecieverChat();
  }, []);

  const onButtonClicked = () => {
    if (messageRef.current.value.trim() == "") {
      return;
    }
    clientState.send(
      JSON.stringify({
        message: messageRef.current.value,
        senderUsername: senderdetails.email,
        receiverUsername: recipientdetails.email,
      })
    );
    messageRef.current.value = "";
  };

  const setUpChat = () => {
    userAxiosInstant
      .get(
        `chatserver/user-previous-chats/${senderdetails.id}/${recipientdetails.id}/`
      )
      .then((response) => {
        if (response.status === 200) {
          setMessages(response.data);
        }
      });

    const client = new W3CWebSocket(
      `${wsApiUrl}/ws/chat/${senderdetails.id}/?${recipientdetails.id}`
    );

    setClientState(client);
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log('Received message from server:', dataFromServer);
      if (dataFromServer) {
        const isNewMessage = !messages.some(
          (msg) => msg.message === dataFromServer.message
        );
 
        if (isNewMessage) {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              message: dataFromServer.message,
              sender_email: dataFromServer.senderUsername,

            },
          ]);
          console.log('New message added to state:', dataFromServer.message);

        }
      }
    };

    client.onclose = (event) => {
      console.log("Websocket disconnected", event.reason);
    };

    return () => {
      client.close();
    };
  };

  useEffect(() => {
    if (senderdetails.id != null && recipientdetails.id != null) {
      setUpChat();
    }
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [senderdetails, recipientdetails]);

  return (
    <Fragment>
      <div>
        <button onClick={() => setIsOpen(!isOpen)}>
          <img src={chatIcon} alt="Chat Icon" title="Chat with Guide" />
        </button>
        <Transition show={isOpen}>
          <Dialog
            as="div"
            className="fixed inset-0 flex items-center justify-center z-50"
            onClose={onClose}
          >
            <div className="w-96 h-108 bg-gray-50 rounded-lg shadow-lg">
              <div className="bg-black w-full h-14 rounded-t-lg">
                <div className="flex justify-between mx-4 text-white items-center">
                  <h2 className="text-2xl font-bold mt-3">Chat</h2>
                  <button onClick={onClose} className="mt-3">
                    <XMarkIcon className="w-6 h-6 text-white font-bold" />
                  </button>
                </div>
              </div>
              <div className="h-80 overflow-y-auto mt-4 p-4">
                   {messages.map((message, index) =>
                    senderdetails.email === message.sender_email ? (
                      <>
                        <div class="flex justify-end mb-2" key={index}>
                          <div class=" shadow  text-white  bg-[#262626] py-1 px-4 rounded-md max-w-xs">
                            {message.message}
                          </div>
                          <div className="rounded-full flex justify-center items-center -me-3 ms-2 w-10 h-10 ">
                            <img
                              src={
                                senderdetails.profile_image
                                  ? senderdetails.profile_image
                                  : ''
                              }
                              alt=""
                              className="rounded-full w-10 h-10"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div class="flex mb-2" key={index}>
                          <div className="rounded-full flex justify-center items-center -ms-4 me-1 w-10 h-10 ">
                            <img
                              src={
                                recipientdetails.profile_image
                                  ? recipientdetails.profile_image
                                  : ''
                              }
                              alt=""
                              className="rounded-full w-10 h-10"
                            />
                          </div>
                          <div class="shadow py-1 px-4  text-white bg-[#262626] rounded-md max-w-xs">
                            {message.message}
                          </div>
                        </div>
                      </>
                    )
                  )}
                </div>

              <div className="mt-4 flex mb-3 p-4">
                <input
                  type="text"
                  ref={messageRef}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-md focus:outline-none"
                />
                <button
                  onClick={onButtonClicked}
                  className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </Fragment>
  );
}
