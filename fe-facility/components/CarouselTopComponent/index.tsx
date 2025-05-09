"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel } from "primereact/carousel";
import Link from "next/link";

interface Facility {
  _id: string;
  name: string;
  status: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export default function CarouselTopComponent(props: any) {
  const [data, setData] = useState<any[]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    if (props.data) {
      const filteredData = props.data.filter((item: any) => item.totalBooked > 0);
      setData(filteredData);
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // Gọi ngay lần đầu tiên
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [props.data]);

  const productTemplate = (facility: any) => {
    return (
      <Link href={"/detail/" + facility._id}>
        <div
          className={`relative text-center h-72 cursor-pointer m-5 z-50 shadow-xl border rounded-lg ${
            data.length === 1 ? "w-5 flex justify-center" : ""
          }`}
        >
          <Image
            width={500}
            height={500}
            src={facility.image ? facility.image : "https://picsum.photos/200/300"}
            alt={facility.name}
            className="w-screen h-full rounded-lg"
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white px-2 pb-2 rounded-b-lg">
            <p className="font-bold">{facility.name}</p>
          </div>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black hover:bg-opacity-80 p-2 rounded-full">
            <button className="text-white px-3 w-fit">
              {facility?.totalBooked} lần sử dụng
            </button>
          </div>
        </div>
      </Link>
    );
  };

  // Điều chỉnh numVisible dựa trên kích thước màn hình
  let numVisible = 4;
  if (windowWidth <= 640) {
    numVisible = 1;  // Mobile: Hiển thị 1 item
  } else if (windowWidth <= 1024) {
    numVisible = 2;  // Tablet: Hiển thị 2 items
  }

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32">
      <Carousel
        key={numVisible}  // Trigger lại render carousel khi numVisible thay đổi
        value={data}
        numVisible={numVisible}
        numScroll={2}
        circular
        prevIcon={
          <div className="bg-gray-300 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="14"
              viewBox="0 0 448 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </div>
        }
        nextIcon={
          <div className="bg-gray-300 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="14"
              viewBox="0 0 448 512"
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </div>
        }
        showIndicators={false}
        autoplayInterval={3000}
        itemTemplate={productTemplate}
      />
    </div>
  );
}
