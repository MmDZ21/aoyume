import { CommentItem, CommentType } from "./CommentItem";
import { CommentInput } from "./CommentInput";

const mockComments: CommentType[] = [
  {
    id: 1,
    author: "پری خداپرست",
    date: "شنبه ۲۵ آبان ۱۳۹۸",
    avatar: "/images/avatar1.jpg", // Placeholder
    content:
      "آقای نایتو سردبیر رسانه ای وان پیس گفته: من از محتوای گنج وان پیس مطلع ام. استاد اودا توی یوتیوب گفته تمایل داره وان پیس رو توی ۵ سال تموم کنه. برای من که این کار به هیچ وجهه انجام پذیر نیست کارای زیادی هست که باید انجام بدیم.",
    likes: 10,
    dislikes: 12,
    isSpoiler: false,
    replies: [
      {
        id: 101,
        author: "مدیریت سایت",
        date: "شنبه ۲۵ آبان ۱۳۹۸",
        content: "ممنون از نظر شما، اما فعلا شایعات زیادی هست.",
        likes: 5,
        dislikes: 1,
        isAdmin: true,
      },
      {
        id: 102,
        author: "کاربر مهمان",
        date: "شنبه ۲۵ آبان ۱۳۹۸",
        content: "دقیقا موافقم!",
        likes: 2,
        dislikes: 0,
      },
    ],
  },
  {
    id: 2,
    author: "پری خداپرست",
    date: "شنبه ۲۵ آبان ۱۳۹۸",
    avatar: "/images/avatar2.jpg", // Placeholder
    content:
      "آقای نایتو سردبیر رسانه ای وان پیس گفته: من از محتوای گنج وان پیس مطلع ام. استاد اودا توی یوتیوب گفته تمایل داره وان پیس رو توی ۵ سال تموم کنه. برای من که این کار به هیچ وجهه انجام پذیر نیست کارای زیادی هست که باید انجام بدیم. نمیدونم چرا همه باور کردن که اگه اودا سنسه میتونه وان پیس رو توی ۵ سال آینده تموم کنه این غیر ممکنه و به هیچ وجه اتفاق نمی افته.",
    likes: 12,
    dislikes: 0,
    isSpoiler: true,
  },
  {
    id: 3,
    author: "مدیریت سایت",
    date: "شنبه ۲۵ آبان ۱۳۹۸",
    content:
      "آقای نایتو سردبیر رسانه ای وان پیس گفته: من از محتوای گنج وان پیس مطلع ام. استاد اودا توی یوتیوب گفته تمایل داره وان پیس رو توی ۵ سال تموم کنه. برای من که این کار به هیچ وجهه انجام پذیر نیست کارای زیادی هست که باید انجام بدیم. نمیدونم چرا همه باور کردن که اگه اودا سنسه میتونه وان پیس رو توی ۵ سال آینده تموم کنه این غیر ممکنه و به هیچ وجه اتفاق نمی افته.",
    likes: 24,
    dislikes: 12,
    isAdmin: true,
    isSpoiler: false,
  },
  {
    id: 4,
    author: "پری خداپرست",
    date: "شنبه ۲۵ آبان ۱۳۹۸",
    avatar: "/images/avatar1.jpg",
    content:
      "آقای نایتو سردبیر رسانه ای وان پیس گفته: من از محتوای گنج وان پیس مطلع ام. استاد اودا توی یوتیوب گفته تمایل داره وان پیس رو توی ۵ سال تموم کنه. برای من که این کار به هیچ وجهه انجام پذیر نیست کارای زیادی هست که باید انجام بدیم. نمیدونم چرا همه باور کردن که اگه اودا سنسه میتونه وان پیس رو توی ۵ سال آینده تموم کنه این غیر ممکنه و به هیچ وجه اتفاق نمی افته.",
    likes: 10,
    dislikes: 12,
    isSpoiler: false,
  },
];

export const CommentsSection = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-2">
      {/* Input Section - Moved to top for better UX */}
      <div className="animate-in fade-in slide-in-from-top-5 duration-700">
        <CommentInput />
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2">
          <h3 className="text-foreground text-lg font-bold">نظرات کاربران</h3>
          <span className="bg-secondary text-muted-foreground rounded-full px-2 py-0.5 text-xs font-medium">
            {mockComments.length}
          </span>
        </div>

        <div className="space-y-6">
          {mockComments.map((comment, index) => (
            <div
              key={comment.id}
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CommentItem comment={comment} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
