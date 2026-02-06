import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const ContainerScroll = ({ titleComponent, children, className }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => { setIsMobile(window.innerWidth <= 768); };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const scaleDimensions = () => isMobile ? [0.7, 0.9] : [1.05, 1];
    const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
    const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <div className={cn("h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20", className)} ref={containerRef}>
            <div className="py-10 md:py-40 w-full relative" style={{ perspective: "1000px" }}>
                <Header translate={translate} titleComponent={titleComponent} />
                <Card rotate={rotate} translate={translate} scale={scale}>{children}</Card>
            </div>
        </div>
    );
};

export const Header = ({ translate, titleComponent }) => (
    <motion.div style={{ translateY: translate }} className="div max-w-7xl mx-auto text-center">
        {titleComponent}
    </motion.div>
);

export const Card = ({ rotate, scale, children }) => (
    <motion.div
        style={{
            rotateX: rotate,
            scale,
            boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
        }}
        className="max-w-7xl -mt-20 mx-auto h-[40rem] md:h-[50rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
        <div className="h-full w-full overflow-hidden rounded-2xl bg-[#0f172a] md:rounded-2xl md:p-4">
            {children}
        </div>
    </motion.div>
);
