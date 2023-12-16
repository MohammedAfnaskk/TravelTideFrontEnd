import { React, useEffect, useRef, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { ComplexNavbar } from "../../pages/GuideUI/GuideNavbar/navbar";
import { userAxiosInstant } from "../../utils/axiosUtils";
import { wsApiUrl } from "../../constants/constants";
import jwtDecode from "jwt-decode";
import { GetChatList } from "../../services/userApi";
import   image from '../../assets/image/whatsappbg.jpg'
import { useQuery } from "react-query";
import Loading from "../LoadingAnimation/Loading";

function UserChat() {
     
  
    const [ChatList, setChatList] = useState([]);
    const [Search, setSearch] = useState("");
    const [senderdetails, setSenderDetails] = useState({});
    const [recipientdetails, setRecipientDetails] = useState({});
    const [clientstate, setClientState] = useState("");
    const [messages, setMessages] = useState([]);
    const messageRef = useRef();
    const [isLoader, setIsLoading] = useState(true);

    useEffect(() => {
        RecieverChat();
        setIsLoading(false);

      }, []);
      
      useEffect(() => {
         if (senderdetails.id) {
          fetchChatListUsers();
          setIsLoading(false);

        }
      }, [senderdetails.id]);
      
      const RecieverChat = async () => {
        try {
          const token = localStorage.getItem("token");
          const decoded = jwtDecode(token);
          const senderDetailsResponse = await userAxiosInstant.get(
              `/account/guide_details/${decoded.user_id}/`
          );
          console.log('res==>>', senderDetailsResponse);

          if (senderDetailsResponse.data) {
            setSenderDetails({
              id: senderDetailsResponse.data.id,
              email: senderDetailsResponse.data.email,
              profile_image: senderDetailsResponse.data.profile_image,
            });
          } else {
            console.error('Sender details not found');
          }
      
        } catch (error) {
          console.error(error);
        }
      };
      
      const fetchChatListUsers = async () => {
        try {
          const res = await userAxiosInstant.get(`/chatserver/chatlistusers/${senderdetails.id}/`);
          if (res.data) {
            setChatList(res.data);
          } else {
            console.error('Chat list users not found');
          }
        } catch (error) {
          console.error(error);
        }
      };
      
  const onButtonClicked = () => {
    if (messageRef.current.value.trim() == "") {
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

 

  useEffect(() => {
    document.body.style.overflow = 'hidden'; 
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

     //  For Searching
  const HandleSearch = async (e) => {
    setSearch(e.target.value);
    try {
      const res = await GetChatList(senderdetails.id, e.target.value);
      setChatList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Clear data
  const clearSearchAndFetchAll = async () => {
    setSearch("");
    try {
      const res = await GetChatList(senderdetails.id, "");
      setChatList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // Data fech in backend
  async function GetChatLists() {
    try {
      const res = await GetChatList(senderdetails.id, Search);
      setChatList(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  //---------------------------- React quary---------------------------------------//
//   const { data, isLoading, isError } = useQuery(
//     "GetChatLists",
//     GetChatLists
//   );
//   if (isLoading) {
//     return <Loading />;
//   }

//   if (isError) {
//     return <h1>There was an error fetching data</h1>;
//   }  
 

  return (
    
    <div>
    {isLoader ? (
      <div className="flex items-center justify-center h-full">
        Loading...
      </div>
    ) : (

       <div className="mx-auto flex justify-center items-center "style={{ overflowY: 'auto' }}>
        <div className="border-black rounded-2xl shadow grid grid-cols-[20rem,1fr] w-full  ">
          <div className="border-e grid grid-rows-[5rem,1fr] bg-[#262626]  " >
            <div className="flex justify-center items-center">
              <div className=" border-b-2 bg-[#262626] w-full grid grid-cols-[2rem,1fr,2rem] mx-3  py-2  ">
                <div className="flex justify-center items-center">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
                <div>
                  {" "}
                  <input
                    placeholder="Search"
                    type="text"
                    value={Search}
                    onChange={HandleSearch}
                    className="bg-transparent  w-full text-gray-800 placeholder-gray-700 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  {Search ? (
                    <svg
                      onClick={clearSearchAndFetchAll}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="mx-4 ">
              <p className="font-bold text-white">Chat</p>

              {ChatList.length > 0 ? (
                ChatList.map((user, index) => (
                  <div
                    key={index}
                    className="bg-blue-gray-50 cursor-pointer rounded-xl my-3 grid grid-cols-[3.5rem,1fr,2rem]"
                    onClick={() =>
                      setRecipientDetails({
                        id: user?.id,
                        email: user?.email,
                        username: user?.username,
                        profile_image: user?.profile_image,
                      })
                    }
                  >
                    <div className="rounded-full flex justify-center items-center my-1 ms-2 w-10 h-10">
                      <img
                        src={user?.profile_image || ""}
                        alt=""
                        className="rounded-full h-10 w-10 border"
                      />
                    </div>
                    <div className="flex justify-start items-center">
                      <p className="text-gray-800 capitalize">
                        {user?.username}
                      </p>
                    </div>
                    <div>{user?.someValue}</div>
                  </div>
                ))
              ) : (
                <p className="text-center font-serif text-gray-600">
                  No Users found
                </p>
              )}
            </div>
          </div>
          {/* Chatting section */}
          {recipientdetails.email ? (
            <div className="grid grid-rows-[4rem,1fr]">
              <div className="border-black flex items-center bg-[#262626]">
                <div className="rounded-full flex justify-center items-center my-1 ms-6 w-10 h-10">
                  <img
                    src={
                      recipientdetails?.profile_image
                        ? recipientdetails.profile_image
                        : defaultprofile
                    }
                    alt=""
                    className="rounded-full h-10 w-10"
                  />
                </div>
                <p className="ms-4 text-white font-bold capitalize">
                  {recipientdetails.username}
                </p>
              </div>
              

              <div className="grid grid-rows-[1fr,4rem] object-cover relative"style={{ backgroundImage: `url(${image})` }}>
              <div className="p-10 overflow-auto h-[83vh]">

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
                <div className=" flex justify-center items-center ">
                  <div className="w-full mx-5 grid grid-cols-[1fr,2rem] ">
                    <div className=" bg-[#262626] py-2 rounded-full w-full px-4">
                      <input
                        placeholder="Type a message"
                        type="text"
                        ref={messageRef}
                        className="bg-transparent w-full text-white placeholder-gray-700 text-sm focus:outline-none"
                      />
                    </div>
                    <div className="flex justify-center items-center ms-3">
                      <svg
                        onClick={onButtonClicked}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-white"
                      >
                        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-screen justify-center items-center "style={{ backgroundImage: `url(${image})` }}>
              <p className="font-bold text-xl text-gray-600">Select A Person</p>
            </div>
          )}
        </div>
      </div>
    )}
      </div>
    
  );
}

export default UserChat;
