import StarRating from "@/components/elements/startRating/StarRating";

type Info = {
  rating: number;
  reviews: number;
  text: string;
};

const BranTestimonialInfo = ({ rating, reviews, text }: Info) => {
  return (
    <div className="info_box bg-[#FDFAF8] dark:bg-[#1B1B1B] rounded-[20px] py-10 px-[30px] text-center flex flex-col items-center justify-center h-full">
      <h3 className="text-[28px] md:text-[34px] xl:text-[42px] 2xl:text-[52px] !font-light leading-none">
        {rating}
      </h3>

      <div className="flex justify-center mt-1">
        <StarRating number={rating} className="gap-[6px]" />
      </div>
      <p className="leading-none text-[18px] mt-2 text-text-3">{`(${reviews}+ reviews)`}</p>
      <p className="text-[20px] lg:text-[24px] 2xl:text-[30px] text-text leading-[1.18] font-medium max-w-[300px] mx-auto mt-[26px]">
        {text}
      </p>
    </div>
  );
};

export default BranTestimonialInfo;
