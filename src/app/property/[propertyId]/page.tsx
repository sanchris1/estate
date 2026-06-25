import FrontendLayout from "@/components/layouts/FrontendLayout";
import Navbar from "@/components/navbar/Navbar";
import EmailForm from "@/components/property/EmailForm";
import Image from "next/image";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRulerCombined } from "react-icons/fa6";
import { LuBath, LuBedDouble } from "react-icons/lu";

const PropertyPage = () => {
  return (
    <FrontendLayout>
      <Navbar variant="solid" />

      <section className="py-15 ">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="">
              <p className="text-sm font-semibold uppercase text-primary tracking-[0.25em]">
                For sale
              </p>
              <h2 className="mt-3 text-4xl font-bold text-text md:text-5xl">
                Modern Luxury Apartment
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 my-6">
                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1">
                  <FaMapMarkerAlt size={16} className="text-neutral-400" />
                  <span className="font-medium text-neutral-800">
                    Manhattan, New York
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1">
                  <FaRulerCombined size={16} className="text-neutral-400" />
                  <span className="font-medium text-neutral-800">
                    2200 sqft
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1">
                  <LuBedDouble size={16} className="text-neutral-400" />
                  <span className="font-medium text-neutral-800">7 rooms</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1">
                  <LuBath size={16} className="text-neutral-400" />
                  <span className="font-medium text-neutral-800">2 Baths</span>
                </div>
              </div>
            </div>
            <div className="rounded-[28px] border border-black/5 bg-card p-6 shadow-sm ">
              <p className="text-sm text-text/60">Property price</p>
              <h2 className="mt-2 text-4xl font-bold text-primary">
                $2,500,000
              </h2>
            </div>
          </div>

          <div className="w-full h-60 md:h-100 lg:h-120 relative my-6">
            <Image
              src="/images/image1.jpg"
              alt="image"
              fill
              className="rounded-2xl object-cover"
            />
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-3 ">
            {/* left */}
            <div className="lg:col-span-2">
              <div className="rounded-4xl border border-black/5 bg-card p-8 shadow-sm">
                <h2 className="text-3xl font-bold text-text">
                  About this property
                </h2>
                <p className="mt-6 leading-relaxed text-text/70">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perferendis, quis ex. Error dolorum numquam officia quis
                  dolorem ad nostrum aspernatur nisi consectetur facilis
                  obcaecati necessitatibus ipsa, aut quasi fuga similique!
                </p>
              </div>
            </div>

            {/* right */}
            <EmailForm />
          </div>
        </div>
      </section>
    </FrontendLayout>
  );
};

export default PropertyPage;
