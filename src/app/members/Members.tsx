"use client";
import { CircularProgress } from "@mui/material";
import { useListMee6Members } from "../api/services";

const renderList = (members: any[], isLoading: boolean) => {
  if (isLoading) {
    return (
      <div className="flex justify-center">
        {" "}
        <CircularProgress color="primary" size={32} />
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center mt-4">
        <img alt="empty image" src="/assets/images/planet.png" className="w-[80px] h-[80px]" />
        <span>Have no member</span>
      </div>
    );
  }

  return members.map((item: any, index: any) => (
    <div key={index} className="m-2 flex items-center rounded-lg bg-white p-2 shadow-md" style={{ flexWrap: "wrap" }}>
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
  ));
};

export default function Members() {
  const { data, isFetching } = useListMee6Members();

  return (
    <div className="mt-8 max-w-[900px] mx-auto">
      <h1 className="text-[40px] text-primary-color font-bold pb-2 mt-8 mb-4 border-b border-neutral-300">Members Ranking</h1>
      {renderList(data || [], isFetching)}
    </div>
  );
}
