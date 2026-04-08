import { convertWithBrSpan } from "@/lib/helper/converter";
import Image from "next/image";

type testimonialProps = {
  icon: string;
  text: string;
  author: {
    name: string;
    post: string;
    publisher: {
      logo: {
        light: string;
        dark: string;
      };
    };
  };
};

const BranTestimonialCard = ({ text, author }: testimonialProps) => {
  return (
    <div className="pt-10 pb-[37px] px-[30px] lg:pt-[60px] lg:pb-[57px] lg:px-[50px] h-full 2xl:px-[70px] relative before:absolute before:content-[''] before:w-[1px] before:h-[150%] before:bg-[#EFEFEF] dark:before:bg-[#2C2C2C] before:top-0 before:start-[-25px]">
      <div className=" flex flex-col justify-between h-full">
        <div>
          <div>
            <Image src="/assets/qoute.png" width={120} height={85} alt="quote" className="w-[80px] lg:w-[100px] 2xl:w-[120px] h-auto" />
          </div>
          <div className="mt-4 md:mt-6">
            <p
              className="leading-[1.4] text-[14px] lg:text-[16px] 2xl:text-[20px] font-instrument font-medium text-[#888888] [&_span]:text-text"
              dangerouslySetInnerHTML={convertWithBrSpan(text)}
            />
          </div>
        </div>
        <div className="mt-[46px]">
          <div className="leading-none text-[18px]">
            <h3 className="font-plusjakartasans font-bold">{author.name}</h3>
            <span className="font-primary inline-block mt-[7px] text-text-3">
              {author.post}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranTestimonialCard;
