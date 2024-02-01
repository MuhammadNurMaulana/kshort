import { app } from "@/common/service/lib/firebase/init";
import bcrypt from "bcrypt";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
const firestore = getFirestore(app);
export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    const q = query(collection(firestore, "users"), where("email", "==", reqBody.email));
    const snapshot = await getDocs(q);

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (data.length > 0) {
      return NextResponse.json({ message: "Email already exist" });
    } else {
      if (!reqBody.role) {
        reqBody.role = "member";
      }

      reqBody.password = await bcrypt.hash(reqBody.password, 10);

      await addDoc(collection(firestore, "users"), reqBody);

      return NextResponse.json({ message: "Register success" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Register failed" });
  }
}

// const reqBody = await req.json();

//     const q = query(collection(firestore, "users"), where("email", "==", reqBody.email));
//     const snapshot = await getDocs(q);

//     const data = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));

//     if (data.length > 0) {
//       return NextResponse.json({ message: "Email already exist" });
//     } else {
//       if (!reqBody.role) {
//         reqBody.role = "member";
//       }
//       reqBody.password = await bcrypt.hash(reqBody.password, 15);

//       await addDoc(collection(firestore, "users"), reqBody);
//       return NextResponse.json({ message: "Register success" });
//     }
