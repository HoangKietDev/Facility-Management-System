"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel } from "primereact/carousel";
import { Tooltip } from "antd";
import Link from "next/link";
import { getCategory } from "../../services/category.api";

interface Category {
  _id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
  image: string;
}

export default function CarouselComponent(props: any) {
  const [cate, setCate] = useState<Category[]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    // Lấy dữ liệu danh mục
    getCategory(null, null, 1000000000)
      .then((response: any) => {
        setCate(response.data.item);
      })
      .catch((error) => console.error("Error fetching category"));

    // Hàm cập nhật kích thước cửa sổ
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Gọi lần đầu khi component mount và thêm sự kiện resize
    handleResize();  // Gọi ngay lần đầu tiên để set giá trị ban đầu
    window.addEventListener("resize", handleResize);

    // Dọn dẹp sự kiện resize khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!cate) {
    return <div>loading...</div>;
  }

  const productTemplate = (cate: Category) => {
    return (
      <Link href={"/search?category=" + cate._id}>
        <div className="relative text-center h-96 cursor-pointer m-5 z-50 shadow-xl border rounded-lg">
          <Image
            width={500}
            height={500}
            src={cate.image}
            alt={cate.categoryName}
            className="w-full h-full rounded-lg"
          />
          <div className="absolute top-72 left-1/2 -translate-x-1/2 bg-white rounded-lg p-3">
            <Tooltip title={cate.categoryName}>
              <h4 className="w-28 mb-1 font-bold text-lg overflow-hidden whitespace-nowrap text-ellipsis">
                {cate.categoryName}
              </h4>
            </Tooltip>
          </div>
        </div>
      </Link>
    );
  };

  // Điều chỉnh numVisible và numScroll dựa trên kích thước màn hình
  let numVisible = 3;
  if (windowWidth <= 640) {
    numVisible = 1;  // Mobile: Hiển thị 1 item
  } else if (windowWidth <= 1024) {
    numVisible = 2;  // Tablet: Hiển thị 2 items
  }

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32">
      <Carousel
        key={numVisible}  // Thêm key vào Carousel để trigger render lại khi numVisible thay đổi
        value={cate}
        numVisible={numVisible}  // Điều chỉnh số lượng items hiển thị dựa trên kích thước màn hình
        numScroll={1}   
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
