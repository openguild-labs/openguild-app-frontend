import ShareButton from "@/components/ShareButton";
import avatar from "@assets/images/logo.png";

interface IHeaderProps {
  title: string;
}

function Header({ title }: IHeaderProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-x-4">
          <img src={avatar} alt="avatar" className="w-[46px] h-[46px] rounded-full border border-neutral-400 bg-white" />
          <span className="flex items-center text-sm text-black">OpenGuild</span>
        </div>
        <ShareButton />
      </div>
      <h1 className="text-[2rem] lg:text-[40px] mt-4 text-primary-color">{title}</h1>
    </div>
  );
}

export default Header;
