import React, { useState, useEffect, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/solid";
import chatIcon from "../../../assets/image/chatIcon.png";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { wsApiUrl } from "../../../constants/constants";
import { userAxiosInstant } from "../../../utils/axiosUtils";
import jwtDecode from "jwt-decode";

export default function UserChat({ recieverid }) {
  const [senderdetails, setSenderDetails] = useState({});
  const [recipientdetails, setRecipientDetails] = useState({});
  const [clientstate, setClientState] = useState(null);
  const [messages, setMessages] = useState([]);
  const messageRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  const onButtonClicked = () => {
    if (!clientstate || clientstate.readyState !== WebSocket.OPEN) {
      console.error("WebSocket connection is not open.");
      return;
    }

    if (messageRef.current.value.trim() === "") {
      return;
    }

    clientstate.send(
      JSON.stringify({
        message: messageRef.current.value,
        senderUsername: senderdetails.email,
        receiverUsername: recipientdetails.email,
      })
    );

    messageRef.current.value = "";
  };

  const setUpChat = () => {
    wsApiUrl
      .get(
        `chatserver/user-previous-chats/${senderdetails.id}/${recipientdetails.id}/`
      )
      .then((response) => {
        if (response.status == 200) {
          setMessages(response.data);
        }
      });

      const client = new W3CWebSocket(
        `${wsApiUrl}/ws/chat/${senderdetails.id}/?${recipientdetails.id}`
      );

    // Set up event listeners
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: dataFromServer.message,
            sender_email: dataFromServer.senderUsername,
          },
        ]);
      }
    };

    client.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    client.onclose = (event) => {
      console.log("WebSocket closed:", event.reason);
    };

    // Update the client state after the client is defined
    setClientState(client);

    // Return a cleanup function
    return () => {
      client.close();
    };
  };

  useEffect(() => {
    if (senderdetails.id != null && recipientdetails.id != null) {
      setUpChat();
    }
  }, [senderdetails, recipientdetails]);

  useEffect(() => {
    console.log("WebSocket readyState:", clientstate?.readyState);
  }, [clientstate]);

  const RecieverChat = async () => {
    try {
      const res = await userAxiosInstant.get(
        `/account/guide_details/${recieverid}`
      );
      setRecipientDetails({
        id: res.data.id,
        email: res.data.email,
        profile_image: res.data.profile_image,
      });

      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      setSenderDetails({
        id: decoded.user_id,
        email: decoded.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    RecieverChat();
  }, []);

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
            <div className="w-96 h-108 bg-gray-50 rounded-lg  shadow-lg ">
              <div className="bg-black w-full h-14 rounded-t-lg">
                <div className="flex justify-between mx-4  text-white items-center">
                  <h2 className="text-2xl font-bold mt-3 ">Chat</h2>
                  <button onClick={onClose} className="mt-3">
                    <XMarkIcon className="w-6 h-6 text-white font-bold" />
                  </button>
                </div>
              </div>

              <div className="h-80 overflow-y-auto mt-4 p-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`${
                      message.sender === "user" ? "text-left" : "text-right"
                    } mb-2`}
                  >
                    {message.text}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex mb-3 p-4">
                <input
                  type="text"
                  ref={messageRef}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-md focus:outline-none"
                />
                {clientstate && clientstate.readyState === WebSocket.OPEN && (
                  <button
                    onClick={onButtonClicked}
                    className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md"
                  >
                    <PaperAirplaneIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </Fragment>
  );
}
