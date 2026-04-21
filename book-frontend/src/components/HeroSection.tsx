import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shared/shadcn/ui/carousel";
import skincareImage1 from "@/assets/skincare-image-1.png";

const heroImages = [skincareImage1, skincareImage1, skincareImage1];

const HeroSection: React.FC = () => {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: false })
    );

    return (
        <section className="relative w-full overflow-hidden">


            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                opts={{
                    loop: true,
                }}
            >
                <CarouselContent className="m-0 p-0">
                    {heroImages.map((image, index) => (
                        <CarouselItem key={index} className="pl-0 basis-full">
                            <div className="relative h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden">
                                <img
                                    src={image}
                                    alt={`Hero Image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation Controls */}
                <div className="hidden md:block">
                    <CarouselPrevious className="left-4 md:left-8 h-10 w-10 bg-white/40 border-none hover:bg-white/80 transition-all shadow-md" />
                    <CarouselNext className="right-4 md:right-8 h-10 w-10 bg-white/40 border-none hover:bg-white/80 transition-all shadow-md" />
                </div>

                {/* Optional Progress Bar/Dots - keeping it clean as requested */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {heroImages.map((_, i) => (
                        <div
                            key={i}
                            className="h-1.5 w-6 rounded-full bg-white/30"
                        />
                    ))}
                </div>
            </Carousel>
        </section>
    );
};

export default HeroSection;