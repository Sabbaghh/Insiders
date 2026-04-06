import { cn } from "@/lib/utils";

const MainSectionTitle = ({
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
            "font-heading !font-light bg-gradient-to-r from-[#95298C] via-[#E02379] to-[#95298C] bg-clip-text text-transparent pl-[20px] md:pl-[40px] bg-[length:200%_100%] animate-gradient-shift text-[12px] mt-[-2px] sm:text-[14px] sm:mt-[-3px] md:text-[15px] md:mt-[-4px] lg:text-[18px] lg:mt-[-5px] xl:text-[23px] xl:mt-[-7px] 2xl:text-[27px] 2xl:mt-[-10px]",
            animation,
            className
          )}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      ) : (
        <h2
          className={cn(
            "font-heading !font-light bg-gradient-to-r from-[#95298C] via-[#E02379] to-[#95298C] bg-clip-text text-transparent pl-[20px] md:pl-[40px] bg-[length:200%_100%] animate-gradient-shift text-[12px] mt-[-2px] sm:text-[14px] sm:mt-[-3px] md:text-[15px] md:mt-[-4px] lg:text-[18px] lg:mt-[-5px] xl:text-[23px] xl:mt-[-7px] 2xl:text-[27px] 2xl:mt-[-10px]",
            animation,
            className
          )}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      )}
    </>
  );
};

export default MainSectionTitle;
