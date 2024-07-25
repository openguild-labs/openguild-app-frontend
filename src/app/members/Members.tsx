"use client";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Members() {
  const [members, setMembers] = useState([]);
  const fetchData = async () => {
    const response = await axios.get("/api/mee6");
    setMembers(response?.data?.members);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="mt-8 max-w-[900px] mx-auto">
      <h1 className="font-medium text-xl text-black pb-2 mt-8 mb-4">Members Ranking</h1>{" "}
      {members.map((item: any, index: any) => (
        <div className="m-2 flex items-center rounded-lg bg-white p-2 shadow-md" style={{ flexWrap: "wrap" }}>
          {index === 0 && (
            <div
              className="bg-purple-600"
              style={{
                width: "30px",
                height: "30px",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                color: "white",
                fontWeight: "bold",
                borderRadius: "10px",
                marginRight: "20px",
              }}
            >
              🥇
            </div>
          )}
          {index === 1 && (
            <div
              className="bg-purple-600"
              style={{
                width: "30px",
                height: "30px",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                color: "white",
                fontWeight: "bold",
                borderRadius: "10px",
                marginRight: "20px",
              }}
            >
              🥈
            </div>
          )}
          {index === 2 && (
            <div
              className="bg-purple-600"
              style={{
                width: "30px",
                height: "30px",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                color: "white",
                fontWeight: "bold",
                borderRadius: "10px",
                marginRight: "20px",
              }}
            >
              🥉
            </div>
          )}
          {index > 2 && (
            <div
              className="bg-gray-400"
              style={{
                width: "30px",
                height: "30px",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                color: "white",
                fontWeight: "bold",
                borderRadius: "10px",
                marginRight: "20px",
              }}
            >
              {index + 1}
            </div>
          )}
          <img src={item.avatar} alt=" avatar" className="mr-6 h-10 w-10 rounded-full" />
          <h2 className="text-xl font-semibold">{item.username}</h2>
          <div className="text-gray-600" style={{ fontSize: "16px", margin: "0px 20px" }}>
            XP: {item.xp}
          </div>
          <div className="text-gray-600" style={{ fontSize: "16px", margin: "0px 20px" }}>
            Level: {item.level}
          </div>
        </div>
      ))}
    </div>
  );
}
