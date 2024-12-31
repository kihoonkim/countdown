import {newId} from "../utils/id-generater.ts";
import {ref, set, query, onValue, onChildAdded, orderByChild, limitToLast} from "firebase/database";
import {getDB} from "../firebase-helper.ts";


const db = getDB();
export async function sendMessage(name: string, message: string) {
  await set(ref(db, '/chats/' + newId()), {
    name, message, createdAt: Date.now()
  });
}

export type MessageType = {
  id: string;
  name: string;
  message: string;
}
export async function listenChatMessages(): Promise<MessageType[]> {
  return new Promise((resolve) => {
    const chatRef = query(ref(db, 'chats'), orderByChild('createdAt'), limitToLast(100))
    onValue(chatRef, (snapshot) => {
      const messages: MessageType[] = [];
      snapshot.forEach((childSnapshot) => {
        messages.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      });
      resolve(messages)
    });
  })
}

export function listenNewChatMessages(onReceived: (msg: MessageType) => void) {
  const chatRef = query(ref(db, 'chats'), orderByChild('createdAt'), limitToLast(30))
  return onChildAdded(chatRef, (snapshot) => {
    onReceived({
      id: snapshot.key,
      ...snapshot.val(),
    })
  });
}
