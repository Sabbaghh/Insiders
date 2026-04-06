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
            "font-heading !font-light bg-gradient-to-r from-[#95298C] via-[#E02379] to-[#95298C] bg-clip-text text-transparent pl-[20px] md:pl-[40px] bg-[length:200%_100%] animate-gradient-shift text-[18px] mt-[-3px] sm:text-[20px] sm:mt-[-4px] md:text-[22px] md:mt-[-6px] lg:text-[26px] lg:mt-[-8px] xl:text-[34px] xl:mt-[-10px] 2xl:text-[40px] 2xl:mt-[-14px]",
            animation,
            className
          )}
          dangerouslySetInnerHTML={{ __html: title }}
        />
      ) : (
        <h2
          className={cn(
            "font-heading !font-light bg-gradient-to-r from-[#95298C] via-[#E02379] to-[#95298C] bg-clip-text text-transparent pl-[20px] md:pl-[40px] bg-[length:200%_100%] animate-gradient-shift text-[18px] mt-[-3px] sm:text-[20px] sm:mt-[-4px] md:text-[22px] md:mt-[-6px] lg:text-[26px] lg:mt-[-8px] xl:text-[34px] xl:mt-[-10px] 2xl:text-[40px] 2xl:mt-[-14px]",
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
