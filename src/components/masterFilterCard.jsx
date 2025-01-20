import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Card,
  CardFooter,
  Checkbox,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Slider,
  Typography,
} from '@material-tailwind/react';
import { FaAngleDown } from 'react-icons/fa';

export default function MasterFilterCard({ onFilter }) {
  const [section1Expanded, setSection1Expanded] = useState(false);
  const [section2Expanded, setSection2Expanded] = useState(false);
  const [section3Expanded, setSection3Expanded] = useState(false);
  const [provinsi, setProvinsi] = useState('');
  const [kota, setKota] = useState('');
  const [provinsiData, setProvinsiData] = useState([]);
  const [kotaData, setKotaData] = useState([]);
  const [isLoadingProvinsi, setIsLoadingProvinsi] = useState(true);
  const [isLoadingKota, setIsLoadingKota] = useState(false);
  const [terendah, setTerendah] = useState(0);
  const [tertinggi, setTertinggi] = useState(1000000000);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);


  useEffect(() => {
    const fetchProvinsi = async () => {
      setIsLoadingProvinsi(true);
      try {
        const response = await fetch('https://backend.ptwpi.co.id/api/provinces');
        if (!response.ok) throw new Error('Failed to fetch provinces');
        const data = await response.json();
        setProvinsiData(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      } finally {
        setIsLoadingProvinsi(false);
      }
    };

    fetchProvinsi();
  }, []);

  useEffect(() => {
    if (!provinsi) {
      setKotaData([]);
      setKota('');
      return;
    }

    const fetchKota = async () => {
      setIsLoadingKota(true);
      try {
        const response = await fetch(`https://backend.ptwpi.co.id/api/cities/province/${provinsi}`);
        if (!response.ok) throw new Error('Failed to fetch cities');
        const data = await response.json();
        setKotaData(data);
        setKota(data.length > 0 ? data[0].id : '');
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setIsLoadingKota(false);
      }
    };

    fetchKota();
  }, [provinsi]);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await fetch('https://backend.ptwpi.co.id/api/categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data); // Assuming the API returns an array of category objects
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle Provinsi Change
  const handleProvinsiChange = (e) => {
    setProvinsi(parseInt(e.target.value));
    setKota('');
  };

  // Handle Kota Change
  const handleKotaChange = (e) => {
    setKota(e.target.value);
  };

  // Handle Category Selection
  const handleCategoryChange = (categoryId, isChecked) => {
    const newSelectedCategories = isChecked
      ? [...selectedCategories, categoryId]
      : selectedCategories.filter(id => id !== categoryId);
    setSelectedCategories(newSelectedCategories);
  };

  // Handle Terendah and Tertinggi Changes
  const onTerendahChange = (e) => {
    setTerendah(Math.max(0, Number(e.target.value))); // Ensure non-negative values
  };

  const onTertinggiChange = (e) => {
    setTertinggi(Math.max(Number(e.target.value), terendah)); // Ensure it's not below terendah
  };

  // Handle Filter Click - Collect all filter criteria and pass to onFilter
  const handleFilterClick = () => {
    const filters = {
      provinsi,
      kota,
      categories: selectedCategories,
      terendah,
      tertinggi
    };
    onFilter(filters);
    // console.log(filters);
  };

  return (
    <Card className="filters xl:w-96 w-full border-2 border-gray-300 shadow-md p-4">
      {/* Section 1: Lokasi */}
      <Accordion open={section1Expanded} icon={<FaAngleDown className={`h-5 w-5 transform ${section1Expanded ? 'rotate-180' : ''} transition-transform`} />}>
        <AccordionHeader onClick={() => setSection1Expanded(!section1Expanded)}>
          <Typography className="text-left uppercase font-semibold" style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif", fontWeight: 800 }} color={section1Expanded ? 'green' : 'black'}>
            Lokasi
          </Typography>
        </AccordionHeader>
        <AccordionBody className="w-full">
          <div className="flex w-full h-full flex-col gap-6 relative">
            {/* Provinsi Dropdown */}
            <div className="relative">
              <select name="provinsi" className="w-full py-3 rounded-md border-[1px] border-black/25 px-2 appearance-none " id="provinsi" value={provinsi} onChange={handleProvinsiChange}>
                <option value="">Pilih Provinsi</option>
                {provinsiData.map((provinsiItem) => (
                  <option key={provinsiItem.id} value={provinsiItem.id}>
                    {provinsiItem.province}
                  </option>
                ))}
              </select>
              <FaAngleDown className="absolute top-[1.1rem] right-2" />
            </div>
            {/* Kota Dropdown */}
            <div className="relative">
              <select name="kota" className="w-full py-3 rounded-md border-[1px] border-black/25 px-2 appearance-none " id="kota" value={kota} onChange={handleKotaChange} disabled={!provinsi}>
                <option value="">Pilih Kabupaten/Kota</option>
                {kotaData.map((kotaItem) => (
                  <option key={kotaItem.id} value={kotaItem.id}>
                    {kotaItem.city}
                  </option>
                ))}
              </select>
              <FaAngleDown className="absolute top-[1.1rem] right-2" />
            </div>
          </div>
        </AccordionBody>
      </Accordion>

      {/* Section 2: Categories */}
      <Accordion open={section2Expanded} icon={<FaAngleDown className={`h-5 w-5 transform ${section2Expanded ? 'rotate-180' : ''} transition-transform`} />}>
        <AccordionHeader onClick={() => setSection2Expanded(!section2Expanded)}>
          <Typography className="text-left uppercase font-semibold" style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif", fontWeight: 800 }} color={section2Expanded ? 'green' : 'black'}>
            Kategori
          </Typography>
        </AccordionHeader>
        <AccordionBody>
          {isLoadingCategories ? (
            <Typography>Loading categories...</Typography>
          ) : (
            <List>
              {categories.map((category) => (
                <ListItem key={category.id} className="p-0">
                  <label htmlFor={`category-${category.id}`} className="flex w-full cursor-pointer items-center px-3 py-2">
                    <ListItemPrefix className="mr-3">
                      <Checkbox id={`category-${category.id}`} checked={selectedCategories.includes(category.id)} onChange={(e) => handleCategoryChange(category.id, e.target.checked)} containerProps={{ className: 'p-0' }} />
                    </ListItemPrefix>
                    <Typography className="font-medium" style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif", fontWeight: 400 }} color="blue-gray">
                      {category.category} {/* Assuming the category object has a name property */}
                    </Typography>
                  </label>
                </ListItem>
              ))}
            </List>
          )}
        </AccordionBody>
      </Accordion>

      {/* Section 3: Price Range */}
      <Accordion open={section3Expanded} icon={<FaAngleDown className={`h-5 w-5 transform ${section3Expanded ? 'rotate-180' : ''} transition-transform`} />}>
        <AccordionHeader onClick={() => setSection3Expanded(!section3Expanded)}>
          <Typography className="text-left uppercase font-semibold" style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif", fontWeight: 800 }} color={section3Expanded ? 'green' : 'black'}>
            Harga
          </Typography>
        </AccordionHeader>
        <AccordionBody>
          {/* Price Range: Terendah */}
          <div className="flex flex-col gap-2 mb-4">
            <Typography className="font-semibold text-black">Terendah</Typography>
            <Input value={`Rp. ${terendah.toLocaleString()}`} disabled />
            <Slider value={terendah} onChange={onTerendahChange} min={0} max={10000000} step={100000} />
          </div>
          {/* Price Range: Tertinggi */}
          <div className="flex flex-col gap-2">
            <Typography className="font-semibold text-black">Tertinggi</Typography>
            <Input value={`Rp. ${tertinggi.toLocaleString()}`} disabled />
            <Slider value={tertinggi} onChange={onTertinggiChange} min={0} max={10000000} step={100000} />
          </div>
        </AccordionBody>
      </Accordion>

      <CardFooter className="mt-2">
        <Button className="w-full bg-wpigreen-50" onClick={handleFilterClick}>Tampilkan</Button>
      </CardFooter>
    </Card>
  );
}

const AccordionIcon = ({ open }) => (
  <FaAngleDown className={`h-5 w-5 transform ${open ? 'rotate-180' : ''} transition-transform`} />
)