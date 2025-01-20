import {
  Button,
  Card,
  Checkbox,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState, useEffect } from "react";

export default function RegisterPage() {
  return (
    <div className="bg-gradient-to-br from-wpigreen-50 to-wpiblue-50">
      <div className="flex items-center justify-center h-screen">
        <Card color="white" shadow={false} className="bg-white shadow-lg p-8 ">
          <Typography variant="h4" color="blue-gray" className="text-center">
            Daftar Menjadi Mitra <br />
            Warung Pangan Indonesia
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <Input
                size="lg"
                placeholder="Input your email"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Button className="mt-6 bg-wpigreen-50" fullWidth>
              Login
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-gray-900 hover:text-blue-600"
              >
                Login here
              </a>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
}
