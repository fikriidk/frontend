import React from "react";
import {
  div,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  CircleStackIcon,
  NewspaperIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaAddressBook } from "react-icons/fa";

export default function MasterSidebar() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  return (
    <div className=" w-full h-screen max-w-[20rem] p-4 shadow-md shadow-blue-gray-900/5">
      <div className="mb-2 flex items-center gap-4 p-4 justify-center">
        <img src="../assets/logo-wpi.png" alt="brand" className="h-[50px]" />
      </div>
      <List>
        <a id="admin-dashboard"href="/dashboard">
          <Accordion>
            <ListItem>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </Accordion>
        </a>
        <a id="admin-product" href="/admin-produk">
          <Accordion>
            <ListItem>
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              Product
            </ListItem>
          </Accordion>
        </a>
        <a href="/admin-blog">
          <Accordion>
            <ListItem>
              <ListItemPrefix>
                <NewspaperIcon className="h-5 w-5" />
              </ListItemPrefix>
              Blog
            </ListItem>
          </Accordion>
        </a>
        <a id="admin-suplier" href="/admin-supplier">
          <Accordion>
            <ListItem>
              <ListItemPrefix>
                <FaPeopleGroup className="h-5 w-5" />
              </ListItemPrefix>
              Supplier
            </ListItem>
          </Accordion>
        </a>
        <a href="/admin-edit-perusahaan">
          <Accordion>
            <ListItem>
              <ListItemPrefix>
                <FaAddressBook className="h-5 w-5" />
              </ListItemPrefix>
              About
            </ListItem>
          </Accordion>
        </a>
        <hr className="my-2 border-blue-gray-50" />
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <CircleStackIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Master Data
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <a href="/master-produk">
                <ListItem>
                  <ListItemPrefix>
                    <CircleStackIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Category Product
                </ListItem>
              </a>
              <a href="/master-provinsi">
                <ListItem>
                  <ListItemPrefix>
                    <CircleStackIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Province
                </ListItem>
              </a>
              <a href="/master-kota">
                <ListItem>
                  <ListItemPrefix>
                    <CircleStackIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  City
                </ListItem>
              </a>
            </List>
          </AccordionBody>
        </Accordion>
      </List>
      {/* <Alert
        open={openAlert}
        className="mt-auto"
        onClose={() => setOpenAlert(false)}
      >
        <CubeTransparentIcon className="mb-4 h-12 w-12" />
        <Typography variant="h6" className="mb-1">
          Upgrade to PRO
        </Typography>
        <Typography variant="small" className="font-normal opacity-80">
          Upgrade to Material Tailwind PRO and get even more components,
          plugins, advanced features and premium.
        </Typography>
        <div className="mt-4 flex gap-3">
          <Typography
            as="a"
            href="#"
            variant="small"
            className="font-medium opacity-80"
            onClick={() => setOpenAlert(false)}
          >
            Dismiss
          </Typography>
          <Typography as="a" href="#" variant="small" className="font-medium">
            Upgrade Now
          </Typography>
        </div>
      </Alert> */}
    </div>
  );
}
