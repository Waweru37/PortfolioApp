import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div
      className="app-container bg-fixed bg-repeat bg-center bg-[url('/image3.jpeg')] text-white min-h-screen w-full"
    >
      {/* Overlay for better contrast */}
      <div className="bg-black bg-opacity-70 min-h-screen">
        <Header />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
