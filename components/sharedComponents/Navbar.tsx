"use client";
import Link from "next/link"
import Image from "next/image"
import neoslogo from "@/public/neos-logo.svg"
import NeosButton from "@/components/NeosButton"
import { MenuItem } from "@mui/material"
import { useState } from "react";
import NeosSelect from "../NeosSelect";
import english from "@/public/flags/gb-eng.png"
import portugal from "@/public/flags/pt.png"
import spanish from "@/public/flags/spanish.png"

import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router=useRouter()
  const [lang, setlang] = useState(2);

  return (
    <div className="max-w-[93%] md:max-w-[88%] lg:max-w-[83%] w-full mx-auto py-4 md: lg:py-6 flex justify-between items-center">
      <Image src={neoslogo} alt="NEOS logo" width={100} className="h-[20px] md:h-auto lg:h-auto -ms-3 md:ms-0 lg:ms-0 cursor-pointer" onClick={()=>router.push('/')}/>
      <div className="flex items-center">
        <Link href="/faq" className="font-bold text-xs md:text-xl lg:text-xl text-white mx-6">FAQs</Link>
        <NeosSelect
          value={lang}
          onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
            setlang(e.target.value as number);
          }}
          defaultValue={lang}
        >
          {[
            { name: "Spanish", flag: spanish, value: 1 },
            { name: "English", flag: english, value: 2 },
            { name: "Portuguese", flag: portugal, value: 3 },
          ].map((item, index) => (
            <MenuItem key={index} value={item.value} sx={{ display: "flex" }}>
              <Image src={item.flag} alt="NEOS logo" className="w-3 h-3 mr-2" />
              {item.name}
            </MenuItem>
          ))}
        </NeosSelect>

      </div>
    </div>
  )
}

export default Navbar