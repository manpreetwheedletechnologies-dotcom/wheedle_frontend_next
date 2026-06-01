'use client';
import Cards from "./Cards";
const ServicesPagesServices = ({
    heading,
    subHeading,
    description,
    jobs = [],
    buttonText = "Start Now",
}) => {
    return (
        <>
            <section
                className="w-full px-6 sm:px-10 lg:px-[100px] pt-0 pb-20 relative overflow-hidden"
            >
                <div className="max-w-[1440px] mx-auto">
                    {/* Heading */}
                    <h4
                        className="font-gotham font-normal text-white text-center
                                    text-[28px] sm:text-[36px] lg:text-[48px]
                                    leading-[38px] sm:leading-[48px] lg:leading-[58px]
                                    max-w-[900px] mx-auto"
                    >
                        {heading}
                        <br />
                        <span className="text-white/70">{subHeading}</span>
                    </h4>

                    {/* Sub text */}
                    <p
                        className="font-inter font-medium text-white text-center
                                    text-[14px] sm:text-[16px] lg:text-[18px]
                                    leading-[22px] sm:leading-[26px] lg:leading-[30px]
                                    mt-4 max-w-[800px] mx-auto"
                    >
                        {description}
                    </p>

                    {/* Cards */}
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14"
                    >
                        {jobs.map((job, index) => (
                            <Cards
                                key={index}
                                img={job.img}
                                title={job.title}
                                desc={job.desc}
                                location={job.location}
                                buttonText={buttonText}
                            />
                        ))}
                    </div>
                </div>
            </section>


        </>
    );
};

export default ServicesPagesServices;
