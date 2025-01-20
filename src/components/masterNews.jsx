import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

export default function MasterNews({
  title,
  content,
  link_image,
  date,
}) {
  // Check if content is defined before splitting
  const truncatedContent = content
    ? content.split(" ").slice(0, 20).join(" ") + "..."
    : "";

  const formattedDate = new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  
  return (
    <Card className="max-w-[24rem] h-full overflow-hidden object-cover transform scale-100 hover:scale-105 transition-transform duration-300 ease-in-out">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none"
      >
        <img src={link_image} alt="ui/ux review check" />
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray">
          {title}
        </Typography>
        <Typography variant="lead" color="gray" className="mt-3 font-normal">
          {truncatedContent}
        </Typography>
      </CardBody>
      <CardFooter className="flex items-center justify-end">
        <Typography className="font-normal">{formattedDate}</Typography>
      </CardFooter>
    </Card>
  );
}
