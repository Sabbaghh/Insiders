import { convertWithBrSpan } from "@/lib/helper/converter";
import { cn } from "@/lib/utils";

const SectionTitle = ({
  title,
  className,
  heading1 = false,
  animation = "has_fade_anim",
}: {
  title: string;
  className?: string;
  heading1?: boolean;
  animation?: string;
}) => {
  return (
    <>
      {heading1 ? (
        <h1
          className={cn(
            "text-[12px] sm:text-[14px] md:text-[15px] md:mt-[-4px] lg:text-[18px] lg:mt-[-5px] xl:text-[23px] xl:mt-[-7px] leading-[1.08] font-heading !font-light bg-gradient-to-r from-[#95298C] via-[#E02379] to-[#95298C] bg-clip-text text-transparent pl-[20px] md:pl-[40px] bg-[length:200%_100%] animate-gradient-shift",
            animation,
            className
          )}
          dangerouslySetInnerHTML={convertWithBrSpan(title)}
        />
      ) : (
        <h2
          className={cn(
            "text-[12px] sm:text-[14px] md:text-[15px] md:mt-[-4px] lg:text-[18px] lg:mt-[-5px] xl:text-[23px] xl:mt-[-7px] leading-[1.08] font-heading !font-light bg-gradient-to-r from-[#95298C] via-[#E02379] to-[#95298C] bg-clip-text text-transparent pl-[20px] md:pl-[40px] bg-[length:200%_100%] animate-gradient-shift",
            animation,
            className
          )}
        >
          {title}
        </h2>
      )}
    </>
  );
};

export default SectionTitle;
