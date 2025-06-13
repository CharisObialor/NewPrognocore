import React, { useState, useEffect, createContext, useContext } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import whitelogo from "../src/assets/images/whitelogo.png";
import darklogo from "../src/assets/images/darklogo.png";
import instagram from "../src/assets/images/instagram.png";
import linkedin from "../src/assets/images/linkedin.png";
import twitter from "../src/assets/images/twitter.png";
import BTP from "../src/assets/images/BTP1.png";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "dark";
  });

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
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
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
const ThemeLogo = ({
  alt = "Prognocore Logo",
  className = "logo-image",
  ...props
}) => {
  const { theme } = useTheme();
  const logoSrc = theme === "light" ? darklogo : whitelogo;

  return <img src={logoSrc} alt={alt} className={className} {...props} />;
};

// Navigation Component
const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <ThemeLogo />
          <span className="logo-text">PrognoCore</span>
        </Link>

        <div className={`nav-menu ${isOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link
            to="/services"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/industries"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            Industries
          </Link>
          <Link
            to="/about"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/learn-more"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            Learn More
          </Link>
          <Link
            to="/contact"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>

          <button className="theme-toggle glass-btn" onClick={toggleTheme}>
            {theme === "dark" ? "☀️" : "🌙"}
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
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/newsletter`, { email: newsletterEmail });
      setNewsletterStatus("success");
      setNewsletterEmail("");
    } catch (error) {
      setNewsletterStatus("error");
    }
  };

  return (
    <div className="page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Intelligent Predictive
            <br />
            <span className="highlight">Maintenance Solutions</span>
          </h1>
          <p className="hero-subtitle">Predict. Prevent. Preform.</p>
          <p className="hero-description">
            PrognoCore empowers industrial operations across Nigeria and
            globally with cutting-edge predictive maintenance technology. Our
            AI-powered solutions transform equipment monitoring, reduce downtime
            by up to 70%, and optimize maintenance costs through advanced
            analytics and real-time insights.
          </p>
          <div className="hero-stats glass-card">
            <div className="stat">
              <h3>70%</h3>
              <p>Downtime Reduction</p>
            </div>
            <div className="stat">
              <h3>45%</h3>
              <p>Cost Savings</p>
            </div>
            <div className="stat">
              <h3>8+</h3>
              <p>Industries Served</p>
            </div>
          </div>
          <div className="hero-buttons">
            <Link to="/contact" className="glass-btn primary">
              Reach Out
            </Link>
            <Link to="/learn-more" className="glass-btn secondary">
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src={BTP} alt="Industrial monitoring dashboard" />
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="value-proposition">
        <div className="container">
          <h2>Why Predictive Maintenance Matters</h2>
          <div className="value-grid">
            <div className="value-item glass-card">
              <div className="value-icon">⚡</div>
              <h3>Prevent Costly Failures</h3>
              <p>
                Equipment failures can cost manufacturing companies up to
                $50,000 per hour in downtime. Our predictive analytics identify
                potential issues weeks before they occur, allowing for scheduled
                maintenance during planned shutdowns.
              </p>
            </div>
            <div className="value-item glass-card">
              <div className="value-icon">📊</div>
              <h3>Data-Driven Decisions</h3>
              <p>
                Transform raw sensor data into actionable insights. Our machine
                learning algorithms analyze vibration, temperature, pressure,
                and acoustic patterns to provide precise failure predictions and
                optimal maintenance scheduling.
              </p>
            </div>
            <div className="value-item glass-card">
              <div className="value-icon">🔧</div>
              <h3>Optimize Maintenance Costs</h3>
              <p>
                Move from reactive and time-based maintenance to condition-based
                maintenance. Reduce maintenance costs by up to 45% while
                extending equipment lifespan and improving overall operational
                efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="technology-stack">
        <div className="container">
          <h2>Advanced Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-category glass-card">
              <h3>IoT Sensors & Hardware</h3>
              <ul>
                <li>Vibration analysis sensors</li>
                <li>Temperature and thermal imaging</li>
                <li>Acoustic emission monitoring</li>
                <li>Pressure and flow sensors</li>
                <li>Oil analysis and lubricant monitoring</li>
              </ul>
            </div>
            <div className="tech-category glass-card">
              <h3>AI & Machine Learning</h3>
              <ul>
                <li>Anomaly detection algorithms</li>
                <li>Failure pattern recognition</li>
                <li>Remaining useful life (RUL) prediction</li>
                <li>Digital twin modeling</li>
                <li>Condition-based maintenance optimization</li>
              </ul>
            </div>
            <div className="tech-category glass-card">
              <h3>Data Analytics & Reporting</h3>
              <ul>
                <li>Real-time dashboard monitoring</li>
                <li>Predictive maintenance scheduling</li>
                <li>ROI and cost analysis reporting</li>
                <li>Mobile alert systems</li>
                <li>Integration with existing CMMS/ERP</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="industries-preview">
        <div className="container">
          <h2>Industries We Transform</h2>
          <p className="section-description">
            From Nigeria's growing manufacturing sector to global industrial
            operations, PrognoCore delivers specialized predictive maintenance
            solutions across diverse industries.
          </p>
          <div className="industries-grid">
            <Link
              to="/industries/manufacturing"
              className="industry-card glass-card"
            >
              <div className="industry-icon">🏭</div>
              <h3>Manufacturing</h3>
              <p>
                Production line optimization, quality control, and equipment
                reliability for manufacturing plants
              </p>
              <div className="industry-stats">
                <span>40% efficiency improvement</span>
              </div>
            </Link>
            <Link to="/industries/oil-gas" className="industry-card glass-card">
              <div className="industry-icon">🛢️</div>
              <h3>Oil & Gas</h3>
              <p>
                Critical equipment monitoring in harsh environments, pipeline
                integrity, and refinery operations
              </p>
              <div className="industry-stats">
                <span>60% downtime reduction</span>
              </div>
            </Link>
            <Link
              to="/industries/power-utilities"
              className="industry-card glass-card"
            >
              <div className="industry-icon">⚡</div>
              <h3>Power & Utilities</h3>
              <p>
                Grid reliability, generator monitoring, and renewable energy
                asset management
              </p>
              <div className="industry-stats">
                <span>99.9% uptime achieved</span>
              </div>
            </Link>
            <Link to="/industries/mining" className="industry-card glass-card">
              <div className="industry-icon">⛏️</div>
              <h3>Mining</h3>
              <p>
                Heavy machinery monitoring, conveyor systems, and crushing
                equipment optimization
              </p>
              <div className="industry-stats">
                <span>50% maintenance cost reduction</span>
              </div>
            </Link>
          </div>
          <div className="view-all-industries">
            <Link to="/industries" className="glass-btn secondary">
              View All Industries
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-preview">
        <div className="container">
          <h2>Comprehensive Predictive Maintenance Solutions</h2>
          <div className="services-grid">
            <Link
              to="/services/equipment-monitoring"
              className="service-card glass-card"
            >
              <div className="service-icon">📡</div>
              <h3>Equipment Condition Monitoring</h3>
              <p>
                Real-time monitoring with advanced IoT sensors, vibration
                analysis, and thermal imaging for comprehensive equipment health
                assessment
              </p>
              <div className="service-features">
                <span>• 24/7 Real-time monitoring</span>
                <span>• Multi-sensor integration</span>
                <span>• Cloud-based analytics</span>
              </div>
            </Link>
            <Link
              to="/services/predictive-analytics"
              className="service-card glass-card"
            >
              <div className="service-icon">🧠</div>
              <h3>AI-Powered Predictive Analytics</h3>
              <p>
                Machine learning algorithms that predict equipment failures
                weeks in advance, enabling proactive maintenance planning
              </p>
              <div className="service-features">
                <span>• Failure prediction algorithms</span>
                <span>• Remaining useful life estimation</span>
                <span>• Pattern recognition</span>
              </div>
            </Link>
            <Link
              to="/services/erp-integration"
              className="service-card glass-card"
            >
              <div className="service-icon">🔗</div>
              <h3>Enterprise System Integration</h3>
              <p>
                Seamless integration with existing ERP, CMMS, and enterprise
                systems for unified operations management
              </p>
              <div className="service-features">
                <span>• SAP integration</span>
                <span>• Custom API development</span>
                <span>• Workflow automation</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <section className="roi-section">
        <div className="container">
          <div className="roi-content glass-card">
            <h2>Calculate Your Potential Savings</h2>
            <p>
              Discover how much your organization could save with PrognoCore's
              predictive maintenance solutions. Based on industry averages, our
              clients typically see:
            </p>
            <div className="roi-grid">
              <div className="roi-item">
                <h3>Maintenance Cost Reduction</h3>
                <div className="roi-value">25-45%</div>
                <p>Lower maintenance expenses through optimized scheduling</p>
              </div>
              <div className="roi-item">
                <h3>Downtime Reduction</h3>
                <div className="roi-value">50-70%</div>
                <p>Prevent unplanned equipment failures</p>
              </div>
              <div className="roi-item">
                <h3>Equipment Lifespan Extension</h3>
                <div className="roi-value">20-40%</div>
                <p>Optimize maintenance intervals and procedures</p>
              </div>
            </div>
            <Link to="/contact" className="glass-btn primary">
              Get Your Custom ROI Analysis
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose PrognoCore */}
      <section className="why-choose">
        <div className="container">
          <h2>Why Choose PrognoCore</h2>
          <div className="advantages-grid">
            <div className="advantage glass-card">
              <h3>🇳🇬 Local Expertise, Global Standards</h3>
              <p>
                Based in Nigeria with deep understanding of local industrial
                challenges, we deliver world-class predictive maintenance
                solutions that meet international standards.
              </p>
            </div>
            <div className="advantage glass-card">
              <h3>🚀 Rapid Deployment</h3>
              <p>
                Our modular approach enables quick implementation within 4-6
                weeks, minimizing disruption to your operations while maximizing
                value delivery.
              </p>
            </div>
            <div className="advantage glass-card">
              <h3>💡 Industry-Specific Solutions</h3>
              <p>
                Tailored solutions for manufacturing, oil & gas, mining, and
                other industries, addressing unique challenges and regulatory
                requirements.
              </p>
            </div>
            <div className="advantage glass-card">
              <h3>🔒 Enterprise Security</h3>
              <p>
                Bank-grade security protocols, data encryption, and compliance
                with international data protection standards ensure your
                operational data remains secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content glass-card">
            <h2>Stay Ahead of Industry Trends</h2>
            <p>
              Subscribe to receive insights on predictive maintenance
              innovations, industry case studies, and exclusive access to our
              maintenance optimization resources.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your business email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="glass-input"
              />
              <button type="submit" className="glass-btn primary">
                Subscribe
              </button>
            </form>
            {newsletterStatus === "success" && (
              <p className="success">
                Thank you for subscribing to our insights!
              </p>
            )}
            {newsletterStatus === "error" && (
              <p className="error">Something went wrong. Please try again.</p>
            )}
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
        <div className="page-header">
          <h1>Comprehensive Predictive Maintenance Services</h1>
          <p>
            PrognoCore offers end-to-end predictive maintenance solutions
            designed to transform your equipment management strategy and
            optimize operational efficiency.
          </p>
        </div>

        <div className="services-grid">
          <Link
            to="/services/equipment-monitoring"
            className="service-card glass-card"
          >
            <div className="service-icon">📡</div>
            <h3>Equipment Condition Monitoring</h3>
            <p>
              Advanced IoT sensor networks providing real-time equipment health
              monitoring with vibration analysis, thermal imaging, and acoustic
              emission detection.
            </p>
            <div className="service-details">
              <h4>Key Features:</h4>
              <ul>
                <li>Multi-parameter sensor integration</li>
                <li>Real-time data streaming</li>
                <li>Cloud-based data storage</li>
                <li>Mobile alert systems</li>
              </ul>
            </div>
          </Link>

          <Link
            to="/services/predictive-analytics"
            className="service-card glass-card"
          >
            <div className="service-icon">🧠</div>
            <h3>AI-Powered Predictive Analytics</h3>
            <p>
              Machine learning algorithms that analyze equipment patterns and
              predict failures weeks in advance, enabling proactive maintenance
              planning.
            </p>
            <div className="service-details">
              <h4>Capabilities:</h4>
              <ul>
                <li>Failure pattern recognition</li>
                <li>Remaining useful life prediction</li>
                <li>Anomaly detection</li>
                <li>Maintenance optimization</li>
              </ul>
            </div>
          </Link>

          <Link
            to="/services/erp-integration"
            className="service-card glass-card"
          >
            <div className="service-icon">🔗</div>
            <h3>Enterprise System Integration</h3>
            <p>
              Seamless integration with existing ERP, CMMS, and enterprise
              systems for unified operations management and automated workflows.
            </p>
            <div className="service-details">
              <h4>Integration Options:</h4>
              <ul>
                <li>SAP and Oracle ERP systems</li>
                <li>Popular CMMS platforms</li>
                <li>Custom API development</li>
                <li>Real-time data synchronization</li>
              </ul>
            </div>
          </Link>

          <Link
            to="/services/maintenance-scheduling"
            className="service-card glass-card"
          >
            <div className="service-icon">📅</div>
            <h3>Intelligent Maintenance Scheduling</h3>
            <p>
              Automated maintenance scheduling based on predictive insights,
              resource availability, and operational priorities.
            </p>
            <div className="service-details">
              <h4>Scheduling Features:</h4>
              <ul>
                <li>Condition-based scheduling</li>
                <li>Resource optimization</li>
                <li>Priority matrix management</li>
                <li>Cost-benefit analysis</li>
              </ul>
            </div>
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
        <div className="page-header">
          <h1>Industries We Serve</h1>
          <p>
            PrognoCore delivers specialized predictive maintenance solutions
            across diverse industrial sectors, addressing unique challenges and
            regulatory requirements.
          </p>
        </div>

        <div className="industries-grid">
          <Link
            to="/industries/manufacturing"
            className="industry-card glass-card"
          >
            <div className="industry-icon">🏭</div>
            <h3>Manufacturing</h3>
            <p>
              Production line optimization, quality control, and equipment
              reliability for manufacturing operations
            </p>
            <div className="industry-metrics">
              <span>• 40% efficiency improvement</span>
              <span>• 60% reduction in quality defects</span>
              <span>• 35% decrease in maintenance costs</span>
            </div>
          </Link>

          <Link to="/industries/oil-gas" className="industry-card glass-card">
            <div className="industry-icon">🛢️</div>
            <h3>Oil & Gas</h3>
            <p>
              Critical equipment monitoring for refineries, pipelines, and
              offshore platforms
            </p>
            <div className="industry-metrics">
              <span>• 70% reduction in unplanned downtime</span>
              <span>• 50% improvement in safety metrics</span>
              <span>• 45% optimization in maintenance spend</span>
            </div>
          </Link>

          <Link
            to="/industries/power-utilities"
            className="industry-card glass-card"
          >
            <div className="industry-icon">⚡</div>
            <h3>Power & Utilities</h3>
            <p>
              Grid reliability, generator monitoring, and renewable energy asset
              management
            </p>
            <div className="industry-metrics">
              <span>• 99.9% uptime achievement</span>
              <span>• 30% extension in asset lifespan</span>
              <span>• 25% reduction in O&M costs</span>
            </div>
          </Link>

          <Link to="/industries/mining" className="industry-card glass-card">
            <div className="industry-icon">⛏️</div>
            <h3>Mining</h3>
            <p>
              Heavy machinery monitoring for excavators, conveyors, and
              processing equipment
            </p>
            <div className="industry-metrics">
              <span>• 55% reduction in equipment failures</span>
              <span>• 40% improvement in ore recovery</span>
              <span>• 50% decrease in maintenance costs</span>
            </div>
          </Link>

          <Link
            to="/industries/pharmaceutical"
            className="industry-card glass-card"
          >
            <div className="industry-icon">💊</div>
            <h3>Pharmaceutical Manufacturing</h3>
            <p>
              Compliance-focused monitoring for critical manufacturing equipment
              and clean rooms
            </p>
            <div className="industry-metrics">
              <span>• 100% regulatory compliance</span>
              <span>• 80% reduction in batch failures</span>
              <span>• 35% improvement in OEE</span>
            </div>
          </Link>

          <Link
            to="/industries/food-beverage"
            className="industry-card glass-card"
          >
            <div className="industry-icon">🍺</div>
            <h3>Food & Beverage</h3>
            <p>
              Hygienic monitoring systems ensuring food safety and production
              efficiency
            </p>
            <div className="industry-metrics">
              <span>• 90% reduction in contamination risks</span>
              <span>• 45% improvement in line efficiency</span>
              <span>• 30% decrease in waste</span>
            </div>
          </Link>

          <Link
            to="/industries/automotive"
            className="industry-card glass-card"
          >
            <div className="industry-icon">🚗</div>
            <h3>Automotive Manufacturing</h3>
            <p>
              Production line optimization and quality control for automotive
              assembly
            </p>
            <div className="industry-metrics">
              <span>• 65% reduction in line stoppages</span>
              <span>• 50% improvement in first-pass yield</span>
              <span>• 40% optimization in cycle times</span>
            </div>
          </Link>

          <Link to="/industries/fmcg" className="industry-card glass-card">
            <div className="industry-icon">📦</div>
            <h3>FMCG</h3>
            <p>
              High-speed production line monitoring for fast-moving consumer
              goods
            </p>
            <div className="industry-metrics">
              <span>• 75% improvement in OEE</span>
              <span>• 60% reduction in changeover times</span>
              <span>• 35% decrease in product waste</span>
            </div>
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
        <div className="page-header">
          <h1>About PrognoCore</h1>
          <p>
            Transforming Industrial Operations Through Intelligent Predictive
            Maintenance
          </p>
        </div>

        <div className="about-content">
          <section className="company-overview glass-card">
            <h2>Our Mission</h2>
            <p>
              PrognoCore is a pioneering predictive maintenance technology
              company founded in Nigeria with a vision to transform industrial
              operations across Africa and beyond. We leverage cutting-edge IoT
              sensors, artificial intelligence, and advanced analytics to help
              businesses predict equipment failures, optimize maintenance
              schedules, and achieve unprecedented operational efficiency.
            </p>
            <p>
              Our mission encapsulated in our tagline "Predict. Prevent.
              Perform." drives everything we do - enabling businesses to predict
              equipment failures before they occur, prevent costly downtime, and
              perform at their peak operational capacity.
            </p>

            <div className="mission-pillars">
              <div className="pillar">
                <h3>🎯 Predict</h3>
                <p>
                  Advanced AI algorithms analyze equipment patterns to forecast
                  potential failures weeks in advance
                </p>
              </div>
              <div className="pillar">
                <h3>🛡️ Prevent</h3>
                <p>
                  Proactive maintenance strategies that prevent costly equipment
                  breakdowns and safety incidents
                </p>
              </div>
              <div className="pillar">
                <h3>🚀 Perform</h3>
                <p>
                  Optimized operations that maximize equipment performance,
                  efficiency, and profitability
                </p>
              </div>
            </div>
          </section>

          <section className="company-story glass-card">
            <h2>Our Story</h2>
            <p>
              Founded by a team of experienced engineers and data scientists,
              PrognoCore emerged from the recognition that Nigeria's growing
              industrial sector needed world-class predictive maintenance
              solutions. With deep understanding of local industrial challenges
              and global technology trends, we developed solutions that bridge
              the gap between traditional maintenance practices and Industry 4.0
              innovations.
            </p>
            <p>
              Our founding team combines decades of experience in industrial
              automation, data science, and enterprise software development.
              We've witnessed firsthand the impact of equipment failures on
              productivity, safety, and profitability across various industries,
              which drove us to create solutions that fundamentally transform
              how businesses approach equipment maintenance.
            </p>
          </section>

          <section className="team-section">
            <h2>Our Expert Team</h2>
            <p className="team-intro">
              Our multidisciplinary team brings together expertise in industrial
              engineering, data science, software development, and business
              strategy to deliver comprehensive predictive maintenance
              solutions.
            </p>

            <div className="team-grid">
              <div className="team-category">
                <h3>Leadership & Administration</h3>
                <div className="team-members">
                  <div className="team-member glass-card">
                    <div className="member-photo">
                      <img
                        src="https://images.pexels.com/photos/7688543/pexels-photo-7688543.jpeg"
                        alt="Leadership Team"
                      />
                    </div>
                    <h4>Executive Leadership</h4>
                    <p>
                      Strategic vision, business development, and operational
                      excellence
                    </p>
                    <div className="member-expertise">
                      <span>Strategic Planning</span>
                      <span>Business Development</span>
                      <span>Operations Management</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="team-category">
                <h3>Technology & Engineering</h3>
                <div className="team-members">
                  <div className="team-member glass-card">
                    <div className="member-photo">
                      <img
                        src="https://images.pexels.com/photos/16053029/pexels-photo-16053029.jpeg"
                        alt="Technology Team"
                      />
                    </div>
                    <h4>Engineering Excellence</h4>
                    <p>
                      AI/ML development, IoT systems, and predictive analytics
                    </p>
                    <div className="member-expertise">
                      <span>Machine Learning</span>
                      <span>IoT Systems</span>
                      <span>Data Engineering</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="team-category">
                <h3>Business Development</h3>
                <div className="team-members">
                  <div className="team-member glass-card">
                    <div className="member-photo">
                      <img
                        src="https://images.unsplash.com/photo-1638696898556-2c1f3da83f42"
                        alt="Business Team"
                      />
                    </div>
                    <h4>Market Expansion</h4>
                    <p>
                      Client partnerships, market analysis, and growth
                      strategies
                    </p>
                    <div className="member-expertise">
                      <span>Client Relations</span>
                      <span>Market Analysis</span>
                      <span>Partnership Development</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="team-category">
                <h3>Brand & Marketing</h3>
                <div className="team-members">
                  <div className="team-member glass-card">
                    <div className="member-photo">
                      <img
                        src="https://images.unsplash.com/photo-1510849911856-cdc9335e5597"
                        alt="Brand Team"
                      />
                    </div>
                    <h4>Brand Excellence</h4>
                    <p>
                      Marketing strategy, brand development, and digital
                      presence
                    </p>
                    <div className="member-expertise">
                      <span>Digital Marketing</span>
                      <span>Brand Strategy</span>
                      <span>Content Creation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="values-section glass-card">
            <h2>Our Core Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>🎯 Innovation Excellence</h3>
                <p>
                  Continuously pushing the boundaries of predictive maintenance
                  technology
                </p>
              </div>
              <div className="value-item">
                <h3>🤝 Client Partnership</h3>
                <p>
                  Building long-term relationships based on trust, transparency,
                  and mutual success
                </p>
              </div>
              <div className="value-item">
                <h3>🛡️ Operational Integrity</h3>
                <p>
                  Maintaining the highest standards of data security, system
                  reliability, and service quality
                </p>
              </div>
              <div className="value-item">
                <h3>🌍 Global Impact</h3>
                <p>
                  Contributing to sustainable industrial development across
                  Nigeria and internationally
                </p>
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
    name: "",
    email: "",
    company: "",
    reason: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/contact`, formData);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        company: "",
        reason: "",
        message: "",
      });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>Contact PrognoCore</h1>
          <p>
            Ready to transform your maintenance operations? Let's discuss how we
            can help.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info glass-card">
            <h2>Get In Touch</h2>
            <p>
              Whether you're looking to optimize existing operations, implement
              new predictive maintenance strategies, or explore partnership
              opportunities, our team is ready to help.
            </p>

            <div className="contact-methods">
              <div className="contact-method">
                <h3>📧 Email</h3>
                <p>info@prognocore.com</p>
                <p>Response within 24 hours</p>
              </div>

              <div className="contact-method">
                <h3>🌍 Location</h3>
                <p>Nigeria (Global Operations)</p>
                <p>Serving clients worldwide</p>
              </div>

              <div className="contact-method">
                <h3>⏰ Business Hours</h3>
                <p>Monday - Friday: 8:00 AM - 6:00 PM WAT</p>
                <p>Emergency support available 24/7</p>
              </div>
            </div>

            <div className="contact-cta">
              <h3>Schedule a Consultation</h3>
              <p>
                Book a free 30-minute consultation to discuss your predictive
                maintenance needs and explore how PrognoCore can add value to
                your operations.
              </p>
            </div>
          </div>

          <form className="contact-form glass-card" onSubmit={handleSubmit}>
            <h2>Send us a Message</h2>
            <p>
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="glass-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Business Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@company.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="glass-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company/Organization</label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Your company name"
                value={formData.company}
                onChange={handleChange}
                className="glass-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reason">Reason for Contact *</label>
              <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                className="glass-input"
              >
                <option value="">Select reason for contact</option>
                <option value="general-inquiry">General Inquiry</option>
                <option value="investor-interest">
                  Investment Opportunity
                </option>
                <option value="partnership">Partnership Proposal</option>
                <option value="client-consultation">Client Consultation</option>
                <option value="technical-support">Technical Support</option>
                <option value="media-press">Media & Press</option>
                <option value="career-opportunity">Career Opportunity</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your requirements, challenges, or how we can help..."
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="glass-input"
              ></textarea>
            </div>

            <button type="submit" className="glass-btn primary">
              Send Message
            </button>

            {status === "success" && (
              <div className="form-feedback success">
                <p>
                  ✅ Message sent successfully! We'll get back to you within 24
                  hours.
                </p>
              </div>
            )}
            {status === "error" && (
              <div className="form-feedback error">
                <p>
                  ❌ Failed to send message. Please try again or contact us
                  directly at info@prognocore.com
                </p>
              </div>
            )}
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
        <div className="learn-more-hero">
          <h1>The Science Behind Predictive Maintenance</h1>
          <p className="hero-description">
            Discover how PrognoCore transforms traditional maintenance into
            intelligent, data-driven operations that predict failures before
            they happen, optimize resources, and maximize equipment performance.
          </p>
        </div>

        {/* Introduction Section */}
        <section className="predictive-maintenance-intro glass-card">
          <div className="intro-content">
            <div className="intro-text">
              <h2>From Reactive to Predictive: The Evolution of Maintenance</h2>
              <p>
                Traditional maintenance approaches—reactive and preventive—are
                costly, inefficient, and unreliable. PrognoCore's predictive
                maintenance technology represents the future of industrial
                operations, leveraging IoT sensors, artificial intelligence, and
                advanced analytics to create a maintenance strategy that's both
                proactive and precise.
              </p>
              <div className="maintenance-comparison">
                <div className="maintenance-type">
                  <h3>❌ Reactive Maintenance</h3>
                  <p>
                    Wait for failure, then fix. High costs, safety risks,
                    unplanned downtime.
                  </p>
                </div>
                <div className="maintenance-type">
                  <h3>⚠️ Preventive Maintenance</h3>
                  <p>
                    Schedule based on time/usage. Better than reactive but still
                    inefficient.
                  </p>
                </div>
                <div className="maintenance-type highlight-type">
                  <h3>✅ Predictive Maintenance</h3>
                  <p>
                    Predict and prevent failures. Optimal timing, maximum
                    efficiency, minimum cost.
                  </p>
                </div>
              </div>
            </div>
            <div className="intro-visual">
              <img
                src="https://images.pexels.com/photos/5475750/pexels-photo-5475750.jpeg"
                alt="Predictive maintenance technology"
              />
            </div>
          </div>
        </section>

        {/* Technology Deep Dive */}
        <section className="technology-deep-dive">
          <h2>Advanced Technology Stack</h2>
          <div className="tech-layers">
            <div className="tech-layer glass-card">
              <div className="layer-icon">🔬</div>
              <div className="layer-content">
                <h3>Data Collection Layer</h3>
                <p>
                  Multi-parameter IoT sensors continuously monitor equipment
                  health through vibration analysis, thermal imaging, acoustic
                  emission detection, pressure monitoring, and oil analysis.
                </p>
                <div className="tech-specs">
                  <span>• Wireless sensor networks</span>
                  <span>• 5+ year battery life</span>
                  <span>• Real-time data streaming</span>
                  <span>• Edge computing capabilities</span>
                </div>
              </div>
            </div>

            <div className="tech-layer glass-card">
              <div className="layer-icon">🧠</div>
              <div className="layer-content">
                <h3>AI Analytics Layer</h3>
                <p>
                  Advanced machine learning algorithms process sensor data to
                  identify patterns, detect anomalies, and predict equipment
                  failures with 85%+ accuracy weeks before they occur.
                </p>
                <div className="tech-specs">
                  <span>• Deep learning neural networks</span>
                  <span>• Anomaly detection algorithms</span>
                  <span>• Digital twin modeling</span>
                  <span>• Continuous model improvement</span>
                </div>
              </div>
            </div>

            <div className="tech-layer glass-card">
              <div className="layer-icon">📊</div>
              <div className="layer-content">
                <h3>Intelligence Layer</h3>
                <p>
                  Transform raw predictions into actionable insights with
                  intelligent scheduling, resource optimization, and integration
                  with existing enterprise systems for seamless operations.
                </p>
                <div className="tech-specs">
                  <span>• Predictive maintenance scheduling</span>
                  <span>• Resource optimization</span>
                  <span>• ERP/CMMS integration</span>
                  <span>• Mobile alert systems</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Process */}
        <section className="implementation-process">
          <h2>Our Proven Implementation Methodology</h2>
          <div className="process-timeline">
            <div className="timeline-item glass-card">
              <div className="timeline-marker">
                <span className="phase-number">01</span>
                <span className="phase-duration">Weeks 1-2</span>
              </div>
              <div className="timeline-content">
                <h3>Discovery & Strategic Planning</h3>
                <p>
                  Comprehensive equipment audit, failure analysis, and strategic
                  roadmap development tailored to your operational requirements
                  and business objectives.
                </p>
                <div className="deliverables">
                  <h4>Key Deliverables:</h4>
                  <ul>
                    <li>Equipment criticality assessment</li>
                    <li>Baseline maintenance cost analysis</li>
                    <li>ROI projections and business case</li>
                    <li>Implementation roadmap</li>
                    <li>Success metrics definition</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="timeline-item glass-card">
              <div className="timeline-marker">
                <span className="phase-number">02</span>
                <span className="phase-duration">Weeks 3-4</span>
              </div>
              <div className="timeline-content">
                <h3>System Deployment & Integration</h3>
                <p>
                  Strategic sensor placement, network configuration, and
                  integration with existing enterprise systems to ensure
                  seamless data flow and operational continuity.
                </p>
                <div className="deliverables">
                  <h4>Key Activities:</h4>
                  <ul>
                    <li>IoT sensor installation and configuration</li>
                    <li>Network infrastructure setup</li>
                    <li>ERP/CMMS system integration</li>
                    <li>Data pipeline establishment</li>
                    <li>Security protocols implementation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="timeline-item glass-card">
              <div className="timeline-marker">
                <span className="phase-number">03</span>
                <span className="phase-duration">Weeks 5-6</span>
              </div>
              <div className="timeline-content">
                <h3>AI Model Training & Optimization</h3>
                <p>
                  Machine learning model development using historical and
                  real-time data to create equipment-specific predictive
                  algorithms with maximum accuracy and reliability.
                </p>
                <div className="deliverables">
                  <h4>Technical Focus:</h4>
                  <ul>
                    <li>Baseline equipment behavior modeling</li>
                    <li>Failure pattern recognition training</li>
                    <li>Prediction accuracy optimization</li>
                    <li>Alert threshold calibration</li>
                    <li>Performance validation testing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="timeline-item glass-card">
              <div className="timeline-marker">
                <span className="phase-number">04</span>
                <span className="phase-duration">Week 7+</span>
              </div>
              <div className="timeline-content">
                <h3>Go-Live & Continuous Optimization</h3>
                <p>
                  Full system activation with comprehensive training, ongoing
                  support, and continuous optimization to ensure maximum value
                  realization and long-term success.
                </p>
                <div className="deliverables">
                  <h4>Ongoing Support:</h4>
                  <ul>
                    <li>Team training and knowledge transfer</li>
                    <li>24/7 system monitoring</li>
                    <li>Continuous model improvement</li>
                    <li>Performance reporting and optimization</li>
                    <li>Strategic consultation and expansion</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ROI and Business Impact */}
        <section className="business-impact glass-card">
          <h2>Measurable Business Impact</h2>
          <div className="impact-grid">
            <div className="impact-category">
              <h3>Operational Excellence</h3>
              <div className="impact-metrics">
                <div className="metric-item">
                  <span className="metric-value">70%</span>
                  <span className="metric-label">
                    Reduction in unplanned downtime
                  </span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">95%+</span>
                  <span className="metric-label">
                    Equipment availability target
                  </span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">85%+</span>
                  <span className="metric-label">
                    Failure prediction accuracy
                  </span>
                </div>
              </div>
            </div>

            <div className="impact-category">
              <h3>Financial Performance</h3>
              <div className="impact-metrics">
                <div className="metric-item">
                  <span className="metric-value">45%</span>
                  <span className="metric-label">
                    Reduction in maintenance costs
                  </span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">40%</span>
                  <span className="metric-label">
                    Extension in equipment lifespan
                  </span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">6-12</span>
                  <span className="metric-label">
                    Months typical ROI period
                  </span>
                </div>
              </div>
            </div>

            <div className="impact-category">
              <h3>Strategic Advantages</h3>
              <div className="impact-metrics">
                <div className="metric-item">
                  <span className="metric-value">50%</span>
                  <span className="metric-label">
                    Improvement in maintenance efficiency
                  </span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">30%</span>
                  <span className="metric-label">
                    Reduction in spare parts inventory
                  </span>
                </div>
                <div className="metric-item">
                  <span className="metric-value">100%</span>
                  <span className="metric-label">
                    Visibility into equipment health
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Applications */}
        <section className="industry-applications">
          <h2>Real-World Applications Across Industries</h2>
          <div className="application-examples">
            <div className="application-card glass-card">
              <div className="app-icon">🏭</div>
              <h3>Manufacturing Excellence</h3>
              <p>
                Production line optimization with real-time monitoring of
                critical machinery, reducing quality defects by 60% and
                improving overall equipment effectiveness.
              </p>
              <div className="case-example">
                <strong>Case Study:</strong> Nigerian textile manufacturer
                achieved 40% increase in production efficiency within 6 months
                of implementation.
              </div>
            </div>

            <div className="application-card glass-card">
              <div className="app-icon">🛢️</div>
              <h3>Oil & Gas Reliability</h3>
              <p>
                Critical equipment monitoring in offshore platforms and
                refineries, ensuring 99.9% uptime and preventing catastrophic
                failures in harsh environments.
              </p>
              <div className="case-example">
                <strong>Case Study:</strong> West African oil platform reduced
                maintenance costs by 50% while improving safety metrics
                significantly.
              </div>
            </div>

            <div className="application-card glass-card">
              <div className="app-icon">⚡</div>
              <h3>Power Generation Optimization</h3>
              <p>
                Grid reliability enhancement through transformer monitoring and
                generator optimization, extending asset lifespan by 30% and
                reducing operational costs.
              </p>
              <div className="case-example">
                <strong>Case Study:</strong> Regional power utility achieved 25%
                reduction in O&M costs while improving grid stability.
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="learn-more-cta glass-card">
          <div className="cta-content">
            <h2>Ready to Transform Your Operations?</h2>
            <p>
              Join leading Nigerian and international companies that have
              revolutionized their maintenance strategies with PrognoCore's
              intelligent predictive maintenance solutions.
            </p>
            <div className="cta-stats">
              <div className="cta-stat">
                <span className="stat-number">8+</span>
                <span className="stat-label">Industries Served</span>
              </div>
              <div className="cta-stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Successful Implementations</span>
              </div>
              <div className="cta-stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">System Monitoring</span>
              </div>
            </div>
            <div className="cta-buttons">
              <Link to="/contact" className="glass-btn primary">
                Schedule Free Consultation
              </Link>
              <Link to="/industries" className="glass-btn secondary">
                Explore Industry Solutions
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Service Detail Pages
const ServiceDetail = ({ service }) => {
  const services = {
    "equipment-monitoring": {
      title: "Equipment Condition Monitoring",
      subtitle:
        "Real-time equipment health monitoring with advanced IoT sensor networks",
      description:
        "Our comprehensive equipment condition monitoring solution provides continuous, real-time visibility into your equipment health using advanced IoT sensors, machine learning analytics, and cloud-based data processing.",
      image:
        "https://images.pexels.com/photos/5475750/pexels-photo-5475750.jpeg",
      features: [
        "Multi-parameter sensor integration (vibration, temperature, pressure, acoustic)",
        "Real-time data streaming and cloud storage",
        "Mobile alerts and notifications",
        "Historical trend analysis and reporting",
        "Integration with existing CMMS/ERP systems",
      ],
      benefits: [
        "Early detection of equipment anomalies",
        "Reduced unexpected equipment failures",
        "Optimized maintenance scheduling",
        "Extended equipment lifespan",
        "Improved operational safety",
      ],
      techSpecs: [
        "Wireless sensor networks with 5+ year battery life",
        "Edge computing for real-time processing",
        "Cloud-based data analytics platform",
        "Mobile and web-based dashboards",
        "API integration capabilities",
      ],
    },
    "predictive-analytics": {
      title: "AI-Powered Predictive Analytics",
      subtitle:
        "Machine learning algorithms that predict equipment failures weeks in advance",
      description:
        "Our AI-powered predictive analytics platform uses advanced machine learning algorithms to analyze equipment behavior patterns, predict potential failures, and recommend optimal maintenance actions.",
      image:
        "https://images.pexels.com/photos/16053029/pexels-photo-16053029.jpeg",
      features: [
        "Machine learning failure prediction models",
        "Remaining useful life (RUL) estimation",
        "Anomaly detection and pattern recognition",
        "Multivariate time series analysis",
        "Digital twin development for complex systems",
      ],
      benefits: [
        "Predict failures 2-8 weeks in advance",
        "Reduce unplanned downtime by up to 70%",
        "Optimize maintenance intervals",
        "Improve spare parts inventory management",
        "Enhance operational decision-making",
      ],
      techSpecs: [
        "Deep learning neural networks",
        "Unsupervised anomaly detection",
        "Time series forecasting algorithms",
        "Real-time model updating",
        "Explainable AI for maintenance insights",
      ],
    },
    "erp-integration": {
      title: "Enterprise System Integration",
      subtitle:
        "Seamless integration with existing ERP, CMMS, and enterprise systems",
      description:
        "Our enterprise integration solution ensures seamless connectivity between predictive maintenance insights and your existing business systems, enabling automated workflows and unified operations management.",
      image: "https://images.unsplash.com/photo-1638696898556-2c1f3da83f42",
      features: [
        "SAP, Oracle, and Microsoft ERP integration",
        "Popular CMMS platform connectivity",
        "Custom API development",
        "Real-time data synchronization",
        "Automated workflow triggers",
      ],
      benefits: [
        "Unified operations management",
        "Automated maintenance work orders",
        "Integrated spare parts management",
        "Streamlined reporting and analytics",
        "Reduced manual data entry",
      ],
      techSpecs: [
        "RESTful API architecture",
        "Real-time and batch data synchronization",
        "Enterprise security protocols",
        "Custom integration development",
        "Workflow automation engine",
      ],
    },
    "maintenance-scheduling": {
      title: "Intelligent Maintenance Scheduling",
      subtitle:
        "Automated maintenance scheduling based on predictive insights and operational priorities",
      description:
        "Our intelligent maintenance scheduling system optimizes maintenance activities based on equipment condition, operational priorities, resource availability, and cost considerations.",
      image: "https://images.unsplash.com/photo-1510849911856-cdc9335e5597",
      features: [
        "Condition-based maintenance scheduling",
        "Resource optimization and planning",
        "Priority matrix management",
        "Cost-benefit analysis",
        "Automated work order generation",
      ],
      benefits: [
        "Optimized maintenance intervals",
        "Improved resource utilization",
        "Reduced maintenance costs",
        "Enhanced equipment reliability",
        "Better maintenance team productivity",
      ],
      techSpecs: [
        "Advanced scheduling algorithms",
        "Multi-constraint optimization",
        "Resource availability tracking",
        "Cost optimization models",
        "Integration with planning systems",
      ],
    },
  };

  const serviceInfo = services[service];

  if (!serviceInfo) {
    return (
      <div className="page">
        <div className="container">
          <h1>Service not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="service-detail">
          <div className="service-header glass-card">
            <img
              src={serviceInfo.image}
              alt={serviceInfo.title}
              className="service-image"
            />
            <div className="service-header-content">
              <h1>{serviceInfo.title}</h1>
              <p className="service-subtitle">{serviceInfo.subtitle}</p>
              <p className="service-description">{serviceInfo.description}</p>
            </div>
          </div>

          <div className="service-content">
            <div className="service-section glass-card">
              <h2>Key Features</h2>
              <ul>
                {serviceInfo.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="service-section glass-card">
              <h2>Business Benefits</h2>
              <ul>
                {serviceInfo.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="service-section glass-card">
              <h2>Technical Specifications</h2>
              <ul>
                {serviceInfo.techSpecs.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="service-cta glass-card">
            <h2>Ready to Get Started?</h2>
            <p>
              Contact our team to discuss how this service can transform your
              operations.
            </p>
            <Link to="/contact" className="glass-btn primary">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Industry Detail Pages
const IndustryDetail = ({ industry }) => {
  const industries = {
    manufacturing: {
      title: "Manufacturing Industry Solutions",
      subtitle:
        "Optimize production efficiency and equipment reliability in manufacturing environments",
      description:
        "PrognoCore delivers specialized predictive maintenance solutions for manufacturing operations, helping optimize production lines, reduce quality defects, and maximize equipment effectiveness.",
      image:
        "https://images.pexels.com/photos/7688543/pexels-photo-7688543.jpeg",
      challenges: [
        "Unplanned production line stoppages",
        "Quality control and defect prevention",
        "Equipment wear and degradation",
        "Maintenance cost optimization",
        "Just-in-time production requirements",
      ],
      solutions: [
        "Real-time production line monitoring",
        "Predictive quality analytics",
        "Equipment performance optimization",
        "Automated maintenance scheduling",
        "Cost reduction strategies",
      ],
      caseStudy: {
        title: "Manufacturing Plant Transformation",
        metrics: [
          { label: "Production Uptime", value: "98.5%", improvement: "+15%" },
          { label: "Quality Defects", value: "60%", improvement: "reduction" },
          { label: "Maintenance Costs", value: "35%", improvement: "savings" },
          { label: "OEE Improvement", value: "40%", improvement: "increase" },
        ],
      },
    },
    "oil-gas": {
      title: "Oil & Gas Industry Solutions",
      subtitle:
        "Critical equipment monitoring in challenging oil and gas environments",
      description:
        "Specialized predictive maintenance solutions for oil & gas operations, ensuring equipment reliability in harsh environments while maintaining the highest safety standards.",
      image:
        "https://images.pexels.com/photos/5475750/pexels-photo-5475750.jpeg",
      challenges: [
        "Remote and harsh operating environments",
        "Critical equipment failure consequences",
        "Safety and environmental compliance",
        "High maintenance and replacement costs",
        "Regulatory requirements and standards",
      ],
      solutions: [
        "Remote equipment monitoring systems",
        "Environmental sensor networks",
        "Safety-critical system analytics",
        "Compliance monitoring and reporting",
        "Cost optimization strategies",
      ],
      caseStudy: {
        title: "Offshore Platform Optimization",
        metrics: [
          {
            label: "Unplanned Downtime",
            value: "70%",
            improvement: "reduction",
          },
          { label: "Safety Incidents", value: "80%", improvement: "reduction" },
          { label: "Maintenance Costs", value: "45%", improvement: "savings" },
          {
            label: "Equipment Availability",
            value: "99.2%",
            improvement: "uptime",
          },
        ],
      },
    },
    "power-utilities": {
      title: "Power & Utilities Solutions",
      subtitle: "Ensure reliable energy generation and distribution systems",
      description:
        "Comprehensive predictive maintenance solutions for power generation, transmission, and distribution systems, ensuring grid reliability and optimizing asset performance.",
      image: "https://images.unsplash.com/photo-1638696898556-2c1f3da83f42",
      challenges: [
        "Grid reliability and stability requirements",
        "Aging infrastructure and equipment",
        "Regulatory compliance obligations",
        "Energy efficiency optimization",
        "Peak demand management",
      ],
      solutions: [
        "Grid monitoring and analytics",
        "Asset lifecycle management",
        "Compliance tracking systems",
        "Efficiency optimization tools",
        "Demand response management",
      ],
      caseStudy: {
        title: "Power Plant Modernization",
        metrics: [
          { label: "Grid Uptime", value: "99.9%", improvement: "reliability" },
          { label: "Asset Lifespan", value: "30%", improvement: "extension" },
          { label: "O&M Costs", value: "25%", improvement: "reduction" },
          {
            label: "Efficiency Gains",
            value: "18%",
            improvement: "improvement",
          },
        ],
      },
    },
    mining: {
      title: "Mining Industry Solutions",
      subtitle:
        "Remote equipment monitoring and predictive maintenance for mining operations",
      description:
        "Robust predictive maintenance solutions designed for the demanding mining environment, ensuring equipment reliability and operational safety in remote locations.",
      image: "https://images.unsplash.com/photo-1510849911856-cdc9335e5597",
      challenges: [
        "Remote location equipment monitoring",
        "Heavy machinery maintenance complexity",
        "Safety and environmental concerns",
        "High equipment replacement costs",
        "Operational continuity requirements",
      ],
      solutions: [
        "Remote monitoring systems",
        "Heavy equipment analytics",
        "Safety monitoring systems",
        "Environmental impact tracking",
        "Operational optimization tools",
      ],
      caseStudy: {
        title: "Mining Operation Enhancement",
        metrics: [
          {
            label: "Equipment Failures",
            value: "55%",
            improvement: "reduction",
          },
          { label: "Ore Recovery", value: "40%", improvement: "improvement" },
          { label: "Maintenance Costs", value: "50%", improvement: "savings" },
          { label: "Safety Score", value: "95%", improvement: "rating" },
        ],
      },
    },
    pharmaceutical: {
      title: "Pharmaceutical Manufacturing",
      subtitle:
        "Compliance-focused equipment monitoring solutions for pharmaceutical manufacturing",
      description:
        "Specialized predictive maintenance solutions ensuring regulatory compliance, product quality, and operational excellence in pharmaceutical manufacturing environments.",
      image:
        "https://images.pexels.com/photos/16053029/pexels-photo-16053029.jpeg",
      challenges: [
        "Strict regulatory compliance requirements",
        "Product quality assurance",
        "Contamination prevention",
        "Batch documentation and traceability",
        "Clean room environment maintenance",
      ],
      solutions: [
        "Compliance monitoring systems",
        "Quality control analytics",
        "Clean room monitoring",
        "Audit trail management",
        "Validation documentation",
      ],
      caseStudy: {
        title: "Pharma Plant Compliance",
        metrics: [
          {
            label: "Regulatory Compliance",
            value: "100%",
            improvement: "achievement",
          },
          { label: "Batch Failures", value: "80%", improvement: "reduction" },
          { label: "OEE Improvement", value: "35%", improvement: "increase" },
          { label: "Quality Score", value: "99.8%", improvement: "rating" },
        ],
      },
    },
    "food-beverage": {
      title: "Food & Beverage Industry",
      subtitle:
        "Hygienic monitoring systems ensuring food safety and production efficiency",
      description:
        "Food-grade predictive maintenance solutions that ensure product safety, maintain hygienic standards, and optimize production efficiency in food and beverage operations.",
      image:
        "https://images.pexels.com/photos/7688543/pexels-photo-7688543.jpeg",
      challenges: [
        "Food safety and hygiene standards",
        "Temperature control and monitoring",
        "Product traceability requirements",
        "Packaging integrity assurance",
        "Seasonal demand fluctuations",
      ],
      solutions: [
        "Hygiene monitoring systems",
        "Temperature tracking solutions",
        "Safety analytics platforms",
        "Traceability systems",
        "Production optimization tools",
      ],
      caseStudy: {
        title: "Food Processing Optimization",
        metrics: [
          {
            label: "Contamination Risks",
            value: "90%",
            improvement: "reduction",
          },
          {
            label: "Line Efficiency",
            value: "45%",
            improvement: "improvement",
          },
          { label: "Product Waste", value: "30%", improvement: "reduction" },
          {
            label: "Quality Compliance",
            value: "99.9%",
            improvement: "achievement",
          },
        ],
      },
    },
    automotive: {
      title: "Automotive Manufacturing",
      subtitle:
        "Production line optimization and quality control for automotive assembly",
      description:
        "Advanced predictive maintenance solutions for automotive manufacturing, ensuring production line efficiency, quality control, and just-in-time delivery requirements.",
      image: "https://images.unsplash.com/photo-1638696898556-2c1f3da83f42",
      challenges: [
        "High-speed production line requirements",
        "Quality control and zero-defect goals",
        "Just-in-time delivery pressures",
        "Equipment complexity and integration",
        "Cost pressure and efficiency demands",
      ],
      solutions: [
        "Production line monitoring",
        "Quality analytics systems",
        "Delivery optimization tools",
        "Equipment integration platforms",
        "Cost reduction strategies",
      ],
      caseStudy: {
        title: "Auto Assembly Enhancement",
        metrics: [
          { label: "Line Stoppages", value: "65%", improvement: "reduction" },
          {
            label: "First-Pass Yield",
            value: "50%",
            improvement: "improvement",
          },
          { label: "Cycle Time", value: "40%", improvement: "optimization" },
          {
            label: "Quality Score",
            value: "99.5%",
            improvement: "achievement",
          },
        ],
      },
    },
    fmcg: {
      title: "Fast-Moving Consumer Goods",
      subtitle:
        "High-speed production line monitoring for fast-moving consumer goods",
      description:
        "Specialized predictive maintenance solutions for FMCG operations, ensuring high-speed production efficiency, quality consistency, and rapid changeover capabilities.",
      image: "https://images.unsplash.com/photo-1510849911856-cdc9335e5597",
      challenges: [
        "High-speed production requirements",
        "Quality consistency across batches",
        "Rapid product changeovers",
        "Packaging integrity and efficiency",
        "Market demand fluctuations",
      ],
      solutions: [
        "High-speed line monitoring",
        "Quality control systems",
        "Changeover optimization",
        "Packaging analytics",
        "Demand forecasting integration",
      ],
      caseStudy: {
        title: "FMCG Production Excellence",
        metrics: [
          { label: "OEE Improvement", value: "75%", improvement: "increase" },
          { label: "Changeover Time", value: "60%", improvement: "reduction" },
          { label: "Product Waste", value: "35%", improvement: "reduction" },
          {
            label: "Line Efficiency",
            value: "85%",
            improvement: "achievement",
          },
        ],
      },
    },
  };

  const industryInfo = industries[industry];

  if (!industryInfo) {
    return (
      <div className="page">
        <div className="container">
          <h1>Industry not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="industry-detail">
          <div className="industry-header glass-card">
            <img
              src={industryInfo.image}
              alt={industryInfo.title}
              className="industry-image"
            />
            <div className="industry-header-content">
              <h1>{industryInfo.title}</h1>
              <p className="industry-subtitle">{industryInfo.subtitle}</p>
              <p className="industry-description">{industryInfo.description}</p>
            </div>
          </div>

          <div className="industry-content">
            <div className="industry-sections">
              <div className="challenges-section glass-card">
                <h2>Industry Challenges</h2>
                <ul>
                  {industryInfo.challenges.map((challenge, index) => (
                    <li key={index}>{challenge}</li>
                  ))}
                </ul>
              </div>

              <div className="solutions-section glass-card">
                <h2>Our Solutions</h2>
                <ul>
                  {industryInfo.solutions.map((solution, index) => (
                    <li key={index}>{solution}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="case-study glass-card">
              <h2>{industryInfo.caseStudy.title}</h2>
              <p>
                Real-world results achieved through PrognoCore implementation:
              </p>
              <div className="metrics-grid">
                {industryInfo.caseStudy.metrics.map((metric, index) => (
                  <div key={index} className="metric-card">
                    <h3>{metric.value}</h3>
                    <p>{metric.label}</p>
                    <span className="improvement">{metric.improvement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="industry-cta glass-card">
            <h2>Transform Your Operations</h2>
            <p>
              Ready to achieve similar results in your industry? Let's discuss
              your specific requirements.
            </p>
            <Link to="/contact" className="glass-btn primary">
              Schedule Industry Consultation
            </Link>
          </div>
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
            <ThemeLogo />
            <h3>PrognoCore</h3>
            <p>Predict. Prevent. Preform.</p>
          </div>
          <div className="footer-section">
            <h4>Services</h4>
            <Link to="/services/equipment-monitoring">
              Equipment Monitoring
            </Link>
            <Link to="/services/predictive-analytics">
              Predictive Analytics
            </Link>
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

          <div className="footer-section">
            <h4>Follow Us</h4>
            <a
              href="https://www.linkedin.com/company/prognocore"
              target="_blank"
              rel="noreferrer"
              className="social-icons"
            >
              <img src={linkedin} alt="LinkedIn" />
            </a>
            <a
              href="https://twitter.com/prognocore"
              target="_blank"
              rel="noreferrer"
              className="social-icons"
            >
              <img src={twitter} alt="Twitter" />
            </a>

            <a
              href="https://instagram.com/prognocore"
              target="_blank"
              rel="noreferrer"
              className="social-icons"
            >
              <img src={instagram} alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 PrognoCore. All rights reserved.</p>
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
        <p>
          <strong>Effective Date:</strong> March 2025
        </p>

        <h2>Information We Collect</h2>
        <p>
          PrognoCore collects information you voluntarily provide through our
          contact forms, newsletter signups, consultation requests, and when you
          interact with our predictive maintenance services. This may include
          personal information such as your name, email address, company
          information, and project requirements.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          We use collected information to respond to your inquiries, provide
          predictive maintenance services, send relevant industry updates,
          schedule consultations, and improve our service offerings. We may also
          use this information for business development and to better understand
          market needs in the predictive maintenance sector.
        </p>

        <h2>Data Protection and Security</h2>
        <p>
          PrognoCore implements enterprise-grade security measures to protect
          your personal and business information against unauthorized access,
          alteration, disclosure, or destruction. We use encryption, access
          controls, and regular security audits to ensure data protection.
        </p>

        <h2>Information Sharing</h2>
        <p>
          We do not sell, trade, or rent your personal information to third
          parties. We may share information with trusted service providers who
          assist in our operations, subject to confidentiality agreements. We
          may also disclose information when required by law or to protect our
          rights and safety.
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain your information for as long as necessary to provide
          services, comply with legal obligations, resolve disputes, and enforce
          agreements. You may request deletion of your personal data at any
          time, subject to legal and business requirements.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal
          information. You may also opt out of marketing communications at any
          time. For any privacy-related requests or concerns, please contact us
          at privacy@prognocore.com.
        </p>

        <h2>Contact Information</h2>
        <p>
          For questions about this Privacy Policy or our data practices, contact
          us at privacy@prognocore.com or through our contact form.
        </p>
      </div>
    </div>
  </div>
);

const TermsOfService = () => (
  <div className="page">
    <div className="container">
      <div className="legal-content glass-card">
        <h1>Terms of Service</h1>
        <p>
          <strong>Effective Date:</strong> March 2025
        </p>

        <h2>Acceptance of Terms</h2>
        <p>
          By accessing and using this website and PrognoCore's services, you
          accept and agree to be bound by the terms and provisions of this
          agreement. If you do not agree to these terms, please do not use our
          website or services.
        </p>

        <h2>Service Description</h2>
        <p>
          PrognoCore provides predictive maintenance solutions including
          equipment monitoring, AI-powered analytics, system integration, and
          maintenance optimization services. Our services are provided on a
          contract basis following detailed consultation and agreement
          processes.
        </p>

        <h2>Use License</h2>
        <p>
          Permission is granted to temporarily view the materials on
          PrognoCore's website for personal, non-commercial transitory viewing
          only. This license does not include the right to download, modify, or
          distribute website content without explicit permission.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content, technology, software, and methodologies provided by
          PrognoCore remain our intellectual property. Clients receive usage
          rights as specified in individual service agreements. Reverse
          engineering or replication of our solutions is prohibited.
        </p>

        <h2>Service Limitations</h2>
        <p>
          While we strive for accuracy in our predictive maintenance solutions,
          equipment predictions are based on available data and analytical
          models. PrognoCore does not guarantee prevention of all equipment
          failures and recommends maintaining appropriate backup and safety
          procedures.
        </p>

        <h2>Privacy and Data Security</h2>
        <p>
          Client data security is paramount. We implement enterprise-grade
          security measures and maintain strict confidentiality of all client
          information. Detailed data handling procedures are outlined in our
          Privacy Policy and individual service agreements.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          PrognoCore's liability is limited to the value of services provided.
          We are not liable for indirect, consequential, or incidental damages.
          Clients maintain responsibility for operational decisions based on our
          recommendations and insights.
        </p>

        <h2>Contact Information</h2>
        <p>
          For questions about these Terms of Service, contact us at
          info@prognocore.com or through our contact form.
        </p>
      </div>
    </div>
  </div>
);

// Cookie Consent Component
const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="cookie-consent">
      <div className="cookie-content glass-card">
        <h4>Cookie Consent</h4>
        <p>
          We use cookies to enhance your browsing experience, serve personalized
          content, and analyze our traffic. By clicking "Accept", you consent to
          our use of cookies for website optimization and analytics.
        </p>
        <div className="cookie-buttons">
          <button onClick={acceptCookies} className="glass-btn primary">
            Accept All
          </button>
          <button onClick={declineCookies} className="glass-btn secondary">
            Decline
          </button>
          <Link to="/privacy" className="cookie-link">
            Learn More
          </Link>
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
        console.log("API Connected:", response.data);
      } catch (error) {
        console.error("API Connection Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    testConnection();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loader">Loading PrognoCore...</div>
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
              <Route
                path="/services/:service"
                element={<ServiceDetailRouter />}
              />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route
                path="/industries/:industry"
                element={<IndustryDetailRouter />}
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/learn-more" element={<LearnMorePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
            </Routes>
          </main>
          <Footer />
          <CookieConsent />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

// Router wrapper components
const ServiceDetailRouter = () => {
  const location = useLocation();
  const service = location.pathname.split("/").pop();
  return <ServiceDetail service={service} />;
};

const IndustryDetailRouter = () => {
  const location = useLocation();
  const industry = location.pathname.split("/").pop();
  return <IndustryDetail industry={industry} />;
};

export default App;
