import React, { useState, useEffect, createContext, useContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Navigation Component
const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">PrognosCore</span>
        </Link>
        
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/services" className="nav-link" onClick={() => setIsOpen(false)}>Services</Link>
          <Link to="/industries" className="nav-link" onClick={() => setIsOpen(false)}>Industries</Link>
          <Link to="/about" className="nav-link" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/learn-more" className="nav-link" onClick={() => setIsOpen(false)}>Learn More</Link>
          <Link to="/contact" className="nav-link" onClick={() => setIsOpen(false)}>Contact</Link>
          
          <button className="theme-toggle glass-btn" onClick={toggleTheme}>
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        
        <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

// Homepage Component
const HomePage = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/newsletter`, { email: newsletterEmail });
      setNewsletterStatus('success');
      setNewsletterEmail('');
    } catch (error) {
      setNewsletterStatus('error');
    }
  };

  return (
    <div className="page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Open Intelligence<br />
            <span className="highlight">powered by sensors</span>
          </h1>
          <p className="hero-subtitle">Predict. Prevent. Perform.</p>
          <p className="hero-description">
            Transform your industrial operations with cutting-edge predictive maintenance solutions.
            Monitor equipment health, prevent failures, and optimize performance with AI-powered insights.
          </p>
          <div className="hero-buttons">
            <Link to="/contact" className="glass-btn primary">Get Started</Link>
            <Link to="/learn-more" className="glass-btn secondary">Watch Demo</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.pexels.com/photos/5475750/pexels-photo-5475750.jpeg" alt="Industrial monitoring" />
        </div>
      </section>

      {/* Industries Section */}
      <section className="industries-preview">
        <div className="container">
          <h2>Industries We Serve</h2>
          <div className="industries-grid">
            <div className="industry-card glass-card">
              <h3>Manufacturing</h3>
              <p>Optimize production lines and reduce downtime</p>
            </div>
            <div className="industry-card glass-card">
              <h3>Oil & Gas</h3>
              <p>Monitor critical equipment in harsh environments</p>
            </div>
            <div className="industry-card glass-card">
              <h3>Power & Utilities</h3>
              <p>Ensure reliable energy distribution</p>
            </div>
            <div className="industry-card glass-card">
              <h3>Mining</h3>
              <p>Prevent equipment failures in remote locations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-preview">
        <div className="container">
          <h2>Our Solutions</h2>
          <div className="services-grid">
            <div className="service-card glass-card">
              <h3>Equipment Monitoring</h3>
              <p>Real-time condition monitoring with IoT sensors</p>
            </div>
            <div className="service-card glass-card">
              <h3>Predictive Analytics</h3>
              <p>AI-powered failure prediction and analysis</p>
            </div>
            <div className="service-card glass-card">
              <h3>ERP Integration</h3>
              <p>Seamless integration with existing systems</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content glass-card">
            <h2>Stay Updated</h2>
            <p>Get insights on predictive maintenance trends and technologies</p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="glass-input"
              />
              <button type="submit" className="glass-btn primary">Subscribe</button>
            </form>
            {newsletterStatus === 'success' && <p className="success">Thank you for subscribing!</p>}
            {newsletterStatus === 'error' && <p className="error">Something went wrong. Please try again.</p>}
          </div>
        </div>
      </section>
    </div>
  );
};

// Services Page
const ServicesPage = () => {
  return (
    <div className="page">
      <div className="container">
        <h1>Our Services</h1>
        <div className="services-grid">
          <Link to="/services/equipment-monitoring" className="service-card glass-card">
            <h3>Equipment Condition Monitoring</h3>
            <p>Advanced IoT sensors and real-time monitoring systems</p>
          </Link>
          <Link to="/services/predictive-analytics" className="service-card glass-card">
            <h3>Predictive Analytics</h3>
            <p>AI-powered failure prediction and maintenance optimization</p>
          </Link>
          <Link to="/services/erp-integration" className="service-card glass-card">
            <h3>ERP/CMMS Integration</h3>
            <p>Seamless integration with existing enterprise systems</p>
          </Link>
          <Link to="/services/maintenance-scheduling" className="service-card glass-card">
            <h3>Maintenance Scheduling</h3>
            <p>Intelligent scheduling based on predictive insights</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Industries Page
const IndustriesPage = () => {
  return (
    <div className="page">
      <div className="container">
        <h1>Industries We Serve</h1>
        <div className="industries-grid">
          <Link to="/industries/manufacturing" className="industry-card glass-card">
            <h3>Manufacturing</h3>
            <p>Optimize production efficiency and equipment reliability</p>
          </Link>
          <Link to="/industries/oil-gas" className="industry-card glass-card">
            <h3>Oil & Gas</h3>
            <p>Critical equipment monitoring in challenging environments</p>
          </Link>
          <Link to="/industries/power-utilities" className="industry-card glass-card">
            <h3>Power & Utilities</h3>
            <p>Ensure reliable energy generation and distribution</p>
          </Link>
          <Link to="/industries/mining" className="industry-card glass-card">
            <h3>Mining</h3>
            <p>Remote equipment monitoring and predictive maintenance</p>
          </Link>
          <Link to="/industries/pharmaceutical" className="industry-card glass-card">
            <h3>Pharmaceutical</h3>
            <p>Compliance-focused equipment monitoring solutions</p>
          </Link>
          <Link to="/industries/food-beverage" className="industry-card glass-card">
            <h3>Food & Beverage</h3>
            <p>Hygienic monitoring systems for food safety</p>
          </Link>
          <Link to="/industries/automotive" className="industry-card glass-card">
            <h3>Automotive</h3>
            <p>Production line optimization and quality control</p>
          </Link>
          <Link to="/industries/fmcg" className="industry-card glass-card">
            <h3>FMCG</h3>
            <p>High-speed production line monitoring</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

// About Page
const AboutPage = () => {
  return (
    <div className="page">
      <div className="container">
        <h1>About PrognosCore</h1>
        <div className="about-content">
          <section className="company-overview glass-card">
            <h2>Our Mission</h2>
            <p>
              PrognosCore is a cutting-edge predictive maintenance startup based in Nigeria with global ambitions.
              We leverage the power of IoT, AI, and advanced analytics to transform how industries approach equipment maintenance.
            </p>
            <p>
              Our tagline "Predict. Prevent. Perform." embodies our commitment to helping businesses anticipate equipment failures,
              prevent costly downtime, and perform at their peak efficiency.
            </p>
          </section>

          <section className="team-section">
            <h2>Our Team</h2>
            <div className="team-grid">
              <div className="team-category">
                <h3>Administration</h3>
                <div className="team-members">
                  <div className="team-member glass-card">
                    <div className="member-photo">
                      <img src="https://images.pexels.com/photos/7688543/pexels-photo-7688543.jpeg" alt="Admin Team Member" />
                    </div>
                    <h4>Leadership Team</h4>
                    <p>Strategic direction and business operations</p>
                  </div>
                </div>
              </div>

              <div className="team-category">
                <h3>Technology</h3>
                <div className="team-members">
                  <div className="team-member glass-card">
                    <div className="member-photo">
                      <img src="https://images.pexels.com/photos/16053029/pexels-photo-16053029.jpeg" alt="Tech Team Member" />
                    </div>
                    <h4>Engineering Team</h4>
                    <p>AI/ML development and IoT solutions</p>
                  </div>
                </div>
              </div>

              <div className="team-category">
                <h3>Business Development</h3>
                <div className="team-members">
                  <div className="team-member glass-card">
                    <div className="member-photo">
                      <img src="https://images.unsplash.com/photo-1638696898556-2c1f3da83f42" alt="Business Team Member" />
                    </div>
                    <h4>Business Team</h4>
                    <p>Client relations and market expansion</p>
                  </div>
                </div>
              </div>

              <div className="team-category">
                <h3>Brand & Marketing</h3>
                <div className="team-members">
                  <div className="team-member glass-card">
                    <div className="member-photo">
                      <img src="https://images.unsplash.com/photo-1510849911856-cdc9335e5597" alt="Brand Team Member" />
                    </div>
                    <h4>Brand Team</h4>
                    <p>Marketing and brand development</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// Contact Page
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    reason: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/contact`, formData);
      setStatus('success');
      setFormData({ name: '', email: '', company: '', reason: '', message: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1>Contact Us</h1>
        <div className="contact-content">
          <div className="contact-info glass-card">
            <h2>Get In Touch</h2>
            <p>Ready to transform your maintenance operations? We'd love to hear from you.</p>
            <div className="contact-details">
              <p><strong>Email:</strong> info@prognoscore.com</p>
              <p><strong>Location:</strong> Nigeria (Global Operations)</p>
            </div>
          </div>

          <form className="contact-form glass-card" onSubmit={handleSubmit}>
            <h2>Send us a Message</h2>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="glass-input"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="glass-input"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="company"
                placeholder="Company (Optional)"
                value={formData.company}
                onChange={handleChange}
                className="glass-input"
              />
            </div>
            <div className="form-group">
              <select
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                className="glass-input"
              >
                <option value="">Reason for Contact</option>
                <option value="general-inquiry">General Inquiry</option>
                <option value="investor-interest">Investor Interest</option>
                <option value="partnership">Partnership Opportunity</option>
                <option value="client-consultation">Client Consultation</option>
                <option value="technical-support">Technical Support</option>
              </select>
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="glass-input"
              ></textarea>
            </div>
            <button type="submit" className="glass-btn primary">Send Message</button>
            
            {status === 'success' && <p className="success">Message sent successfully!</p>}
            {status === 'error' && <p className="error">Failed to send message. Please try again.</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

// Learn More Page
const LearnMorePage = () => {
  return (
    <div className="page">
      <div className="container">
        <h1>Learn More About Our Process</h1>
        <div className="learn-more-content">
          <section className="process-step glass-card">
            <h2>1. Data Collection</h2>
            <p>We deploy advanced IoT sensors to collect real-time data from your equipment.</p>
          </section>
          
          <section className="process-step glass-card">
            <h2>2. AI Analysis</h2>
            <p>Our machine learning algorithms analyze patterns and predict potential failures.</p>
          </section>
          
          <section className="process-step glass-card">
            <h2>3. Actionable Insights</h2>
            <p>Receive timely alerts and maintenance recommendations to prevent downtime.</p>
          </section>
          
          <section className="process-step glass-card">
            <h2>4. Continuous Optimization</h2>
            <p>Our system learns and improves predictions over time for better results.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

// Service Detail Pages
const ServiceDetail = ({ service }) => {
  const services = {
    'equipment-monitoring': {
      title: 'Equipment Condition Monitoring',
      description: 'Advanced IoT sensors and real-time monitoring systems for industrial equipment.',
      features: ['Real-time data collection', 'Multi-sensor integration', 'Cloud-based analytics', 'Mobile alerts']
    },
    'predictive-analytics': {
      title: 'Predictive Analytics',
      description: 'AI-powered failure prediction and maintenance optimization solutions.',
      features: ['Machine learning algorithms', 'Failure pattern recognition', 'Maintenance optimization', 'ROI analysis']
    },
    'erp-integration': {
      title: 'ERP/CMMS Integration',
      description: 'Seamless integration with existing enterprise resource planning systems.',
      features: ['API connectivity', 'Data synchronization', 'Workflow automation', 'Custom integrations']
    },
    'maintenance-scheduling': {
      title: 'Maintenance Scheduling',
      description: 'Intelligent scheduling based on predictive insights and operational requirements.',
      features: ['Automated scheduling', 'Resource optimization', 'Priority management', 'Performance tracking']
    }
  };

  const serviceInfo = services[service];

  return (
    <div className="page">
      <div className="container">
        <h1>{serviceInfo?.title}</h1>
        <div className="service-detail glass-card">
          <p>{serviceInfo?.description}</p>
          <h3>Key Features:</h3>
          <ul>
            {serviceInfo?.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <Link to="/contact" className="glass-btn primary">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

// Industry Detail Pages
const IndustryDetail = ({ industry }) => {
  const industries = {
    'manufacturing': {
      title: 'Manufacturing',
      description: 'Optimize production efficiency and equipment reliability in manufacturing environments.',
      challenges: ['Production downtime', 'Quality control', 'Equipment wear', 'Cost optimization'],
      solutions: ['Real-time monitoring', 'Predictive maintenance', 'Quality analytics', 'Performance optimization']
    },
    'oil-gas': {
      title: 'Oil & Gas',
      description: 'Critical equipment monitoring in challenging oil and gas environments.',
      challenges: ['Remote locations', 'Harsh conditions', 'Safety requirements', 'High costs'],
      solutions: ['Remote monitoring', 'Environmental sensors', 'Safety analytics', 'Cost reduction']
    },
    'power-utilities': {
      title: 'Power & Utilities',
      description: 'Ensure reliable energy generation and distribution systems.',
      challenges: ['Grid reliability', 'Equipment aging', 'Regulatory compliance', 'Efficiency'],
      solutions: ['Grid monitoring', 'Asset management', 'Compliance tracking', 'Optimization']
    },
    'mining': {
      title: 'Mining',
      description: 'Remote equipment monitoring and predictive maintenance for mining operations.',
      challenges: ['Remote locations', 'Heavy equipment', 'Safety concerns', 'Environmental impact'],
      solutions: ['Remote monitoring', 'Equipment analytics', 'Safety systems', 'Environmental monitoring']
    },
    'pharmaceutical': {
      title: 'Pharmaceutical',
      description: 'Compliance-focused equipment monitoring solutions for pharmaceutical manufacturing.',
      challenges: ['Regulatory compliance', 'Quality assurance', 'Contamination prevention', 'Documentation'],
      solutions: ['Compliance monitoring', 'Quality control', 'Clean room monitoring', 'Audit trails']
    },
    'food-beverage': {
      title: 'Food & Beverage',
      description: 'Hygienic monitoring systems for food safety and production efficiency.',
      challenges: ['Food safety', 'Hygiene standards', 'Temperature control', 'Traceability'],
      solutions: ['Hygiene monitoring', 'Temperature tracking', 'Safety analytics', 'Traceability systems']
    },
    'automotive': {
      title: 'Automotive',
      description: 'Production line optimization and quality control for automotive manufacturing.',
      challenges: ['Production speed', 'Quality control', 'Just-in-time delivery', 'Cost pressure'],
      solutions: ['Line monitoring', 'Quality analytics', 'Delivery optimization', 'Cost reduction']
    },
    'fmcg': {
      title: 'FMCG',
      description: 'High-speed production line monitoring for fast-moving consumer goods.',
      challenges: ['High-speed production', 'Quality consistency', 'Packaging integrity', 'Efficiency'],
      solutions: ['Speed monitoring', 'Quality control', 'Packaging analytics', 'Efficiency optimization']
    }
  };

  const industryInfo = industries[industry];

  return (
    <div className="page">
      <div className="container">
        <h1>{industryInfo?.title}</h1>
        <div className="industry-detail glass-card">
          <p>{industryInfo?.description}</p>
          
          <div className="industry-sections">
            <div className="challenges-section">
              <h3>Industry Challenges:</h3>
              <ul>
                {industryInfo?.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
            
            <div className="solutions-section">
              <h3>Our Solutions:</h3>
              <ul>
                {industryInfo?.solutions.map((solution, index) => (
                  <li key={index}>{solution}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <Link to="/contact" className="glass-btn primary">Learn More</Link>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>PrognosCore</h3>
            <p>Predict. Prevent. Perform.</p>
          </div>
          <div className="footer-section">
            <h4>Services</h4>
            <Link to="/services/equipment-monitoring">Equipment Monitoring</Link>
            <Link to="/services/predictive-analytics">Predictive Analytics</Link>
            <Link to="/services/erp-integration">ERP Integration</Link>
          </div>
          <div className="footer-section">
            <h4>Industries</h4>
            <Link to="/industries/manufacturing">Manufacturing</Link>
            <Link to="/industries/oil-gas">Oil & Gas</Link>
            <Link to="/industries/power-utilities">Power & Utilities</Link>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 PrognosCore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Legal Pages
const PrivacyPolicy = () => (
  <div className="page">
    <div className="container">
      <div className="legal-content glass-card">
        <h1>Privacy Policy</h1>
        <p><strong>Effective Date:</strong> March 2025</p>
        
        <h2>Information We Collect</h2>
        <p>We collect information you provide through our contact forms, newsletter signups, and when you interact with our services.</p>
        
        <h2>How We Use Your Information</h2>
        <p>We use collected information to respond to inquiries, provide services, and send relevant updates about our solutions.</p>
        
        <h2>Data Protection</h2>
        <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        
        <h2>Contact Us</h2>
        <p>For questions about this Privacy Policy, contact us at privacy@prognoscore.com</p>
      </div>
    </div>
  </div>
);

const TermsOfService = () => (
  <div className="page">
    <div className="container">
      <div className="legal-content glass-card">
        <h1>Terms of Service</h1>
        <p><strong>Effective Date:</strong> March 2025</p>
        
        <h2>Acceptance of Terms</h2>
        <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
        
        <h2>Use License</h2>
        <p>Permission is granted to temporarily view the materials on PrognosCore's website for personal, non-commercial transitory viewing only.</p>
        
        <h2>Disclaimer</h2>
        <p>The materials on PrognosCore's website are provided on an 'as is' basis. PrognosCore makes no warranties, expressed or implied.</p>
        
        <h2>Contact Information</h2>
        <p>For questions about these Terms of Service, contact us at legal@prognoscore.com</p>
      </div>
    </div>
  </div>
);

// Cookie Consent Component
const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="cookie-consent">
      <div className="cookie-content glass-card">
        <h4>Cookie Consent</h4>
        <p>
          We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
          By clicking "Accept", you consent to our use of cookies. You can manage your preferences anytime.
        </p>
        <div className="cookie-buttons">
          <button onClick={acceptCookies} className="glass-btn primary">Accept All</button>
          <button onClick={declineCookies} className="glass-btn secondary">Decline</button>
          <Link to="/privacy" className="cookie-link">Learn More</Link>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Test API connection
    const testConnection = async () => {
      try {
        const response = await axios.get(`${API}/`);
        console.log('API Connected:', response.data);
      } catch (error) {
        console.error('API Connection Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    testConnection();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader">Loading PrognosCore...</div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:service" element={<ServiceDetailRouter />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/industries/:industry" element={<IndustryDetailRouter />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/learn-more" element={<LearnMorePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

// Router wrapper components
const ServiceDetailRouter = () => {
  const location = useLocation();
  const service = location.pathname.split('/').pop();
  return <ServiceDetail service={service} />;
};

const IndustryDetailRouter = () => {
  const location = useLocation();
  const industry = location.pathname.split('/').pop();
  return <IndustryDetail industry={industry} />;
};

export default App;
