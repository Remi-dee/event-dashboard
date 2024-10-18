"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import ArrowLeft from "../assets/arrow_left.png";
import ArrowRight from "../assets/arrow_right.png";
import Download from "../assets/download.png";

// Mock data
const mockData = [
  {
    name: "Cloud Innovation Summit",
    date: "2024-10-15",
    speaker: "Jane Doe",
    status: "Completed",
  },
  {
    name: "Blockchain Revolution Conference",
    date: "2024-11-05",
    speaker: "Dr. Peter Smith",
    status: "In Progress",
  },
  {
    name: "AI in Healthcare Symposium",
    date: "2024-12-01",
    speaker: "Dr. Aisha Malik",
    status: "Completed",
  },
  {
    name: "Future of Fintech Forum",
    date: "2024-10-25",
    speaker: "John Lee",
    status: "Completed",
  },
  {
    name: "Data Analytics in Business",
    date: "2024-11-12",
    speaker: "Rachel Moore",
    status: "Completed",
  },
  {
    name: "Sustainable Energy Expo",
    date: "2024-09-28",
    speaker: "Prof. Alan Green",
    status: "In Progress",
  },
  {
    name: "Web3 Interfaces Workshop",
    date: "2024-10-10",
    speaker: "Kevin Adams",
    status: "In Progress",
  },
  {
    name: "Cybersecurity for Startups",
    date: "2024-11-19",
    speaker: "Emily Zhang",
    status: "Completed",
  },
  {
    name: "Smart Cities Forum",
    date: "2024-10-18",
    speaker: "Dr. Maria Hernandez",
    status: "In Progress",
  },
  {
    name: "Tech Safari Mixer",
    date: "2024-09-30",
    speaker: "Kevin Adams",
    status: "In Progress",
  },
];

const EventHistory = () => {
  const [filteredData, setFilteredData] = useState(mockData);
  const [filter, setFilter] = useState({ name: "", status: "", date: "" });
  const [sortOrder, setSortOrder] = useState("Most Recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const pages = [...Array(totalPages).keys()].map((i) => i + 1); // Array of page numbers

  // Filtering and Sorting
  useEffect(() => {
    let updatedData = mockData;

    // Filtering logic
    if (filter.name) {
      updatedData = updatedData.filter((item) =>
        item.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    }
    if (filter.status) {
      updatedData = updatedData.filter((item) => item.status === filter.status);
    }
    if (filter.date) {
      updatedData = updatedData.filter((item) =>
        item.date.includes(filter.date)
      );
    }

    // Sorting logic
    if (sortOrder === "Most Recent") {
      updatedData.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOrder === "Oldest") {
      updatedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOrder === "Name") {
      updatedData.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredData(updatedData);
  }, [filter, sortOrder]);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  // CSV download logic
  const downloadCSV = () => {
    const headers = ["Event Name", "Date", "Speaker", "Status"];
    const rows = filteredData.map((event) => [
      event.name,
      event.date,
      event.speaker,
      event.status,
    ]);

    let csvContent = `data:text/csv;charset=utf-8,${headers.join(",")}\n`;
    rows.forEach((rowArray) => {
      let row = rowArray.join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "event_history.csv");
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-medium leading-5 text-left mb-[12px]  lg:mb-[14px]">
        Event History
      </h1>

      <div className="flex justify-between items-center">
        {/* Filters and Sorting */}
        <div className="flex gap-[8px] mb-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-[200px] p-2 border border-[#E2E8F0] rounded text-[#CBD5E1]"
            onChange={(e) => setFilter({ ...filter, name: e.target.value })}
          />

          <input
            type="date"
            placeholder="Date"
            className=" px-4 py-2 border border-[#E2E8F0] rounded"
            onChange={(e) => setFilter({ ...filter, date: e.target.value })}
          />

          <select
            className="px-4 py-2 border border-[#E2E8F0] rounded"
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="">Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>

          <select
            className="px-4 py-2 border border-[#E2E8F0] rounded"
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          >
            <option value="">Name</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>

          <div class="flex items-center gap-1">
            <span>Sort: </span>
            <select
              className="px-4 py-2 border border-[#E2E8F0] rounded"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="Most Recent"> Most Recent</option>
              <option value="Oldest">Oldest</option>
              <option value="Name">Name</option>
            </select>
          </div>
        </div>
        <div>
          {" "}
          <h1 className="text-[18px] font-medium leading-5 text-left mb-[12px]  lg:mb-[14px]">
            Displaying {rowsPerPage} rows
          </h1>
        </div>
        {/* Download CSV Button */}
        <div className="mb-4">
          <button
            className="flex items-center gap-3 px-4 py-2 border border-[#E2E8F0] text-black rounded hover:bg-gray-400"
            onClick={downloadCSV}
          >
            <Image
              aria-hidden
              src={Download}
              alt="Arrow up"
              width={12}
              height={12}
            />
            <span> Export</span>
          </button>
        </div>{" "}
      </div>

      {/* Table */}
      <table className="min-w-full table-auto ">
        <thead>
          <tr className="bg-gray-200 ">
            <th className="p-4  text-[12px] font-semibold leading-[16px] text-left text-[#64748B]">
              Event Name
            </th>
            <th className="p-4  text-[12px] font-semibold leading-[16px] text-left text-[#64748B]">
              Date
            </th>
            <th className="p-4  text-[12px] font-semibold leading-[16px] text-left text-[#64748B]">
              Speaker
            </th>
            <th className="p-4  text-[12px] font-semibold leading-[16px] text-left text-[#64748B]">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="text-[#334155]">
          {currentRows.map((event, index) => (
            <tr key={index} className="">
              <td className="p-2">{event.name}</td>
              <td className="p-2">{event.date}</td>
              <td className="p-2">{event.speaker}</td>

              <td className="p-2">
                <span
                  className={`relative inline-flex items-center px-[8px] py-[4px] text-xs rounded-[100px] ${
                    event.status === "Completed"
                      ? "bg-[#D1FAE5] text-[#10B981]"
                      : "bg-[#DBEAFE] text-[#3B82F6]"
                  }`}
                >
                  {/* Circle indicator inside the status */}
                  <span
                    className={`absolute left-2 inline-block w-[8px] h-[8px] rounded-full ${
                      event.status === "Completed"
                        ? "bg-[#10B981]" // Green for completed
                        : "bg-[#3B82F6]" // Blue for in progress
                    }`}
                  ></span>

                  {/* Shift text to make room for the circle */}
                  <span className="ml-4">{event.status}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}

      <div className="flex justify-between">
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`font-semibold p-[16px] border rounded ${
              currentPage === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <Image
              aria-hidden
              src={ArrowLeft}
              alt="Arrow up"
              width={5}
              height={5}
            />
          </button>
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded-full ${
                currentPage === page
                  ? "bg-[#8576FF] text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`p-[16px] border rounded ${
              currentPage === totalPages
                ? "bg-[#E2E8F0] cursor-not-allowed"
                : "hover:bg-gray-100"
            }`}
          >
            <Image
              aria-hidden
              src={ArrowRight}
              alt="Arrow up"
              width={5}
              height={5}
            />
          </button>
        </div>

        {/* Rows per page */}
        <div className="flex items-center space-x-2 mt-4">
          <span>Show:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded"
          >
            <option value={5}>5 rows</option>
            <option value={10}>10 rows</option>
            <option value={20}>20 rows</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default EventHistory;
