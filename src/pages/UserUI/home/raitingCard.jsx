import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Rating,
} from "@material-tailwind/react";
import image from '../../../assets/image/user.png';
import React, { useRef, useState, useEffect } from "react";

const ratingData = [
  {
      comment: "So much easier to visualize and plan a road trip to my favorite rock climbing.",
      avatarSrc: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
      authorName: "Tania Andrew",
      jobTitle: "Travel Blogger",
      ratingValue: 5,
  },
  {
      comment: "I love using this app to discover new hiking trails. It's been a game-changer for me!",
      avatarSrc: image,
      authorName: "John Doe",
      jobTitle: "Outdoor Enthusiast",
      ratingValue: 4,
  },
  {
      comment: "Great app for planning weekend getaways. Highly recommended and user-friendly!",
      avatarSrc: image,
      authorName: "Jane Smith",
      jobTitle: "Travel Blogger",
      ratingValue: 5,
  },
  {
      comment: "I've used this app for my last three road trips, and it's been incredibly helpful. Five stars!",
      avatarSrc: image,
      authorName: "Michael Johnson",
      jobTitle: "Road Trip Enthusiast",
      ratingValue: 5,
  },
  {
      comment: "The app helped me organize all my travel plans seamlessly. Absolutely love it!",
      avatarSrc: image,
      authorName: "Michael Johnson",
      jobTitle: "Road Trip Enthusiast",
      ratingValue: 5,
  },
];


export function SimpleCard() {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollPosition = () => {
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
  };

  useEffect(() => {
    const container = containerRef.current;
    checkScrollPosition();
    container.addEventListener("scroll", checkScrollPosition);

    return () => container.removeEventListener("scroll", checkScrollPosition);
  }, []);

  const scroll = (direction) => {
    const { scrollLeft, clientWidth } = containerRef.current;
    const newScrollPosition =
      direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
    containerRef.current.scrollTo({ left: newScrollPosition, behavior: "smooth" });
  };

  return (
    <div className="relative py-8 px-4">
      {/* Left arrow */}
      {canScrollLeft && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow"
          onClick={() => scroll("left")}
        >
          &#8249;
        </button>
      )}

      {/* Scrollable content */}
      <div
        ref={containerRef}
        className="overflow-x-auto flex flex-nowrap gap-4 scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Hide scrollbar for WebKit browsers */}
        <style>
          {`
            div::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        {ratingData.map((data, index) => (
          <div
            key={index}
            className="flex-none w-[100%] sm:w-[50%] md:w-[25%] lg:w-[25%] xl:w-[25%]"
          >
            <Card className="w-full h-full">
              <CardBody>
                <Typography color="blue-gray" className="mb-2">
                  {data.comment}
                </Typography>
                <Avatar
                  src={data.avatarSrc}
                  alt="Avatar"
                  size="sm"
                  className="mt-2"
                />
                <Typography variant="h6" className="mt-2">
                  {data.authorName}
                </Typography>
                <Typography color="gray" className="mb-2">
                  {data.jobTitle}
                </Typography>
                <Rating value={data.ratingValue} readonly />
              </CardBody>
              <CardFooter className="pt-0">
                {/* Optional Footer Content */}
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {/* Right arrow */}
      {canScrollRight && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow"
          onClick={() => scroll("right")}
        >
          &#8250;
        </button>
      )}
    </div>
  );
}
