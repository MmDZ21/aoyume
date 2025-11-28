import { BottombarNavItem, TopbarNavItem } from "@/types/types";

export const topbarNavItems: TopbarNavItem[] = [
  {
    label: "صفحه اصلی",
    href: "/",
  },
  {
    label: "تبلیغات",
    href: "/ads",
  },
  {
    label:  "خرید اشتراک",
    href: "/subscribe",
  },
  {
    label: "تماس با ما",
    href: "/contact",
  },
];

export const bottombarNavItems: BottombarNavItem[] = [
  {
    label: "انیمه‌ها بر اساس ژانر",
    items: [
      {
        label: "کمدی",
        href: "/anime/comedy",
      },
      {
        label: "درام",
        href: "/anime/drama",
      },
      {
        label: "اکشن",
        href: "/anime/action",
      },
      {
        label: "ماجراجویی",
        href: "/anime/adventure",
      },
      {
        label: "جنایی",
        href: "/anime/crime",
      },
      {
        label: "عاشقانه",
        href: "/anime/romance",
      },
      {
        label: "فانتزی",
        href: "/anime/fantasy",
      },
      {
        label: "مشاهده همه",
        href: "/anime/genres",
      },
    ]
  },
  {
    label: "انیمه‌ها بر اساس سال",
    items: [
      {
        label: "2025",
        href: "/anime/2025",
      },
      {
        label: "2024",
        href: "/anime/2024",
      },
      {
        label: "2023",
        href: "/anime/2023",
      },
      {
        label: "2022",
        href: "/anime/2022",
      },
      {
        label: "2021",
        href: "/anime/2021",
      },
      {
        label: "2020",
        href: "/anime/2020",
      },
      {
        label: "2019",
        href: "/anime/2019",
      },
      {
        label: "مشاهده همه",
        href: "/anime/years",
      },
    ]
  },
  {
    label: "انیمه‌ها بر اساس فصل",
    items: [
      {
        label: "بهار",
        href: "/anime/season/spring",
      },
      {
        label: "تابستان",
        href: "/anime/season/summer",
      },
      {
        label: "پاییز",
        href: "/anime/season/fall",
      },
      {
        label: "زمستان",
        href: "/anime/season/winter",
      },
    ]
  },
  {
    label: "انیمه‌ها بر اساس وضعیت",
    items: [
      {
        label: "در حال پخش",
        href: "/anime/status/ongoing",
      },
      {
        label: "پایان یافته",
        href: "/anime/status/completed",
      },
      {
        label: "بزودی",
        href: "/anime/status/upcoming",
      },
    ]
  },
  {
    label: "انیمه‌های سینمایی",
    href: "/anime/movies",
  },
  {
    label: "برنامه پخش هفتگی",
    href: "/anime/schedule",
  },
  {
    label: "برترین انیمه‌ها",
    href: "/anime/top",
  },
  {
    label: "اخبار انیمه",
    href: "/anime/news",
  },
]