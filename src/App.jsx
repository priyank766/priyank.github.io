import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Freelance from './components/Freelance';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <div className="app">
            <Navbar />
            <main className="main">
                <Hero />
                <About />
                <Experience />
                <TechStack />
                <Projects />
                <Freelance />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
