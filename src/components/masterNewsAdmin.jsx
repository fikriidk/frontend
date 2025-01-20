import React from "react";
import { useNavigate } from "react-router-dom"; // Correct import statement
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import Cookies from "js-cookie";

export default function MasterNewsAdmin({
  id,
  title,
  content,
  link_image,
  date,
  writer,
}) {
  const navigate = useNavigate();
  const formattedDate = new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const navigateToDetail = () => {
    navigate(`/admin-detail-blog/${id}`); // Use navigate instead of history.push
  };
  const navigateToEdit = () => {
    navigate(`/admin-edit-blog/${id}`); // Use navigate instead of history.push
  };
  const navigateToDelete = async () => {
    // You can show a confirmation dialog here before deleting
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this news item?"
    );

    if (confirmDelete) {
      try {
        // Make a DELETE request using Axios
        await axios.delete(`https://backend.ptwpi.co.id/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        });

        // After successful deletion, navigate to a different route or perform any other actions
        window.location.reload();
      } catch (error) {
        console.error("Error deleting news item:", error);
      }
    }
  };

  const truncatedContent = content.split(" ").slice(0, 20).join(" ") + "...";

  return (
    <Card className="max-w-[24rem] overflow-hidden ">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none flex justify-center"
      >
        <img src={link_image} alt={title} className="h-[200px] w-auto" />
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray">
          {title}
        </Typography>
        <Typography
          variant="lead"
          color="gray"
          className="mt-3 font-normal text-justify"
        >
          {truncatedContent}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <Typography className="font-normal">{writer}</Typography>
        <Typography className="font-normal">{formattedDate}</Typography>
      </CardFooter>
      <CardFooter>
        <div className="flex justify-center items-center gap-2 w-full">
          <button
            type="button"
            className="ml-0 mb-[-10px] bg-wpiblue-50 text-white font-bold px-4 h-10 rounded-md w-full"
            onClick={navigateToDetail}
          >
            <div className="flex justify-center items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </div>
          </button>

          <button
            type="button"
            className="ml-2 mb-[-10px] bg-orange-500 text-white font-bold px-4 h-10 rounded-md w-full"
            onClick={navigateToEdit}
          >
            <div className="flex justify-center items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </div>
          </button>

          <button
            type="button"
            className="ml-2 mb-[-10px] bg-red-500 text-white font-bold px-4 h-10 rounded-md w-full"
            onClick={navigateToDelete}
          >
            <div className="flex justify-center items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </div>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
