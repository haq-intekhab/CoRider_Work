import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import ScrollableFeed from "react-scrollable-feed";

const ScrollableChat = ({ messages }) => {
  return (
    <ScrollableFeed>
      <div className="flex gap-2 items-center justify-center my-4">
        <div className="md:w-[42%] w-[26%] h-[2px] bg-slate-500"></div>
        <div>
          {Array.isArray(messages) && messages.length > 0 ? (
            <p className="text-slate-500">{messages[0].time}</p>
          ) : (
            <div>Date</div>
          )}
        </div>
        <div className="md:w-[42%] w-[26%] h-[2px] bg-slate-500"></div>
      </div>
      <div className="flex flex-col gap-4">
        {Array.isArray(messages) && messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender.self ? "justify-end" : "justify-start"
              }`}
              style={{
                maxWidth: "80%",
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
                    <AvatarBadge boxSize="1.25em" bg="blue.500" />
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
                    ? "bg-[#1C63D5] mr-2 p-2 rounded-l-xl rounded-tr-xl text-white"
                    : "bg-white mr-10 p-2 rounded-r-xl rounded-bl-xl"
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
