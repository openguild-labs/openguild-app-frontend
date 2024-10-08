// import ShareButton from "@/components/ShareButton";
// import Image from "next/image";

interface IHeaderDetailsProps {
  title: string;
}

function HeaderDetails({ title }: IHeaderDetailsProps) {
  return (
    <>
      {/* <div className="flex items-center justify-between">
        <div className="flex gap-x-4">
          <Image
            src={"/assets/images/logo.png"}
            alt="avatar"
            width={46}
            height={46}
            className="rounded-full border border-neutral-400 bg-white"
          />
          <span className="flex items-center text-sm text-black">OpenGuild</span>
        </div>
        <ShareButton />
      </div> */}
      <h1 className="text-2xl font-medium mt-4 text-primary-color">{title}</h1>
    </>
  );
}

export default HeaderDetails;
