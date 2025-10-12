/**
 * LanguageManager Class
 * Handles language switching and translations
 */

import { CONFIG } from '../config.js';

export class LanguageManager {
  constructor() {
    this.currentLanguage = CONFIG.LANGUAGES.EN;
    this.translations = {
      [CONFIG.LANGUAGES.EN]: {
        // Navigation
        'Home': 'Home',
        'Services': 'Services',
        'Work': 'Work',
        'Approach': 'Approach',
        'About': 'About',
        'Contact': 'Contact',
        
        // Hero Section
        'ALPERDIGITAL': 'ALPERDIGITAL',
        'We translate falling code into working systems': 'We translate falling code into working systems.',
        'Enter': 'Enter',
        
        // Services
        'OUR SERVICES': 'OUR SERVICES',
        'AI Systems': 'AI Systems',
        'Cybersecurity': 'Cybersecurity',
        'Creative Engineering': 'Creative Engineering',
        
        // Portfolio
        'PORTFOLIO': 'PORTFOLIO',
        'Mobile Applications': 'Mobile Applications',
        'Web Applications': 'Web Applications',
        'AI-Powered Systems': 'AI-Powered Systems',
        
        // Approach
        'OUR METHODOLOGY': 'OUR METHODOLOGY',
        'Decode': 'Decode',
        'Model': 'Model',
        'Secure': 'Secure',
        'Ship': 'Ship',
        
        // About
        'ABOUT US': 'ABOUT US',
        'Founder': 'Founder',
        'Our Mission': 'Our Mission',
        'Core Values': 'Core Values',
        
        // Contact
        'GET IN TOUCH': 'GET IN TOUCH',
        'Email Us': 'Email Us',
        'Call Us': 'Call Us',
        'Location': 'Location',
        'Response Time': 'Response Time',
        
        // Footer
        'Temet Nosce': 'Temet Nosce',
        
        // Loading
        'ENTERING THE MATRIX': 'ENTERING THE MATRIX',
        'INITIALIZING SYSTEMS...': 'INITIALIZING SYSTEMS...',
        'SCROLL TO DECODE': 'SCROLL TO DECODE',
        
        // Additional content
        '24/7 Support': '24/7 Support',
        'Abdullah Alper Baş leads Alperdigital with a vision to bridge the gap between cutting-edge technology and real-world solutions.': 'Abdullah Alper Baş leads Alperdigital with a vision to bridge the gap between cutting-edge technology and real-world solutions.',
        'Advanced security solutions and penetration testing for enterprise systems.': 'Advanced security solutions and penetration testing for enterprise systems.',
        'Agile development with continuous testing, code reviews, and quality assurance at every step.': 'Agile development with continuous testing, code reviews, and quality assurance at every step.',
        'Agile Development': 'Agile Development',
        'AI & Machine Learning': 'AI & Machine Learning',
        'AI Expert': 'AI Expert',
        'API Development': 'API Development',
        'App Store Optimization': 'App Store Optimization',
        'Architecture Review': 'Architecture Review',
        'Automated Testing': 'Automated Testing',
        'AWS & Azure': 'AWS & Azure',
        'Based in Turkey, serving clients worldwide remotely.': 'Based in Turkey, serving clients worldwide remotely.',
        'CI/CD Pipeline': 'CI/CD Pipeline',
        'CI/CD Pipelines': 'CI/CD Pipelines',
        'Client Satisfaction': 'Client Satisfaction',
        'Cloud Solutions': 'Cloud Solutions',
        'Code Reviews': 'Code Reviews',
        'Computer Vision': 'Computer Vision',
        'CONNECT NOW': 'CONNECT NOW',
        'Container Orchestration': 'Container Orchestration',
        'Create scalable, maintainable solutions with modern design patterns and cutting-edge technologies.': 'Create scalable, maintainable solutions with modern design patterns and cutting-edge technologies.',
        'Cross-platform mobile solutions that deliver native performance and user experience.': 'Cross-platform mobile solutions that deliver native performance and user experience.',
        'Cross-platform mobile solutions with AI integration and modern UX design.': 'Cross-platform mobile solutions with AI integration and modern UX design.',
        'Custom AI Models': 'Custom AI Models',
        'Database Design': 'Database Design',
        'Deep dive into your business requirements, market conditions, and technical constraints to build the perfect foundation.': 'Deep dive into your business requirements, market conditions, and technical constraints to build the perfect foundation.',
        'Deployment & Support': 'Deployment & Support',
        'Design & Architecture': 'Design & Architecture',
        'Development & Testing': 'Development & Testing',
        'Digital Transformation': 'Digital Transformation',
        'DIRECT CALL': 'DIRECT CALL',
        'Flutter Development': 'Flutter Development',
        'Fortress-grade protection for your digital infrastructure with zero-trust architecture.': 'Fortress-grade protection for your digital infrastructure with zero-trust architecture.',
        'Full-Stack Development': 'Full-Stack Development',
        'Full-Stack': 'Full-Stack',
        'Human-centered.': 'Human-centered.',
        'Incident Response': 'Incident Response',
        'Infrastructure as Code': 'Infrastructure as Code',
        'Innovation': 'Innovation',
        'Intelligent automation solutions that learn, adapt, and evolve with your business needs.': 'Intelligent automation solutions that learn, adapt, and evolve with your business needs.',
        'iOS & Android Apps': 'iOS & Android Apps',
        'Learning': 'Learning',
        'Let\'s discuss how we can transform your digital challenges into competitive advantages.': 'Let\'s discuss how we can transform your digital challenges into competitive advantages.',
        'Machine learning solutions and intelligent automation for business optimization.': 'Machine learning solutions and intelligent automation for business optimization.',
        'Market Research': 'Market Research',
        'Measurable.': 'Measurable.',
        'Mobile Apps': 'Mobile Apps',
        'Mobile Development': 'Mobile Development',
        'Modern, scalable web applications with cutting-edge technologies and best practices.': 'Modern, scalable web applications with cutting-edge technologies and best practices.',
        'Monitoring': 'Monitoring',
        'Natural Language Processing': 'Natural Language Processing',
        'Our Mission': 'Our Mission',
        'Penetration Testing': 'Penetration Testing',
        'Performance Optimization': 'Performance Optimization',
        'Predictive Analytics': 'Predictive Analytics',
        'Progressive Web Apps': 'Progressive Web Apps',
        'Projects Delivered': 'Projects Delivered',
        'Quality': 'Quality',
        'React Native': 'React Native',
        'Ready to Enter the Matrix?': 'Ready to Enter the Matrix?',
        'Reliability': 'Reliability',
        'Research & Analysis': 'Research & Analysis',
        'Scalable cloud infrastructure and DevOps solutions for modern applications.': 'Scalable cloud infrastructure and DevOps solutions for modern applications.',
        'Scalable web platforms with real-time capabilities and modern architecture.': 'Scalable web platforms with real-time capabilities and modern architecture.',
        'Seamless deployment with comprehensive monitoring, maintenance, and ongoing support.': 'Seamless deployment with comprehensive monitoring, maintenance, and ongoing support.',
        'Secure.': 'Secure.',
        'Security Audits': 'Security Audits',
        'Security-first approach, human-centered design, and continuous learning drive everything we build.': 'Security-first approach, human-centered design, and continuous learning drive everything we build.',
        'Security': 'Security',
        'Send us a message and we\'ll get back to you within 24 hours.': 'Send us a message and we\'ll get back to you within 24 hours.',
        'Speak directly with our team for immediate assistance.': 'Speak directly with our team for immediate assistance.',
        'Strategic technology consulting to help you make informed decisions and drive innovation.': 'Strategic technology consulting to help you make informed decisions and drive innovation.',
        'Support Available': 'Support Available',
        'System Design': 'System Design',
        'Team Training': 'Team Training',
        'Tech Consulting': 'Tech Consulting',
        'Technical Audit': 'Technical Audit',
        'Technology Strategy': 'Technology Strategy',
        'UI/UX Design': 'UI/UX Design',
        'Uptime Achieved': 'Uptime Achieved',
        'User Analysis': 'User Analysis',
        'UX Focus': 'UX Focus',
        'Vulnerability Assessment': 'Vulnerability Assessment',
        'We transform complex digital challenges into elegant, scalable solutions that drive business growth and innovation.': 'We transform complex digital challenges into elegant, scalable solutions that drive business growth and innovation.',
        'We typically respond to inquiries within 2-4 hours.': 'We typically respond to inquiries within 2-4 hours.',
        'Web Development': 'Web Development'
      },
      [CONFIG.LANGUAGES.TR]: {
        // Navigation
        'Home': 'Ana Sayfa',
        'Services': 'Hizmetler',
        'Work': 'İşler',
        'Approach': 'Yaklaşım',
        'About': 'Hakkımızda',
        'Contact': 'İletişim',
        
        // Hero Section
        'ALPERDIGITAL': 'ALPERDIGITAL',
        'We translate falling code into working systems': 'Düşen kodları çalışan sistemlere dönüştürüyoruz.',
        'Enter': 'Gir',
        
        // Services
        'OUR SERVICES': 'HİZMETLERİMİZ',
        'AI Systems': 'AI Sistemleri',
        'Cybersecurity': 'Siber Güvenlik',
        'Creative Engineering': 'Yaratıcı Mühendislik',
        
        // Portfolio
        'PORTFOLIO': 'PORTFÖY',
        'Mobile Applications': 'Mobil Uygulamalar',
        'Web Applications': 'Web Uygulamaları',
        'AI-Powered Systems': 'AI Destekli Sistemler',
        
        // Approach
        'OUR METHODOLOGY': 'METODOLOJİMİZ',
        'Decode': 'Çöz',
        'Model': 'Modelle',
        'Secure': 'Güvenli Hale Getir',
        'Ship': 'Teslim Et',
        
        // About
        'ABOUT US': 'HAKKIMIZDA',
        'Founder': 'Kurucu',
        'Our Mission': 'Misyonumuz',
        'Core Values': 'Temel Değerler',
        
        // Contact
        'GET IN TOUCH': 'İLETİŞİME GEÇİN',
        'Email Us': 'E-posta Gönder',
        'Call Us': 'Bizi Arayın',
        'Location': 'Konum',
        'Response Time': 'Yanıt Süresi',
        
        // Footer
        'Temet Nosce': 'Temet Nosce',
        
        // Loading
        'ENTERING THE MATRIX': 'MATRİSE GİRİŞ',
        'INITIALIZING SYSTEMS...': 'SİSTEMLER BAŞLATILIYOR...',
        'SCROLL TO DECODE': 'ÇÖZMEK İÇİN KAYDIR',
        
        // Additional content
        '24/7 Support': '7/24 Destek',
        'Abdullah Alper Baş leads Alperdigital with a vision to bridge the gap between cutting-edge technology and real-world solutions.': 'Abdullah Alper Baş, en son teknoloji ile gerçek dünya çözümleri arasındaki boşluğu kapatma vizyonuyla Alperdigital\'i yönetiyor.',
        'Advanced security solutions and penetration testing for enterprise systems.': 'Kurumsal sistemler için gelişmiş güvenlik çözümleri ve penetrasyon testleri.',
        'Agile development with continuous testing, code reviews, and quality assurance at every step.': 'Her adımda sürekli test, kod incelemeleri ve kalite güvencesi ile çevik geliştirme.',
        'Agile Development': 'Çevik Geliştirme',
        'AI & Machine Learning': 'AI ve Makine Öğrenmesi',
        'AI Expert': 'AI Uzmanı',
        'API Development': 'API Geliştirme',
        'App Store Optimization': 'Uygulama Mağazası Optimizasyonu',
        'Architecture Review': 'Mimari İnceleme',
        'Automated Testing': 'Otomatik Test',
        'AWS & Azure': 'AWS ve Azure',
        'Based in Turkey, serving clients worldwide remotely.': 'Türkiye merkezli, dünya çapında müşterilere uzaktan hizmet veriyoruz.',
        'CI/CD Pipeline': 'CI/CD Pipeline',
        'CI/CD Pipelines': 'CI/CD Pipeline\'ları',
        'Client Satisfaction': 'Müşteri Memnuniyeti',
        'Cloud Solutions': 'Bulut Çözümleri',
        'Code Reviews': 'Kod İncelemeleri',
        'Computer Vision': 'Bilgisayar Görüşü',
        'CONNECT NOW': 'ŞİMDİ BAĞLAN',
        'Container Orchestration': 'Konteyner Orkestrasyonu',
        'Create scalable, maintainable solutions with modern design patterns and cutting-edge technologies.': 'Modern tasarım desenleri ve en son teknolojilerle ölçeklenebilir, sürdürülebilir çözümler oluşturun.',
        'Cross-platform mobile solutions that deliver native performance and user experience.': 'Yerel performans ve kullanıcı deneyimi sunan çapraz platform mobil çözümler.',
        'Cross-platform mobile solutions with AI integration and modern UX design.': 'AI entegrasyonu ve modern UX tasarımı ile çapraz platform mobil çözümler.',
        'Custom AI Models': 'Özel AI Modelleri',
        'Database Design': 'Veritabanı Tasarımı',
        'Deep dive into your business requirements, market conditions, and technical constraints to build the perfect foundation.': 'Mükemmel temeli oluşturmak için iş gereksinimlerinizi, pazar koşullarını ve teknik kısıtlamaları derinlemesine inceleyin.',
        'Deployment & Support': 'Dağıtım ve Destek',
        'Design & Architecture': 'Tasarım ve Mimari',
        'Development & Testing': 'Geliştirme ve Test',
        'Digital Transformation': 'Dijital Dönüşüm',
        'DIRECT CALL': 'DOĞRUDAN ARA',
        'Flutter Development': 'Flutter Geliştirme',
        'Fortress-grade protection for your digital infrastructure with zero-trust architecture.': 'Sıfır güven mimarisi ile dijital altyapınız için kale düzeyinde koruma.',
        'Full-Stack Development': 'Full-Stack Geliştirme',
        'Full-Stack': 'Full-Stack',
        'Human-centered.': 'İnsan odaklı.',
        'Incident Response': 'Olay Müdahalesi',
        'Infrastructure as Code': 'Kod Olarak Altyapı',
        'Innovation': 'İnovasyon',
        'Intelligent automation solutions that learn, adapt, and evolve with your business needs.': 'İş ihtiyaçlarınızla öğrenen, uyum sağlayan ve gelişen akıllı otomasyon çözümleri.',
        'iOS & Android Apps': 'iOS ve Android Uygulamaları',
        'Learning': 'Öğrenme',
        'Let\'s discuss how we can transform your digital challenges into competitive advantages.': 'Dijital zorluklarınızı rekabet avantajlarına nasıl dönüştürebileceğimizi konuşalım.',
        'Machine learning solutions and intelligent automation for business optimization.': 'İş optimizasyonu için makine öğrenmesi çözümleri ve akıllı otomasyon.',
        'Market Research': 'Pazar Araştırması',
        'Measurable.': 'Ölçülebilir.',
        'Mobile Apps': 'Mobil Uygulamalar',
        'Mobile Development': 'Mobil Geliştirme',
        'Modern, scalable web applications with cutting-edge technologies and best practices.': 'En son teknolojiler ve en iyi uygulamalarla modern, ölçeklenebilir web uygulamaları.',
        'Monitoring': 'İzleme',
        'Natural Language Processing': 'Doğal Dil İşleme',
        'Our Mission': 'Misyonumuz',
        'Penetration Testing': 'Penetrasyon Testi',
        'Performance Optimization': 'Performans Optimizasyonu',
        'Predictive Analytics': 'Tahmine Dayalı Analitik',
        'Progressive Web Apps': 'Progresif Web Uygulamaları',
        'Projects Delivered': 'Teslim Edilen Projeler',
        'Quality': 'Kalite',
        'React Native': 'React Native',
        'Ready to Enter the Matrix?': 'Matrise Girmeye Hazır mısınız?',
        'Reliability': 'Güvenilirlik',
        'Research & Analysis': 'Araştırma ve Analiz',
        'Scalable cloud infrastructure and DevOps solutions for modern applications.': 'Modern uygulamalar için ölçeklenebilir bulut altyapısı ve DevOps çözümleri.',
        'Scalable web platforms with real-time capabilities and modern architecture.': 'Gerçek zamanlı yetenekler ve modern mimari ile ölçeklenebilir web platformları.',
        'Seamless deployment with comprehensive monitoring, maintenance, and ongoing support.': 'Kapsamlı izleme, bakım ve sürekli destek ile sorunsuz dağıtım.',
        'Secure.': 'Güvenli.',
        'Security Audits': 'Güvenlik Denetimleri',
        'Security-first approach, human-centered design, and continuous learning drive everything we build.': 'Güvenlik odaklı yaklaşım, insan odaklı tasarım ve sürekli öğrenme, inşa ettiğimiz her şeyi yönlendirir.',
        'Security': 'Güvenlik',
        'Send us a message and we\'ll get back to you within 24 hours.': 'Bize bir mesaj gönderin, 24 saat içinde size geri döneriz.',
        'Speak directly with our team for immediate assistance.': 'Acil yardım için ekibimizle doğrudan konuşun.',
        'Strategic technology consulting to help you make informed decisions and drive innovation.': 'Bilgili kararlar vermenize ve inovasyonu yönlendirmenize yardımcı olmak için stratejik teknoloji danışmanlığı.',
        'Support Available': 'Destek Mevcut',
        'System Design': 'Sistem Tasarımı',
        'Team Training': 'Ekip Eğitimi',
        'Tech Consulting': 'Teknoloji Danışmanlığı',
        'Technical Audit': 'Teknik Denetim',
        'Technology Strategy': 'Teknoloji Stratejisi',
        'UI/UX Design': 'UI/UX Tasarım',
        'Uptime Achieved': 'Çalışma Süresi Elde Edildi',
        'User Analysis': 'Kullanıcı Analizi',
        'UX Focus': 'UX Odaklı',
        'Vulnerability Assessment': 'Zafiyet Değerlendirmesi',
        'We transform complex digital challenges into elegant, scalable solutions that drive business growth and innovation.': 'Karmaşık dijital zorlukları, iş büyümesi ve inovasyonu yönlendiren zarif, ölçeklenebilir çözümlere dönüştürüyoruz.',
        'We typically respond to inquiries within 2-4 hours.': 'Genellikle sorgulara 2-4 saat içinde yanıt veriyoruz.',
        'Web Development': 'Web Geliştirme'
      }
    };
    
    this.init();
  }

