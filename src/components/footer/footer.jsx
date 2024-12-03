import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { Typography } from "@material-tailwind/react";

function FooterWithSocialLinks() {
  return (
    <div className="bg-gray-300 py-12 mt-24">
      <div className=" flex flex-col md:flex-row justify-between items-center px-24">
        <Typography
          as="a"
          href="#"
          className="text-2xl font-bold text-[#f75940] hover:text-[#e54632] lg:text-3xl w-auto"
        >
          Travel Tide
        </Typography>

        <h1 className="text-center text-lg">
          Copyright © 2024{" "}
          <span className="text-[#f75940] hover:text-[#e54632] font-bold">
            Travel Tide Private Limited
          </span>
          . All Rights Reserved.
        </h1>

        <div className="flex gap-6 mt-4 md:mt-0 text-2xl">
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-[#e54632] transition-colors"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-[#e54632] transition-colors"
          >
            <FiFacebook />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-[#e54632] transition-colors"
          >
            <FaXTwitter />
          </a>
        </div>
      </div>
    </div>
  );
}

export default FooterWithSocialLinks;
