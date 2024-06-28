import "../App.css";
import { Spinner } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import { FiPaperclip } from "react-icons/fi";
import { VscSend } from "react-icons/vsc";
import { GoPeople } from "react-icons/go";
import { IoCallOutline } from "react-icons/io5";
import { GoReport } from "react-icons/go";
import { MdOutlineCameraAlt } from "react-icons/md";
import { PiVideoCamera } from "react-icons/pi";
import { TbFileExport } from "react-icons/tb";

const SingleChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue("");
  };

  const fetchMessages = async (req, res) => {
    setLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://qa.corider.in/assignment/chat?page=0`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log("fetchdata", response.data);
        setMessages(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);

  // https://qa.corider.in/assignment/chat?page=0
  const [showOptions1, setShowOptions1] = useState(false);

  const toggleOptions1 = () => {
    setShowOptions1(!showOptions1);
  };

  const [showOptions2, setShowOptions2] = useState(false);

  const toggleOptions2 = () => {
    setShowOptions2(!showOptions2);
  };

  const avatars = [
    { name: "Ryan Florence", src: "https://bit.ly/ryan-florence" },
    { name: "Segun Adebayo", src: "https://bit.ly/sage-adebayo" },
    { name: "Kent Dodds", src: "https://bit.ly/kent-c-dodds" },
    { name: "Prosper Otemuyiwa", src: "https://bit.ly/prosper-baba" },
    { name: "Christian Nwamba", src: "https://bit.ly/code-beast" },
  ];

  const collageStyle = {
    position: "relative",
    display: "inline-block",
    width: "70px", // Adjust the size as needed
    height: "70px",
    borderRadius: "50%",
    overflow: "hidden",
  };

  const avatarStyle = {
    position: "absolute",
    width: "50%", // Adjust the size as needed
    height: "50%", // Adjust the size as needed
  };

  return (
    <div className="w-full h-[100vh] px-4 pt-4 bg-[#0000001F]">
      <div className="w-full flex flex-col gap-4 pb-4 border-b-2 border-slate-400">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <FaArrowLeft className="size-[24px]" />
            <p className="text-[24px] font-bold">{messages.name}</p>
          </div>
          <FiEdit className="size-[24px]" />
        </div>
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <div style={collageStyle}>
              {Array.isArray(messages.chats) && messages.chats.length > 0 ? (
                messages.chats.map((avatar, index) => (
                  <Avatar
                    key={index}
                    name={avatar.name}
                    src={avatar.sender.image}
                    style={{
                      ...avatarStyle,
                      top: `${Math.floor(index / 2) * 50}%`,
                      left: `${(index % 2) * 50}%`,
                    }}
                  />
                ))
              ) : (
                <div>No messages found</div>
              )}
            </div>
            <div>
              <div className="flex gap-2">
                <p className="text-[18px] text-slate-400">From</p>
                <p className="text-[18px] text-black font-semibold">
                  {messages.from}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="text-[18px] text-slate-400">To</p>
                <p className="text-[18px] text-black font-semibold">
                  {messages.to}
                </p>
              </div>
            </div>
          </div>
          <BsThreeDotsVertical onClick={toggleOptions1} className="cursor-pointer" />
        </div>
        {showOptions1 && (
          <div className="absolute top-[112px] right-4 flex flex-col bg-white shadow-md rounded">
            <div className="flex gap-4 items-center py-4 px-4  hover:bg-gray-100">
              <GoPeople className="size-[25px]"/>
              <button className="block font-semibold ">
                Members
              </button>
            </div>
            <div className="w-full h-[1px] bg-[#E2E8F0]"></div>
            <div className="flex gap-4 items-center py-4 px-4  hover:bg-gray-100">
              <IoCallOutline className="size-[25px]"/>
              <button className="block font-semibold">
                Share Number
              </button>
            </div>
            <div className="w-full h-[1px] bg-[#E2E8F0]"></div>
            <div className="flex gap-4 items-center py-4 px-4  hover:bg-gray-100">
              <GoReport className="size-[26px]"/>
              <button className="block font-semibold ">
                Report
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col gap-2 mt-[40px]">
        {loading ? (
          <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
        ) : (
          <div
            className="messages "
            style={{ overflowY: "auto", maxHeight: "calc(100vh - 290px)" }}
          >
            <ScrollableChat messages={messages.chats} />
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-8 flex items-center"
        style={{ position: "sticky", bottom: 0 }}
      >
        <div className="w-[90%] flex h-[3rem] bg-white border rounded-[0.5rem] pl-[12px] items-center gap-3 mx-auto">
          <input
            required
            type="text"
            placeholder="Reply to @Rohit Yadav"
            name="email"
            value={inputValue}
            onChange={handleChange}
            className="md:w-[90%] w-[70%] h-full text-richblack-5 outline-none"
          />
          <div className="md:w-[10%] w-[30%] flex gap-6">
            <FiPaperclip className="size-[25px] cursor-pointer" onClick={toggleOptions2} />
            {showOptions2 && (
              <div className="absolute -top-12 right-20 flex justify-center items-center bg-green-700 rounded-full shadow-md">
                <button className="block  p-3 pl-4 font-semibold hover:bg-green-600 rounded-full">
                  <MdOutlineCameraAlt className="size-[20px] text-white" />
                </button>
                <button className="block  p-3 font-semibold hover:bg-green-600 rounded-full">
                  <PiVideoCamera className="size-[20px] text-white" />
                </button>
                <button className="block p-3 pr-4 font-semibold hover:bg-green-600 rounded-full">
                  <TbFileExport className="size-[20px]  text-white" />
                </button>
              </div>
            )}
            <button type="submit">
              <VscSend className="size-[25px]" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SingleChat;
