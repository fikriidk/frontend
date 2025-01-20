import React, { useEffect, useState } from "react";
import image from "../../src/assets/logo-wpi.png";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa6";
import axios from "axios"
const LINKS = [
  {
    title: "Product",
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News"],
  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];

const currentYear = new Date().getFullYear();

export default function MasterFooter() {
  const [about, setAbout] = useState({})

  const fetchData = async () => {
    try {
      const res = await axios.get('https://backend.ptwpi.co.id/api/about/1')
      setAbout(res.data.data)
    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <footer className="relative w-full pb-10  px-4 xl:px-0">
      <div className="logo flex items-center gap-4 pb-4">
        <img src={image} alt="logo" className="w-[40px] h-[40px]" />
        <p className="text-xl font-semibold">Warung Pangan Indonesia</p>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-y-2 ">
        <div className="flex flex-col lg:flex-row   lg:gap-8 gap-2 ">
          <p
            className="w-[60%]"
            style={{
              fontFamily: "'M PLUS Rounded 1c', sans-serif",
              fontWeight: 400,
              fontSize: "0.950rem",
            }}
          >
            {about?.[0]?.address} <br /> {about?.[0]?.email_company}
            <br />
            <strong
              style={{
                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                fontWeight: 800,
              }}
            >
              {" "}
              CS Warung Pangan Indonesia{" "}
            </strong>
            <br />
            <p
              style={{
                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                fontWeight: 400,
                fontSize: "0.950rem",
              }}
            >
              {about?.[0]?.phone_company}
            </p>
          </p>

          <p>
            <strong
              className="text-black "
              style={{
                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                fontWeight: 800,
              }}
            >
              {" "}
              Perusahaan{" "}
            </strong>{" "}
            <br />
            <a
              href="#"
              className="hover:underline"
              style={{
                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                fontWeight: 400,
                fontSize: "0.950rem",
              }}
            >
              Beranda
            </a>{" "}
            <br />
            <a
              href="#"
              className="hover:underline"
              style={{
                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                fontWeight: 400,
                fontSize: "0.950rem",
              }}
            >
              Tentang Perusahaan
            </a>
          </p>
        </div>
        <div className="flex flex-col gap-4  ">
          <div className="flex flex-col lg:flex-row lg:gap-8 gap-2 ">
            <p>
              <strong
                className="text-black text-nowrap"
                style={{
                  fontFamily: "'M PLUS Rounded 1c', sans-serif",
                  fontWeight: 800,
                }}
              >
                {" "}
                Warung Pangan Indonesia{" "}
              </strong>{" "}
              <br />
              <div className="flex flex-col  w-full">
                <a
                  href="/produk"
                  className="hover:underline"
                  style={{
                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.950rem",
                  }}
                >
                  Produk
                </a>
                <a
                  href="/mitra"
                  className="hover:underline"
                  style={{
                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.950rem",
                  }}
                >
                  Mitra Bisnis
                </a>
                <a
                  href="/blog"
                  className="hover:underline"
                  style={{
                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.950rem",
                  }}
                >
                  Blog
                </a>
                <a
                  href="/tentang"
                  className="hover:underline"
                  style={{
                    fontFamily: "'M PLUS Rounded 1c', sans-serif",
                    fontWeight: 400,
                    fontSize: "0.950rem",
                  }}
                >
                  Tentang
                </a>
              </div>
            </p>

            <p>
              <strong
                className="text-black justify-end "
                style={{
                  fontFamily: "'M PLUS Rounded 1c', sans-serif",
                  fontWeight: 800,
                }}
              >
                Layanan Pengaduan Konsumen
              </strong>
              <br />
              <p
                style={{
                  fontFamily: "'M PLUS Rounded 1c', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.950rem",
                }}
              >
                {" "}
                Direktorat Jendral Perlindungan Konsumen dan Tertib Niaga
                Kementrian Perdagangan Republik Indonesia (+62) 853 11111
              </p>
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-y-2 grid-cols-1 mt-5 ">
        <div className="flex items-center gap-4  px-2">
          <span className="text-xl text-white p-2 rounded-full bg-blue-500">
            <a
              href={about?.[0]?.wa_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
          </span>
          <span className="text-xl text-white p-2 rounded-full bg-blue-500">
            <a
              href={about?.[0]?.ig_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </span>
          <span className="text-xl text-white p-2 rounded-full bg-blue-500">
            <a
              href={about?.[0]?.fb_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
          </span>
          <p className="font-semibold text-lg">Warung Pangan Indonesia</p>
        </div>
        <div className=" ">
          <p
            className="text-start "
            style={{
              fontFamily: "'M PLUS Rounded 1c', sans-serif",
              fontWeight: 400,
              fontSize: "0.950rem",
            }}
          >
            © 2024 Powered By{" "}
            <strong
              style={{
                fontFamily: "'M PLUS Rounded 1c', sans-serif",
                fontWeight: 800,
              }}
            >
              {" "}
              BPYD JAYA{" "}
            </strong>{" "}
            all rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
