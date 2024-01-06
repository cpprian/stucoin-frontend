"use client"

import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export const Heroes = () => {
    const heroes_name = ["tasks", "skills", "resume", "winners"]
    const heroes_desc = [
        "Achieve more skills and experience with tasks by your tutors.",
        "Show the world that you are accomplishing more skills during your studies.",
        "Proof the future employee that you are more trustworthy than the others.",
        "Compete with students and get rewards by completing tasks!"
    ];

    return (
        <div className="flex flex-row items-center justify-center max-w-5xl">
            <Carousel 
                className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]"
                plugins={[
                    Autoplay({
                        delay: 5000,
                    }),
                ]}
            >
                <CarouselContent>
                    {Array.from(heroes_name).map((name, index) => (
                        <CarouselItem key={index}>
                            <Card className="bg-transparent border-0">
                                <div className="flex items-center">
                                    <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
                                        <Image
                                            src={"/stucoin-frontend/"+name+".png"}
                                            fill
                                            className="object-contains dark:hidden"
                                            alt="Tasks"
                                        />
                                        <Image
                                            src={"/stucoin-frontend/"+name+"-dark.png"}
                                            fill
                                            className="object-contains hidden dark:block"
                                            alt="Tasks"
                                        />
                                    </div>
                                </div>
                                <p className="font-semibold">
                                    {heroes_desc[index]}
                                </p>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}