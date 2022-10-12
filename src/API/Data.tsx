import { CONFIG } from "../ENV";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection, doc, getDocs, onSnapshot  } from "firebase/firestore"; 

// Initialize Firebase
const app = initializeApp(CONFIG);
const db = getFirestore(app);

export async function addPost(msg:string){
    try {
        const docRef = await addDoc(collection(db, "msgs"), {
            message: msg,
            date: new Date().getTime(),
        });
    }
    catch (e) {
        
    }
}

function getFormatedDate(date:any){
    let newDate = new Date(date);
    return newDate.toLocaleDateString() + " " + newDate.toLocaleTimeString();
}

async function getAllInCollection(setDataFunc:any){
    let msgs:any[] = [];
    const querySnapshot = await getDocs(collection(db, "msgs"));
    console.log("======================================")
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      let d = doc.data();
      let m = "‎‎" + getFormatedDate(d["date"]) + " • " + d["message"] + "\n";
      let daten = new Date(d["date"]);
      console.log("Adding :" + m);
      msgs.push({
        msg: m,
        date: daten,
      });
    });

    console.log(msgs);

    msgs.sort(function(a:any,b:any){
        return b.date - a.date;
    });

    let finalM = "";
    msgs.forEach(element => {
        finalM += element.msg;
    });
    setDataFunc(finalM);
}

export async function getPosts(setDataFunc:any){
    getAllInCollection(setDataFunc);

    const subscribe = onSnapshot(collection(db, "msgs"), (doc) => {
        console.log("Doc Was Changed...");
        getAllInCollection(setDataFunc);
    });
}