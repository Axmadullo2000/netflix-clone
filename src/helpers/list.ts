import {collection} from "firebase/firestore";

import {getDocs} from "@firebase/firestore";
import {db} from "@/firebase";
import {MyList} from "@/interfaces/app.interface";

export const getList = async (token?: string) => {
    const myList: MyList[] = []
    const querySnapshot = await getDocs(collection(db, "product"));
    querySnapshot.forEach((doc) => {
        if (doc.data().token === token) {
            myList.push(doc.data() as MyList)
        }
    })

    return myList
}


