import Image from "next/image";
import { TTeamMemberType } from "@/types";
import Link from "next/link";

const BranProfileCard = ({ data, slug }: TTeamMemberType) => {
  const { name, post, avatar, nickname } = data;
  return (
    <div
      className="has_fade_anim text-center py-[40px]"
      data-fade-from="bottom"
      data-delay="0.15"
    >
      <Link href={`/team/${slug}`}>
        <div className="rounded-full overflow-hidden w-[160px] h-[160px] xl:w-[200px] xl:h-[200px] mx-auto">
          <Image
            src={avatar}
            height={200}
            width={200}
            alt={name}
            className="w-full h-full object-cover hover:scale-[1.1] transition-transform duration-300"
          />
        </div>
        <div className="mt-[20px]">
          {nickname && (
            <p className="text-[11px] uppercase tracking-[0.15em] text-[#6D6E71] dark:text-text-fixed-3 mb-[8px]">
              {nickname}
            </p>
          )}
          <h3 className="text-[20px] xl:text-[24px] leading-[1.1] font-semibold">
            {name}
          </h3>
          <p className="text-[14px] mt-[8px] leading-none text-[#6D6E71] dark:text-text-fixed-3">
            {post}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default BranProfileCard;
