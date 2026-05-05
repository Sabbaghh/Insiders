import { convertWithBrSpan } from "@/lib/helper/converter";
import { cn } from "@/lib/utils";

const SHARED = "text-[16px] sm:text-[18px] md:text-[20px] md:mt-[-6px] lg:text-[24px] lg:mt-[-8px] xl:text-[32px] xl:mt-[-10px] 2xl:text-[38px] 2xl:mt-[-14px] !leading-[1.4] !font-boldonse bg-gradient-to-r from-[#95298C] via-[#E02379] to-[#95298C] bg-clip-text text-transparent pl-[20px] md:pl-[40px] bg-[length:200%_100%] animate-gradient-shift";

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
          className={cn(SHARED, animation, className)}
          dangerouslySetInnerHTML={convertWithBrSpan(title)}
        />
      ) : (
        <h2 className={cn(SHARED, animation, className)}>
          {title}
        </h2>
      )}
    </>
  );
};

export default SectionTitle;
