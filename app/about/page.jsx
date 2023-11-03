import Image from "next/image";

export default function Page() {
  return (
    <div className="bg-white">
      <section className="w-full flex flex-row justify-center mx-auto pt-16">
        <img alt="hellohome logo" src="/hhlogo.png" className="h-28"></img>
        <div className="w-1/2 pl-16">
          <h1 className="text-2xl font-serif">
            About Hello Home Cleaning Company
          </h1>
          <div>

            <p className="pt-8">
              At Hello Home Cleaning Company, we believe that everyone deserves to
              come home to a clean and comfortable space. That's why we offer a
              wide range of home cleaning services to fit your needs and budget.
              Whether you need weekly, biweekly, or monthly cleaning, or you're
              looking for a one-time deep clean, we have you covered. We
              understand that your home is more than just a place to live; it's a
              reflection of you and your family. That's why we take the time to
              get to know your needs and preferences, and we develop a cleaning
              plan that's tailored to your specific home. Our team of experienced
              and professional cleaners are experts in their field. We use only
              the highest quality cleaning products and equipment, and we're
              committed to providing our customers with the best possible service.
              We're also proud to be a green company. We use eco-friendly cleaning
              products whenever possible, and we're committed to reducing our
              environmental impact. Here are just a few of the things that set
              Hello Home Cleaning Company apart from other home cleaning
              companies:
            </p>
            <ul className="pt-8 list-disc pl-6">
              <li>We're fully licensed and insured.</li>
              <li>We offer a satisfaction guarantee on all of our services.</li>
              <li>We're committed to using eco-friendly cleaning products.</li>
              <li>
                We offer a variety of services to fit your needs and budget.
              </li>
            </ul>
            <p className="pt-8" >
              Our team of experienced and professional cleaners are experts in
              their field. If you're looking for a high-quality and reliable home
              cleaning company in Perrysburg, Ohio, then look no further than
              Hello Home Cleaning Company. Contact us today for a free
              consultation!
            </p>
          </div>
        </div>
      </section >
      <section>
        <ul className="flex flex-wrap justify-center w-1 /2 pt-16">
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
    </div >
  );
}
