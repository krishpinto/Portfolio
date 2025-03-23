import { FaLocationArrow } from "react-icons/fa6";
import Image from "next/image";
import { socialMedia } from "@/data";

export const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <Image
          src="/footer-grid.svg"
          alt="grid"
          width={1920}
          height={1080}
          className="w-full h-full opacity-50"
        />
      </div>

      <div className="relative">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-8">
              Get in Touch
            </h2>
            <div className="flex justify-center gap-8 mb-12">
              <div className="flex flex-col items-center gap-2">
                <FaLocationArrow className="text-4xl text-white" />
                <p className="text-white/80">Mumbai, India</p>
              </div>
            </div>

            <div className="flex justify-center gap-8 mb-12">
              {socialMedia.map((info) => (
                <a
                  key={info.id}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300 hover:scale-110 transition-transform"
                >
                  <Image
                    src={info.img}
                    alt={info.alt}
                    width={24}
                    height={24}
                    className="cursor-pointer hover:opacity-70 transition-opacity"
                  />
                </a>
              ))}
            </div>

            <div className="text-center text-white/80 text-sm">
              <p> 2024 Krish Pinto. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};