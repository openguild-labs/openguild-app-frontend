import ShareButton from "@/components/ShareButton";
import avatar from "@assets/images/game-avatar.png";

function Header() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-x-4">
          <img src={avatar} alt="avatar" className="w-[46px] h-[46px] rounded-full" />
          <span className="flex items-center text-sm">Ancient8</span>
        </div>
        <ShareButton />
      </div>
      <h1 className="text-[38px] mt-4">Onboarding to Nakame Social</h1>
    </div>
  );
}

export default Header;
