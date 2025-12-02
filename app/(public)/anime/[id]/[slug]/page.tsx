import { AnimeDetails } from "@/components/anime/AnimeDetails";
import { AnimeDetails as AnimeDetailsType } from "@/types/anime";
import { ReusableTabs, TabItem } from "@/components/ui/ReusableTabs";
import { DownloadContainer } from "@/components/anime/DownloadContainer";
import { DownloadItem } from "@/components/anime/DownloadBox";
import { AnimeDetailsTable } from "@/components/anime/AnimeDetailsTable";
import { MediaItem } from "@/components/carousel/MediaCard";
import { MediaGrid } from "@/components/carousel/MediaGrid";
import { CommentsSection } from "@/components/comments/CommentsSection";

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
  ageRating: "13+ سال",
  network: "نت فلیکس",
  networkLogo: "N",
};

const mockDownloadItems: DownloadItem[] = [
  { id: 1, quality: "WebRip", size: "545", link: "#", resolution: "1080", episode: 1 },
  { id: 2, quality: "WebRip", size: "545", link: "#", resolution: "1080", episode: 2 },
  { id: 3, quality: "WebRip", size: "545", link: "#", resolution: "720", episode: 3 },
  { id: 4, quality: "WebRip", size: "545", link: "#", resolution: "480", episode: 4 },
];

const mockRelatedItems: MediaItem[] = [
  {
    id: 1,
    title: "Attack on Titan",
    image: "/images/aot.jpg",
    rating: 9.0,
    year: 2013,
    duration: "24m",
    description: "Humans fight against Titans.",
  },
  {
    id: 2,
    title: "Frieren",
    image: "/images/frieren.jpg",
    rating: 8.9,
    year: 2023,
    duration: "24m",
    description: "An elf mage's journey after the hero's party defeats the demon king.",
  },
  {
    id: 3,
    title: "Jujutsu Kaisen",
    image: "/images/jujutsu.jpg",
    rating: 8.7,
    year: 2020,
    duration: "24m",
    description: "A boy swallows a cursed talisman - the finger of a demon - and becomes cursed.",
  },
  {
    id: 4,
    title: "Attack on Titan",
    image: "/images/aot.jpg",
    rating: 9.0,
    year: 2013,
    duration: "24m",
    description: "Humans fight against Titans.",
  },
  {
    id: 5,
    title: "Frieren",
    image: "/images/frieren.jpg",
    rating: 8.9,
    year: 2023,
    duration: "24m",
    description: "An elf mage's journey after the hero's party defeats the demon king.",
  },
];

const mockSimilarItems: MediaItem[] = [
  {
    id: 6,
    title: "Jujutsu Kaisen",
    image: "/images/jujutsu.jpg",
    rating: 8.7,
    year: 2020,
    duration: "24m",
    description: "A boy swallows a cursed talisman - the finger of a demon - and becomes cursed.",
  },
  {
    id: 7,
    title: "Attack on Titan",
    image: "/images/aot.jpg",
    rating: 9.0,
    year: 2013,
    duration: "24m",
    description: "Humans fight against Titans.",
  },
  {
    id: 8,
    title: "Frieren",
    image: "/images/frieren.jpg",
    rating: 8.9,
    year: 2023,
    duration: "24m",
    description: "An elf mage's journey after the hero's party defeats the demon king.",
  },
    {
    id: 9,
    title: "Jujutsu Kaisen",
    image: "/images/jujutsu.jpg",
    rating: 8.7,
    year: 2020,
    duration: "24m",
    description: "A boy swallows a cursed talisman - the finger of a demon - and becomes cursed.",
  },
];

// Helper component for tab content with title
const TabContent = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-6">
    <h3 className="text-center text-xl font-bold text-primary dark:text-foreground md:text-start">
      {title}
    </h3>
    {children}
  </div>
);

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
        <TabContent title="جزئیات کامل">
          <AnimeDetailsTable anime={mockAnime} />
        </TabContent>
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
        <TabContent title="انیمه های مرتبط">
          <MediaGrid items={mockRelatedItems} />
        </TabContent>
      ),
    },
    {
      value: "similar",
      label: "مشابه",
      content: (
        <TabContent title="انیمه های مشابه">
          <MediaGrid items={mockSimilarItems} />
        </TabContent>
      ),
    },
    {
      value: "comments",
      label: "نظرات",
      content: (
        <TabContent title="نظرات کاربران">
          <CommentsSection />
        </TabContent>
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
