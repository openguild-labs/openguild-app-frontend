import { useNavigate } from "react-router-dom";
import { Button } from "@headlessui/react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-center mt-[74px] text-3xl">404</div>
      <h1 className="text-xl font-bold text-center mt-5">
        It looks like you’re lost
      </h1>

      <div className="flex justify-center mt-[70px]">
        <Button
          className="bg-neutral-800 text-white rounded-lg px-4 py-2"
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
