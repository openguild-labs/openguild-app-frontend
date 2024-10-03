interface ICommonInfoProps {
  imgSrc: string;
  participants: number;
}

function CommonInfo({ imgSrc, participants }: ICommonInfoProps) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="rounded-xl shadow-lg bg-white p-3 w-full flex flex-col gap-y-3 relative">
        <img loading="lazy" src={imgSrc} alt="thumbnail" className="object-contain rounded-lg" />
      </div>
      <div className="flex items-end">
        <div className="w-[40%]">
          <span>Total participant</span>
        </div>
        <div className="w-[60%]">
          <span className="text-2xl text-primary-color">{participants}</span>
        </div>
      </div>
    </div>
  );
}

export default CommonInfo;
