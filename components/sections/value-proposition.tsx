export default function ValuePropositionSection() {
  return (
    <section className="w-[100%] flex flex-col items-center justify-center gap-[48px] lg:py-[96px] py-[64px] lg:px-[36px] px-[16px] bg-[#111212]">
      
      <div className="flex flex-col items-center justify-center gap-[16px] max-w-[1046px]">
        <p className="text-[#929296] font-inter text-[16px] font-normal leading-6">
          Every project starts with one question
        </p>

        <h2 className="text-white text-center font-mont lg:text-[64px] text-[32px] lg:leading-[64px] leading-[38px] lg:font-bold font-semibold">
          What’s the maximum amount of value we can contribute?
        </h2>
      </div>

      <div className="flex flex-col gap-[8px] items-center text-center">
        <h1 className="text-white text-center font-mont lg:text-[32px] text-[24px] lg:font-bold font-semibold">
          We build software that builds your bottom line.
        </h1>

        <p className="text-[#929296] font-inter text-[16px] font-normal">
          Our Founders and Product Directors have years of experience bringing products to market that drive revenue. Now, let us do it for you.
        </p>

        <p className="text-[#929296] font-inter text-[16px] font-normal">
          Whether you’re a start-up or a Fortune 500 company, our team can take you to the next level.
        </p>

        <p className="text-[#929296] font-inter text-[16px] font-normal">
          We don’t just build your software, we help you grow your business.
        </p>
      </div>

      <a
        href="/about-us"
        className="flex items-center justify-center gap-1 px-[24px] pt-[14px] pb-[12px] font-mont text-[14px] font-semibold cursor-pointer backdrop-blur-[12px] hover:scale-105 transition-all duration-300 ease-in-out rounded-full !bg-[#111212] !text-white border !border-white"
      >
        <span>Get to know us</span>
      </a>

    </section>
  );
}