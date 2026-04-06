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
            "text-[18px] sm:text-[20px] md:text-[22px] md:mt-[-6px] lg:text-[26px] lg:mt-[-8px] xl:text-[34px] xl:mt-[-10px] leading-[1.08] font-heading !font-light bg-gradient-to-r from-[#95298C] via-[#E02379] to-[#95298C] bg-clip-text text-transparent pl-[20px] md:pl-[40px] bg-[length:200%_100%] animate-gradient-shift",
            animation,
            className
          )}
          dangerouslySetInnerHTML={convertWithBrSpan(title)}
        />
      ) : (
        <h2
          className={cn(
            "text-[18px] sm:text-[20px] md:text-[22px] md:mt-[-6px] lg:text-[26px] lg:mt-[-8px] xl:text-[34px] xl:mt-[-10px] leading-[1.08] font-heading !font-light bg-gradient-to-r from-[#95298C] via-[#E02379] to-[#95298C] bg-clip-text text-transparent pl-[20px] md:pl-[40px] bg-[length:200%_100%] animate-gradient-shift",
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