  /**
   * Initialize language manager
   */
  init() {
    this.setupLanguageToggle();
    this.updateLanguage();
  }

  /**
   * Setup language toggle button
   */
  setupLanguageToggle() {
    const toggleBtn = document.getElementById('language-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      this.toggleLanguage();
    });
  }

  /**
   * Toggle between languages
   */
  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === CONFIG.LANGUAGES.EN 
      ? CONFIG.LANGUAGES.TR 
      : CONFIG.LANGUAGES.EN;
    
    this.updateLanguage();
    this.updateToggleButton();
  }

  /**
   * Update language throughout the page
   */
  updateLanguage() {
    const elements = document.querySelectorAll('[data-en], [data-tr]');
    
    elements.forEach(element => {
      const enKey = element.getAttribute('data-en');
      const trKey = element.getAttribute('data-tr');
      
      if (enKey && this.translations[this.currentLanguage][enKey]) {
        element.textContent = this.translations[this.currentLanguage][enKey];
      } else if (trKey && this.translations[this.currentLanguage][trKey]) {
        element.textContent = this.translations[this.currentLanguage][trKey];
      }
    });
    
    // Update page title and meta description
    this.updatePageMeta();
  }

  /**
   * Update page meta information
   */
  updatePageMeta() {
    const title = this.translations[this.currentLanguage]['hero-title'];
    const description = this.translations[this.currentLanguage]['hero-subtitle'];
    
    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }
  }

  /**
   * Update toggle button appearance
   */
  updateToggleButton() {
    const toggleBtn = document.getElementById('language-toggle');
    if (!toggleBtn) return;

    const isEnglish = this.currentLanguage === CONFIG.LANGUAGES.EN;
    toggleBtn.textContent = isEnglish ? '🇹🇷' : '🇬🇧';
    toggleBtn.setAttribute('aria-label', 
      isEnglish ? 'Switch to Turkish' : 'Switch to English'
    );
  }

  /**
   * Get current language
   * @returns {string} Current language code
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Set language programmatically
   * @param {string} language - Language code ('en' or 'tr')
   */
  setLanguage(language) {
    if (this.translations[language]) {
      this.currentLanguage = language;
      this.updateLanguage();
      this.updateToggleButton();
    }
  }

  /**
   * Get translation for a key
   * @param {string} key - Translation key
   * @returns {string} Translated text
   */
  translate(key) {
    return this.translations[this.currentLanguage][key] || key;
  }
}
