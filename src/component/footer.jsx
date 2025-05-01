import React from "react";
import { Link } from "react-router-dom";
import { Search, Twitter, Github, Linkedin, MessageCircle, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background/95 border-t border-border/40 py-10 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold mb-4 justify-center md:justify-start">
              <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <Search className="h-4 w-4" />
              </div>
              vectorSearch
            </Link>
            <p className="text-sm text-muted-foreground">
              DevSearch is a semantic code search engine for developers. Instantly find relevant code snippets,
              documentation, and open-source tools powered by AI.
            </p>
          </div>

          {/* Explore */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold mb-4 text-foreground">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/search" className="footer-link">Search</Link></li>
              <li><Link to="/collections" className="footer-link">Collections</Link></li>
              <li><Link to="/snippets" className="footer-link">Code Snippets</Link></li>
              <li><Link to="/integrations" className="footer-link">Integrations</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/docs" className="footer-link">Documentation</Link></li>
              <li><Link to="/api" className="footer-link">API Reference</Link></li>
              <li><Link to="/community" className="footer-link">Community</Link></li>
              <li><Link to="/changelog" className="footer-link">Changelog</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/careers" className="footer-link">Careers</Link></li>
              <li><Link to="/terms" className="footer-link">Terms</Link></li>
              <li><Link to="/privacy" className="footer-link">Privacy</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 pt-6 border-t border-border/40 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground text-center w-full md:w-auto md:text-left">
            © {new Date().getFullYear()} DevSearch. Built for developers, by developers.
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 md:mt-0">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-link hover:text-primary">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://github.com/JanhaviGanorkar" target="_blank" rel="noreferrer" className="footer-link hover:text-primary">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/janhavi-ganorkar-263752294" target="_blank" rel="noreferrer" className="footer-link hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/itz_janhavi_official/" target="_blank" rel="noreferrer" className="footer-link hover:text-primary">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="footer-link hover:text-primary">
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
