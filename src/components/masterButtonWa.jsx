import { Button } from '@material-tailwind/react';
import React from 'react';

export default function MasterButtonWa({ wa_link }) {
  return (
    <Button
      type="button"
      className="bg-gradient-to-r from-wpigreen-100 to-wpigreen-200 text-white font-bold py-2 px-4 h-10 w-full rounded-md"
    >
      <div className="flex flex-col items-center">
        <a href={wa_link} className="flex items-center gap-3">
          <img alt="" src="./assets/whatsapp.png" className="h-6" />
          <span>Hubungi Kami</span>
        </a>
      </div>
    </Button>
  );
}