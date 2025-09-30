import { ArrowRight, Search, Twitter, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BeamsBackground } from '@/components/ui/beams-background';

const Hero = () => {
  const navigate = useNavigate();

  const handleCreateDeal = () => {
    navigate('/create-deal');
  };

  const handleBrowseDeals = () => {
    navigate('/deals');
  };

  return <BeamsBackground className="bg-background" intensity="strong">
      <div className="container relative z-10 mx-auto flex flex-col items-center px-6 pt-28 text-center md:pt-32">
        <div className="max-w-5xl mx-auto space-y-12 animate-fade-in-scale">
          
          {/* Main Headline - Matching reference typography */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-inter-tight font-bold leading-[0.9] tracking-tight">
              The{' '}
              <span className="bg-gradient-to-r from-primary via-purple-400 to-blue-400 bg-clip-text text-transparent">
                OTC Platform
              </span>
              <br />
              powering{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-orange-400 bg-clip-text text-transparent">
                Solana
              </span>
              <br />
              <span className="text-white">
                Niggas
              </span>
            </h1>
          </div>

          {/* Subheadline - cleaner spacing */}
          <div className="max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Secure, private, and efficient OTC trading for Solana memecoins. 
              Access exclusive liquidity and competitive pricing.
            </p>
          </div>

          {/* CTA Buttons - styled like reference */}
          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <Button
              onClick={handleCreateDeal}
              className="group px-10 py-4 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <span>Create Deal</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
            
            <button 
              onClick={handleBrowseDeals}
              className="group px-10 py-4 bg-card/80 backdrop-blur-xl border border-border rounded-2xl font-semibold text-lg text-foreground hover:bg-card hover:border-primary/30 transition-all duration-300 flex items-center gap-3"
            >
              <Search className="w-5 h-5" />
              <span>Browse Deals</span>
            </button>
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center items-center gap-6 pt-8">
            <a 
              href="https://x.com/niggaotc" 
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-card/40 backdrop-blur-xl border border-border hover:border-primary/30 transition-all duration-300 hover:bg-card/60"
            >
              <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
            </a>
            
            <a 
              href="http://t.me/niggaotc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-card/40 backdrop-blur-xl border border-border hover:border-primary/30 transition-all duration-300 hover:bg-card/60"
            >
              <Send className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
            </a>
          </div>
        </div>
      </div>
    </BeamsBackground>;
};
export default Hero;
