import { Divider } from "antd";

export default function EasyAChallenge() {
  return (
    <div className="pt-5">
      <div className="shadow-lg py-10 mx-auto px-10 border" style={{ maxWidth: 700, borderRadius: 20 }}>
        <div className="flex justify-center items-center">
          <img width={50} height={50} className="object-cover mr-5 relative rounded-lg" src={"/assets/images/easya-logo.png"} alt="easya" />
          <h1 className="text-2xl font-bold">
            <span className="text-primary-color">EasyA x OpenGuild</span> Challenge
          </h1>
        </div>
        <br />
        <Divider />
        <div style={{ flexDirection: "column" }} className="flex justify-center items-center">
          <h2 className="text-xl font-bold">What is this challenge?</h2>
          <p className="mt-3">
            Explore the Polkadot ecosystem in-depth and uncover the fascinating realm of Kusama. Throughout this journey, you'll also dive
            into the world of parachains, a groundbreaking concept that sets Polkadot apart!
          </p>
          <Divider />
          <a href="https://github.com/EasyA-Tech/web3-content/blob/main/polkadot.json" className="mt-3 underline text-blue-500">
            Powered by the open-source data from EasyA Web3 Content
          </a>
        </div>
      </div>
    </div>
  );
}
