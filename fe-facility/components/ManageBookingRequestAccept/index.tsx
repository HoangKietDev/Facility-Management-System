import {
  faFileCsv,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination, PaginationProps, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { getAllBooking } from "../../services/booking.api";
import { ProgressSpinner } from "primereact/progressspinner";
import { log } from "console";

export default function ManageBookingRequestAccept() {
  const [bookingData, setBookingData] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [activePage, setActivePage] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  useEffect(() => {
    setIsSpinning(true)
    getAllBooking(2)
      .then((res) => {
        setIsSpinning(false)
        console.log('====================================');
        console.log("dataBooking::",res?.data?.booking);
        console.log('====================================');
        setBookingData(res?.data?.booking);
        setTotalPage(res?.data?.totalPage);
        setActivePage(res?.data?.activePage);
      })
      .catch((err) => {
        setIsSpinning(false)
        setBookingData([]);
        setTotalPage(0);
        setActivePage(0);
      });
  }, []);

  const onChangePage: PaginationProps["onChange"] = (pageNumber) => {
    getAllBooking(2, null, pageNumber)
      .then((res) => {
        setBookingData(res?.data?.booking);
        setTotalPage(res?.data?.totalPage);
        setActivePage(res?.data?.activePage);
      })
      .catch((err) => {
        setBookingData([]);
        setTotalPage(0);
        setActivePage(0);
      });
  };

  const handleSearch = (text: any) => {
    getAllBooking(2, "default", 1, 5, text)
      .then((res) => {
        setBookingData(res?.data?.booking);
        setTotalPage(res?.data?.totalPage);
        setActivePage(res?.data?.activePage);
      })
      .catch((err) => {
        setBookingData([]);
        setTotalPage(0);
        setActivePage(0);
      });
  };


function formatDate(dateString: any) {
  // Kiểm tra nếu dateString không tồn tại hoặc không phải là chuỗi hợp lệ
  if (!dateString || typeof dateString !== 'string') {
      console.error('Invalid date string:', dateString);
      return 'Invalid date';
  }

  const dateTimeParts = dateString.split("T");

  // Kiểm tra nếu mảng dateTimeParts không có ít nhất 2 phần tử
  if (dateTimeParts.length < 2) {
      console.error('Invalid date-time format:', dateString);
      return 'Invalid format';
  }

  const datePart = dateTimeParts[0];
  const timePart = dateTimeParts[1].substring(0, 8); // Lấy chỉ thời gian, bỏ qua phần mili giây và múi giờ

  return `${timePart} ${datePart}`;
}

  return (
    <div>
      <div>
        <div className="border flex flex-col justify-center">
          <div className="border text-center">
            <p className="text-2xl p-2 bg-blue-500 text-white font-semibold">
              Các yêu cầu được duyệt
            </p>
          </div>
          <div className="py-2 flex justify-between bg-blue-100">
          

            <div>
              <input
                type="text"
                className="outline-none border border-gray-300 h-7 p-1 rounded-full"
                placeholder="Điền kí tự để tìm kiếm ..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          <table>
            <thead className="border">
              <tr>
                <th className="p-5 border">#</th>
                <th className="p-5 border">Tên phòng (sân)</th>
                <th className="p-5 border">Slot</th>
                <th className="p-5 border">Thời gian bắt đầu</th>
                <th className="p-5 border">Thời gian kết thúc</th>
                <th className="p-5 border">Người duyệt</th>
         
                <th className="p-5 border">Người đặt</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookingData?.map((b, index) => {
                const status = b?.status;

                // if (status === 2) {
                  return (
                    <tr className="border">
                      <td className="p-5 border text-center">
                        <p>{index + 1}</p>
                      </td>
                      <td className="p-5 border text-center">
                        <p className="cursor-pointer hover:text-gray-400 flex items-center justify-center gap-1">
                          <span>{b?.facilityId?.name}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height={10}
                            width={10}
                            viewBox="0 0 512 512"
                          >
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                          </svg>
                        </p>
                      </td>
                      <td className="p-5 border text-center">
                        <p>{b?.slot}</p>
                      </td>
                      <td className="p-5 border text-center">
                          <p>{b && formatDate(b?.startDate)}</p>
                        </td>
                        <td className="p-5 border text-center">
                          <p>{b && formatDate(b?.endDate)}</p>
                        </td>
                      <td className="p-5 border text-center">
                        <p>{b?.handler?.name}</p>
                      </td>
                      
                      <td className="p-5 border text-center">
                        <p className="cursor-pointer hover:text-gray-400 flex items-center justify-center gap-1">
                          <span>{b?.booker?.name}</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height={10}
                            width={10}
                            viewBox="0 0 512 512"
                          >
                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                          </svg>
                        </p>
                      </td>
                    </tr>
                  );
                }
              // }
              )}
            </tbody>
          </table>
          {isSpinning === true ? (
            <ProgressSpinner
              className="w-52 h-52 my-10"
              strokeWidth='3'
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          ) : (
            <>
              {!Array.isArray(bookingData) || bookingData.length === 0 ? (
                <div className="text-center">
                  <h1 className="font-bold text-3xl my-10">No data</h1>
                </div>
              ) : null}
              {totalPage > 1 && (
                <div className="flex items-center justify-center my-5">
                  <Pagination
                    current={activePage}
                    total={Number(`${totalPage}0`)}
                    onChange={onChangePage}
                    showSizeChanger={false}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
