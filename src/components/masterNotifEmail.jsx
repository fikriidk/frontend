import { Button, Input, Typography } from "@material-tailwind/react";
import React from "react";
import axios from "axios"

export default function MasterNotifEmail() {
  const [email, setEmail] = React.useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post('https://backend.ptwpi.co.id/api/customer/send', email)
    } catch (error) {
      console.error(error.message)
    }
  }
  return (
    <div className=" bg-white grid grid-cols-1 lg:grid-cols-12 border rounded-lg shadow-lg py-8 px-4 mx-8 lg:mx-0">
      <div className=" col-span-6 text-center flex items-center justify-center lg:justify-start">
        <Typography variant="h4">Dapatkan info menarik dari kami!</Typography>
      </div>
      <div className=" col-span-6">
        <div className="flex gap-2">
          <Input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
            placeholder="Email address"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
            labelProps={{
              className: "before:content-none after:content-none w-full",
            }}
          />
          <Button className="hover:bg-green-400 bg-wpigreen-50">Submit</Button>
        </div>
      </div>
    </div>
  );
}
