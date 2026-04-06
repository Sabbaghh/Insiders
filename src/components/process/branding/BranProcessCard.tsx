import ImageComponent from "@/components/tools/ImageComponent";

type ProcessProps = {
  serial_no: number;
  icon: {
    light: string;
    dark: string;
  };
  title: string;
  subtitle?: string;
  description?: string;
};

const formatSerialNo = (serial: number) =>
  serial < 10 ? `0${serial}` : serial;

const BranProcessCard = ({ serial_no, icon, title, subtitle, description }: ProcessProps) => {
  return (
    <div className="border-l border-[#DEDEDE] dark:border-[#404040]">
      <span className=" text-[16px] text-[#6D6E71] dark:text-text-fixed-3 inline-block ml-[30px]">{`Step - ${formatSerialNo(
        serial_no
      )}`}</span>
      <div className="h-[90px] w-[90px] rounded-full bg-background-2 flex justify-center items-center mx-auto transform translate-y-1/2 outline outline-[15px] outline-[#FAF7F8] dark:outline-[#252525] mt-[44px] xl:mt-[84px] 2xl:mt-[124px]">
        <ImageComponent
          src={icon.light}
          darkSrc={icon.dark}
          width={40}
          height={38}
          alt="icon"
        />
      </div>
      <div>
        <h3 className="title text-[20px] xl:text-[24px] leading-[1.33] pt-[75px] px-[30px] pb-[20px] border border-[#DEDEDE] dark:border-[#404040] rounded-[30px] text-center">
          {title}
        </h3>
        {subtitle && (
          <p className="text-[14px] xl:text-[16px] text-text-3 leading-[1.4] px-[30px] pb-[15px] text-center italic">
            {subtitle}
          </p>
        )}
        {description && (
          <p className="text-[13px] xl:text-[14px] text-text-4 leading-[1.5] px-[30px] pb-[30px] text-center">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default BranProcessCard;
