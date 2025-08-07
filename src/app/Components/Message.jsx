"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import newRequest from "../client/components/newRequest";
import Navbar from "../client/components/Navbar";
import socket from "../utils/socket";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [gig, setGig] = useState(null);
  const [typingUser, setTypingUser] = useState(null);
  const [fetchedMessages, setFetchedMessages] = useState(false);
  const [otherUser, setOtherUser] = useState(null);
  const scrollRef = useRef();
  const containerRef = useRef();
  const searchParams = useSearchParams();
  const gigId = searchParams.get("gigId");

  const otherUserId =
    currentUser && gig
      ? gig.userId === currentUser._id
        ? gig.createdBy
        : gig.userId
      : null;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      setCurrentUser(user);
      if (!socket.connected) socket.connect();
      socket.emit("addUser", user._id);
      socket.emit("join", user._id);
    }
    return () => {
      socket.off();
    };
  }, []);

  useEffect(() => {
    const fetchOtherUser = async () => {
      if (!currentUser || !currentUser._id || !messages?.length) return;

      try {
        const currentUserId = currentUser._id;
        const participantId =
          messages[0].from === currentUserId
            ? messages[0].to
            : messages[0].from;

        const res = await newRequest.get(`/users/${participantId}`);
        setOtherUser(res.data);
      } catch (err) {
        console.error("Error fetching other user:", err);
      }
    };

    fetchOtherUser();
  }, [currentUser, messages]);

  useEffect(() => {
    if (!gigId) return;
    const fetchGig = async () => {
      try {
        const res = await newRequest.get(`/gig/${gigId}`);
        setGig(res.data.gig);
      } catch (err) {
        console.error("Failed to fetch gig:", err);
      }
    };
    fetchGig();
  }, [gigId]);

  useEffect(() => {
    if (!gigId || !currentUser) return;
    const fetchMessages = async () => {
      try {
        setMessages([]);
        const res = await newRequest.get(`/messages?gigId=${gigId}`);
        setMessages(res.data);
        setFetchedMessages(true);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, [gigId, currentUser]);

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      if (!data || !data._id) return;
      setMessages((prev) => {
        const exists = prev.some((msg) => msg._id === data._id);
        return exists
          ? prev.map((msg) =>
              msg._id === data._id
                ? { ...msg, delivered: data.delivered, seen: data.seen }
                : msg
            )
          : [...prev, data];
      });
      socket.emit("messageSeen", { messageId: data._id, to: data.from });
    };

    const handleSeenConfirmation = ({ messageId }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, seen: true } : msg
        )
      );
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("seenConfirmation", handleSeenConfirmation);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("seenConfirmation", handleSeenConfirmation);
    };
  }, [fetchedMessages]);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on("messageSeenUpdate", ({ messageId }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, seen: true } : msg
        )
      );
    });
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    const unseenMessages = messages.filter(
      (msg) => msg.to === currentUser._id && !msg.seen
    );
    unseenMessages.forEach((msg) => {
      socket.emit("messageSeen", {
        messageId: msg._id,
        from: msg.to,
        to: msg.from,
      });
    });
  }, [messages, currentUser]);

  const handleTyping = () => {
    if (!otherUserId || !currentUser?._id) return;
    socket.emit("typing", { to: otherUserId, from: currentUser._id });
  };

  useEffect(() => {
    socket.on("typing", ({ from }) => {
      setTypingUser(from);
      setTimeout(() => setTypingUser(null), 2000);
    });
  }, []);

  const handleSend = async () => {
    if (!text.trim()) return;

    const to = gig?.userId;
    if (!to) {
      alert("Recipient ID missing. Refresh page.");
      return;
    }

    try {
      const res = await newRequest.post("/messages", {
        gigId,
        text,
        to,
      });

      socket.emit("sendMessage", {
        _id: res.data._id,
        from: res.data.from.toString(),
        to: res.data.to.toString(),
        gigId: res.data.gigId.toString(),
        text: res.data.text,
      });

      setMessages((prev) => [...prev, res.data]);
      setText("");

      if (currentUser.role === "client") {
        const updatedGig = await newRequest.get(`/gig/${gigId}`);
        setGig(updatedGig.data.gig);
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 mx-auto text-center">Chat</h2>

        <div
          className="border p-4 rounded-md h-[400px] overflow-y-scroll bg-white shadow-md mb-4"
          ref={containerRef}
        >
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center">No messages yet.</p>
          ) : (
            <>
              {messages.map((msg) => {
                const isCurrentUser = msg.from === currentUser?._id;

                return (
                  <div
                    key={msg._id}
                    className={`flex items-end mb-2 ${
                      isCurrentUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isCurrentUser && (
                      <img
                        src={`http://localhost:8800/uploads/${otherUser?.img}`}
                        alt="default-user"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}
                    <div
                      className={`px-3 py-2 rounded-lg w-fit max-w-xs relative text-sm ${
                        isCurrentUser
                          ? "bg-green-100 text-right"
                          : "bg-gray-200 text-left"
                      }`}
                    >
                      <p>{msg.text}</p>
                      {isCurrentUser && (
                        <span className="text-xs absolute bottom-0 right-1">
                          <img src="check.png" alt="sent" className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                    {isCurrentUser && (
                      <img
                        src={`http://localhost:8800/uploads/${currentUser?.img}`}
                        alt="default-user"
                        className="w-8 h-8 rounded-full ml-2"
                      />
                    )}
                  </div>
                );
              })}

              {typingUser === otherUserId && (
                <div className="text-sm italic text-gray-500 mb-2">
                  Typing...
                </div>
              )}
              <div ref={scrollRef} />
            </>
          )}
        </div>

        <div className="flex gap-2 ">
          <input
            className="w-full border rounded-md p-2"
            rows="2"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleTyping();
            }}
          />
          <button
            disabled={!gig || !text.trim()}
            onClick={handleSend}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Message;