import Hero from '../components/Hero';
import Roadmap from '../components/Roadmap';
import ProgramTabs from '../components/ProgramTabs';

import MultimediaSection from '../components/MultimediaSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
    return (
        <>
            <Navbar />
            <div id="inicio"><Hero /></div>
            <div id="roadmap"><Roadmap /></div>
            <div id="programas"><ProgramTabs /></div>

            <MultimediaSection />
            <Footer />
        </>
    );
};

export default HomePage;
