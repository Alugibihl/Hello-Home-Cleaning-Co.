import Image from "next/image";

export default function Page() {
  return (
    <div className="bg-white">
      <section className="w-full flex flex-row justify-center mx-auto pt-16">
        <img alt="hellohome logo" src="/hhlogo.png" className="h-28"></img>
        <div className="w-1/2 pl-16">
          <h1 className="text-2xl font-serif">About us</h1>
          <p className="pt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>
      <section>
        <ul className="flex flex-wrap justify-center w-1/2 pt-16">
          <li>
            <div className="p-6">
              <img src="/personholder.png" className="w-52"></img>
              <h3 className="font-bold">Person One</h3>
              <p className="text-slate-400">CEO</p>
            </div>
          </li>
          <li>
            <div className="p-6">
              <img src="/personholder.png" className="w-52"></img>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}
