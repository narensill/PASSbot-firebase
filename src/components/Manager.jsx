import React, { useEffect, useState, useRef } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import db from "../firebase.js";
import Sidebar from "./Sidebar.jsx";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const savePassword = async () => {
    try {
      const docRef = await addDoc(collection(db, "passwords"), form);
      const newPassword = { ...form, id: docRef.id };
      setPasswordArray([...passwordArray, newPassword]);
      setForm({ site: "", username: "", password: "" });
      console.log("Password saved successfully with ID:", docRef.id);
    } catch (error) {
      console.error("Error saving password:", error);
    }
  };

  const deletePassword = async (id) => {
    try {
      await deleteDoc(doc(db, "passwords", id));
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      console.log("Password deleted successfully with ID:", id);
    } catch (error) {
      console.error("Error deleting password:", error);
    }
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find((item) => item.id === id);
    if (passwordToEdit) {
      setForm(passwordToEdit);
      deletePassword(id);
    }
  };

  const noPass = () => {
    alert("Add passwords to show");
  };

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "passwords"));
        const fetchedPasswords = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPasswordArray(fetchedPasswords);
        console.log("Passwords fetched successfully:", fetchedPasswords);
      } catch (error) {
        console.error("Error fetching passwords:", error);
      }
    };

    fetchPasswords();
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("/eyec.png")) {
      ref.current.src = "/eyeo.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "/eyec.png";
      passwordRef.current.type = "text";
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log("Copied to clipboard:", text);
    });
  };

  const clearPasswords = async () => {
    try {
      for (let password of passwordArray) {
        await deleteDoc(doc(db, "passwords", password.id));
      }
      setPasswordArray([]);
      setForm({ site: "", username: "", password: "" });
      console.log("All passwords cleared successfully!");
    } catch (error) {
      console.error("Error clearing passwords:", error);
    }
  };

  return (
    <>
    <Sidebar />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:100vh]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className="md:mycontainer">
        <h1 className="text-4xl text-sky-900 font-bold text-center">
          <span className="text-blue-700">&lt;</span>PASS
          <span className="text-blue-700">
            <span className="text-green-600">bot</span>/&gt;
          </span>
        </h1>
        <p className="text-center text-lg text-blue-700 ">
          Your Multitasking Password Manager
        </p>
        <div className="text-white flex flex-col fle p-4 gap-4 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Service Name"
            className="rounded-lg gap-3 border border-sky-700 w-full text-black p-4 py-1"
            type="text"
            name="site"
            id="a"
          />
          <div className="flex flex-col md:flex-row gap-1 w-full">
            <input
              placeholder="Enter Username"
              value={form.username}
              onChange={handleChange}
              className="rounded-lg border border-sky-700 w-full text-black p-4 py-1"
              type="text"
              name="username"
              id="b"
            />
            <div className="relative w-full ">
              <input
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                className="rounded-lg border border-sky-700 w-full text-black p-4 py-1"
                type="password"
                name="password"
                id="c"
                ref={passwordRef}
              />
              <span className="absolute right-3 top-2">
                <img
                  ref={ref}
                  style={{ width: "20px", height: "17px", cursor: "pointer" }}
                  src="/eyec.png"
                  alt="show"
                  onClick={showPassword}
                />
              </span>
            </div>
          </div>
          {(!form.site || !form.username || !form.password) && (
            <div className="text-red-500 text-sm mb-4">
              All fields must be filled to add a password.
            </div>
          )}
          <button
            onClick={savePassword}
            disabled={!form.site || !form.username || !form.password}
            className="text-black bg-sky-100 flex justify-center items-center rounded-full px-4 py-2 w-fit hover:bg-blue-200 transition-transform transform hover:scale-105 hover:drop-shadow-lg border border-blue-800 hover:font-bold"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              stroke="bold"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h1 className="font-bold text-2xl text-center py-3 text-blue-950">
            Your Passwords
          </h1>
          {passwordArray.length === 0 && (
            <div className="flex justify-center items-center hover:font-bold ">
              <div
                className="justify-center w-60 items-center text-center py-5 text-red-500 transition-transform transform hover:scale-105 hover:drop-shadow-lg text-md border border-red-400"
                onClick={noPass}
              >
                No Passwords to show
              </div>
            </div>
          )}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full">
              <thead className="bg-sky-700 text-sky-950">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-sky-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 text-center min-w-32 border border-sky-200">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0 10px",
                        }}
                      >
                        <span style={{ flex: 1, textAlign: "center" }}>
                          {item.site}
                        </span>
                        <img
                          src="paste.png"
                          className="transition-transform transform hover:scale-110 hover:drop-shadow-lg"
                          alt="paste"
                          onClick={() => copyText(item.site)}
                          style={{
                            cursor: "pointer",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-2 text-center min-w-32 border border-sky-200">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0 10px",
                        }}
                      >
                        <span style={{ flex: 1, textAlign: "center" }}>
                          {item.username}
                        </span>
                        <img
                          className="transition-transform transform hover:scale-110 hover:drop-shadow-lg"
                          src="paste.png"
                          alt="paste"
                          onClick={() => copyText(item.username)}
                          style={{
                            cursor: "pointer",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-2 text-center min-w-32 border border-sky-200">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0 10px",
                        }}
                      >
                        <span style={{ flex: 1, textAlign: "center" }}>
                          {item.password}
                        </span>
                        <img
                          className="transition-transform transform hover:scale-110 hover:drop-shadow-lg"
                          src="paste.png"
                          alt="paste"
                          onClick={() => copyText(item.password)}
                          style={{
                            cursor: "pointer",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-2 text-center min-w-32 border border-sky-200">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "0 10px",
                        }}
                      >
                        <img
                          className="transition-transform transform hover:scale-110 hover:drop-shadow-lg"
                          src="trash.png"
                          alt="trash"
                          onClick={() => deletePassword(item.id)}
                          style={{
                            cursor: "pointer",
                            width: "22px",
                            height: "22px",
                            margin: "10px",
                          }}
                        />
                        <img
                          className="transition-transform transform hover:scale-110 hover:drop-shadow-lg"
                          src="edit.png"
                          alt="edit"
                          onClick={() => editPassword(item.id)}
                          style={{
                            cursor: "pointer",
                            width: "22px",
                            height: "22px",
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {passwordArray.length > 0 && (
            <div className="flex justify-center mt-4">
              <button
                onClick={clearPasswords}
                className="text-black bg-red-100 flex justify-center items-center rounded-full px-4 py-2 w-fit hover:bg-red-200 transition-transform transform hover:scale-105 hover:drop-shadow-lg border border-red-800 hover:font-bold"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/rypcsrlk.json"
                  trigger="hover"
                  colors="primary:#121331,secondary:#c71f16"
                ></lord-icon>
                Clear All Passwords
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
