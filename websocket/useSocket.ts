import { AuthUserType } from '#/auth/types';
import { ICommentItem } from '#/types/chat';
import { ILivestreamItem } from '#/types/livestream';
import { useEffect } from 'react';
import io from 'socket.io-client';
import { mutate } from 'swr';


const EVENTS = {
  CLIENT: {
    NEW_USER_JOIN_ROOM: "1",
  },
  SERVER: {
    RECEIVE_NEW_LIVE_STREAM_COMMENT: "2",
  },
};

const useSocket = (user: AuthUserType, currentLivestream: ILivestreamItem | undefined, endpoint: string) => {
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.log("Access token not found in localStorage");
      return;
    }

    const newSocket = io("ws://api.saybong.tv:8001", {
      extraHeaders: { Authorization: accessToken },
    });

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");

      newSocket.emit(EVENTS.CLIENT.NEW_USER_JOIN_ROOM, {
        userId: user?.id,
        postId: currentLivestream?.id,
      });
    });

    newSocket.on(EVENTS.SERVER.RECEIVE_NEW_LIVE_STREAM_COMMENT, (comment: { data: ICommentItem }) => {
      if (comment && comment.data && currentLivestream?.id === comment.data.postId) {
        mutate(endpoint);
      }
    });

    return () => {
      if (newSocket.connected) {
        console.log("Disconnecting from Socket.IO server");
        newSocket.disconnect();
      }
    };
  }, [currentLivestream?.id, endpoint, user?.id]);
};

export default useSocket;
