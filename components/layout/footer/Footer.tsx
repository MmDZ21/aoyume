import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Aperture,
} from "lucide-react";
import Link from "next/link";

const PlayStoreIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-8 w-8 text-primary"
  >
    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,4.36L16.12,14.42L16.81,15.12M20.3,12C20.3,11.01 19.81,10.11 19.05,9.57L17.84,8.71L17.5,8.35L17.5,15.65L17.84,15.29L19.05,14.43C19.81,13.89 20.3,12.99 20.3,12M16.81,8.88L16.12,9.58L6.05,19.64L16.81,8.88Z" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-foreground">
    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.37 12.36,4.26 13,3.5Z" />
  </svg>
);

const Footer = () => {
  const accessLinks = [
    "عنوان نمایشی",
    "عنوان نمایشی",
    "عنوان نمایشی",
    "عنوان نمایشی",
  ];
  const categoryLinks = [
    "عنوان نمایشی",
    "عنوان نمایشی",
    "عنوان نمایشی",
    "عنوان نمایشی",
  ];
  const importantLinks = [
    "عنوان نمایشی",
    "عنوان نمایشی",
    "عنوان نمایشی",
    "عنوان نمایشی",
  ];

  return (
    <footer className="px-4 pt-16 pb-8 md:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Access Column */}
          <div className="md:col-span-2">
            <h3 className="mb-6 text-lg font-bold">دسترسی ها</h3>
            <ul className="space-y-4">
              {accessLinks.map((item, i) => (
                <li
                  key={i}
                  className="flex cursor-pointer items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column */}
          <div className="md:col-span-2">
            <h3 className="mb-6 text-lg font-bold">دسته بندی ها</h3>
            <ul className="space-y-4">
              {categoryLinks.map((item, i) => (
                <li
                  key={i}
                  className="flex cursor-pointer items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links Column */}
          <div className="md:col-span-2">
            <h3 className="mb-6 text-lg font-bold">لینک های مهم</h3>
            <ul className="space-y-4">
              {importantLinks.map((item, i) => (
                <li
                  key={i}
                  className="flex cursor-pointer items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Spacer for layout balance if needed, or just let the last col take remaining space. 
              2+2+2 = 6. Remaining is 6. 
          */}

          {/* About Column */}
          <div className="md:col-span-6">
            <h3 className="mb-6 text-right text-lg font-bold">
              درباره انیمه لیست
            </h3>
            <p className="mb-8 text-justify leading-relaxed text-muted-foreground">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
              نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
            </p>

            <div className="flex flex-wrap gap-4">
              {/* Google Play Button */}
              <button className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
                <PlayStoreIcon />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] uppercase text-muted-foreground">
                    GET IT ON
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    Google Play
                  </span>
                </div>
              </button>

              {/* App Store Button */}
              <button className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-2 transition-colors hover:bg-accent">
                <AppleIcon />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] uppercase text-muted-foreground">
                    Download on the
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    App Store
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          {/* Copyright (Right side in RTL start) */}
          <p className="text-center text-sm text-muted-foreground md:text-right">
            کلیه حقوق مادی و معنوی این وب سایت برای انیمه لیست محفوظ است
          </p>

          {/* Social Icons (Left side in RTL end) */}
          <div className="flex items-center gap-4 text-muted-foreground">
            <Link href="#" className="transition-colors hover:text-foreground">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              <Youtube className="h-5 w-5" />
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="#" className="transition-colors hover:text-white">
              <Aperture className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
