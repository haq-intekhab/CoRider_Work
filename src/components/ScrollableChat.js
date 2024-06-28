import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import {CheckCircleIcon} from "@chakra-ui/icons";
import ScrollableFeed from "react-scrollable-feed";

const ScrollableChat = ({ messages }) => {

  function formatDateTime(dateTimeStr) {
    const dateObj = new Date(dateTimeStr);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return dateObj.toLocaleDateString('en-GB', options);
}

const formattedDate = Array.isArray(messages) && messages.length > 0 ? formatDateTime(messages[0].time) : 'Invalid date';

  return (
    <ScrollableFeed>
      <div className="flex gap-2 items-center justify-center mt-4 mb-6">
        <div className="md:w-[44%] w-[32%] h-[2px] bg-[#B7B7B7]"></div>
        <div>
          {Array.isArray(messages) && messages.length > 0 ? (
            <p className="text-[#B7B7B7]">{formattedDate}</p>
          ) : (
            <div>Date</div>
          )}
        </div>
        <div className="md:w-[44%] w-[32%] h-[2px] bg-[#B7B7B7]"></div>
      </div>

      <div className="flex flex-col gap-4 mb-2">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender.self ? "justify-end" : "justify-start"
              }`}
              style={{
                maxWidth: "90%",
                alignSelf: message.sender.self ? "flex-end" : "flex-start",
              }}
            >
              {!message.sender.self ? (
                message.sender.is_kyc_verified ? (
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={message.sender.user_id}
                    src={message.sender.image}
                  >
                    <AvatarBadge boxSize="1.25em" bg="white" >
                      <CheckCircleIcon boxSize="1em" color="blue.600"/>
                    </AvatarBadge>
                  </Avatar>
                ) : (
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={message.sender.user_id}
                    src={message.sender.image}
                  />
                )
              ) : (
                ""
              )}
              <span
                className={
                  message.sender.self
                    ? "bg-[#1C63D5] w-[90%] mr-2 p-2 rounded-l-xl rounded-tr-xl text-white"
                    : "bg-white  w-[90%] ml-2 p-2 rounded-r-xl rounded-bl-xl text-[#606060] shadow-md"
                }
              >
                {message.message}
              </span>
            </div>
          ))
        ) : (
          <div>No messages found</div>
        )}
      </div>
    </ScrollableFeed>
  );
};

export default ScrollableChat;
