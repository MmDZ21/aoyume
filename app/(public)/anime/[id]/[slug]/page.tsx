import { AnimeDetails } from "@/components/anime/AnimeDetails";
import { AnimeDetails as AnimeDetailsType } from "@/types/anime";
import { ReusableTabs, TabItem } from "@/components/ui/ReusableTabs";
import { DownloadContainer } from "@/components/anime/DownloadContainer";
import { DownloadItem } from "@/components/anime/DownloadBox";

const mockAnime: AnimeDetailsType = {
  id: "1",
  title: "Uncut Games 2020",
  poster: "/images/aot.jpg", // Using existing image
  genres: ["خانوادگی", "اکشن", "کمدی"],
  score: 7.5,
  voters: 115954,
  myAnimeListScore: 7.5,
  myAnimeListVoters: 115954,
  status: "Ongoing",
  latestUpdate: "آخرین بروزرسانی قسمت 10 فصل 2",
  broadcastTime: "چهارشنبه ها ساعت 20:30",
  episodes: 12,
  synopsis:
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.",
  downloadedCount: 240,
  watchedCount: 240,
};

const mockDownloadItems: DownloadItem[] = [
  { id: 1, quality: "WebRip", size: "545", link: "#", resolution: "1080", episode: 1 },
  { id: 2, quality: "WebRip", size: "545", link: "#", resolution: "1080", episode: 2 },
  { id: 3, quality: "WebRip", size: "545", link: "#", resolution: "720", episode: 3 },
  { id: 4, quality: "WebRip", size: "545", link: "#", resolution: "480", episode: 4 },
];

export default function AnimeDetailsPage() {
  const tabs: TabItem[] = [
    {
      value: "download",
      label: "دانلود",
      content: <DownloadContainer items={mockDownloadItems} />,
    },
    {
      value: "details",
      label: "جزئیات",
      content: (
        <div className="text-center text-slate-400">محتوای بخش جزئیات</div>
      ),
    },
    {
      value: "trailer",
      label: "تریلر",
      content: (
        <div className="text-center text-slate-400">محتوای بخش تریلر</div>
      ),
    },
    {
      value: "related",
      label: "مرتبط",
      content: (
        <div className="text-center text-slate-400">محتوای بخش مرتبط</div>
      ),
    },
    {
      value: "similar",
      label: "مشابه",
      content: (
        <div className="text-center text-slate-400">محتوای بخش مشابه</div>
      ),
    },
    {
      value: "comments",
      label: "نظرات",
      content: (
        <div className="text-center text-slate-400">محتوای بخش نظرات</div>
      ),
    },
  ];

  return (
    <div className="w-full space-y-4 py-8 md:space-y-8">
      <AnimeDetails anime={mockAnime} />
      <div>
        <ReusableTabs defaultValue="download" tabs={tabs} />
      </div>
    </div>
  );
}
