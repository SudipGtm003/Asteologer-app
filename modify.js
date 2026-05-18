import { readFileSync, readdirSync, writeFileSync } from 'fs';

const files = readdirSync('.').filter(f => f.endsWith('.html'));

const topBannerHTML = `
<!-- TOP BANNER -->
<div class="top-banner">
  <div class="marquee-container">
    <div class="top-banner-text" data-i18n="banner_welcome">卐 ज्योतिष सेवामा स्वागत छ 卐</div>
  </div>
  <button id="lang-toggle-btn" class="lang-toggle" onclick="toggleLanguage()">EN</button>
</div>
`;

for (const file of files) {
  let content = readFileSync(file, 'utf8');

  // Add the topBanner before <nav> if not exists
  if (!content.includes('class="top-banner"')) {
    content = content.replace(/<nav>/, topBannerHTML + '\n<nav>');
  }

  // Inject i18n script before </body>
  if (!content.includes('src="i18n.js"')) {
    content = content.replace(/<\/body>/, '<script src="i18n.js"></script>\n</body>');
  }

  // Add data-i18n map replacing hardcoded lines
  // Index hero
  content = content.replace(/<h3 class="hero-title">Professional Astrologer<\/h3>/g, '<h3 class="hero-title" data-i18n="hero_prof">Professional Astrologer</h3>');
  content = content.replace(/<p class="hero-tagline">([^<]*)<\/p>/g, '<p class="hero-tagline" data-i18n="hero_tagline">$1</p>');
  content = content.replace(/>Book Consultation<\/a>/g, ' data-i18n="hero_btn_book">Book Consultation</a>');
  content = content.replace(/>WhatsApp Now<\/a>/g, ' data-i18n="hero_btn_wa">WhatsApp Now</a>');

  // Nav
  content = content.replace(/<a href=\"?\/index\.html\"?>([^<]+)\/a>/g, '<a href="/index.html" data-i18n="nav_home">🏠Home</a>');
  content = content.replace(/>📄About Us<\/a>/g, ' data-i18n="nav_about">📄About Us</a>');
  content = content.replace(/>📞Contact Us<\/a>/g, ' data-i18n="nav_contact">📞Contact Us</a>');
  content = content.replace(/>⋆⭒˚.⋆🔭नाम → राशि<\/a>/g, ' data-i18n="nav_rashi_name">⋆⭒˚.⋆🔭नाम → राशि</a>');
  content = content.replace(/>📅Calender<\/a>/g, ' data-i18n="nav_calender">📅Calender</a>');
  content = content.replace(/>🔮राशिफल<\/a>/g, ' data-i18n="nav_rashifal">🔮राशिफल</a>');
  content = content.replace(/>🪐कुंडली<\/a>/g, ' data-i18n="nav_kundali">🪐कुंडली</a>');

  // Cards
  content = content.replace(/<h4>Kundali Analysis<\/h4>/g, '<h4 data-i18n="card_kundali_title">Kundali Analysis</h4>');
  content = content.replace(/<p>In-depth birth chart reading for career, health &amp; future.<\/p>/g, '<p data-i18n="card_kundali_desc">In-depth birth chart reading for career, health & future.</p>');
  
  content = content.replace(/<h4>Marriage Analysis<\/h4>/g, '<h4 data-i18n="card_marriage_title">Marriage Analysis</h4>');
  content = content.replace(/<p>Kundali matching, timing of marriage &amp; married life predictions.<\/p>/g, '<p data-i18n="card_marriage_desc">Kundali matching, timing of marriage & married life predictions.</p>');

  content = content.replace(/<h4>Relationship Analysis<\/h4>/g, '<h4 data-i18n="card_relationship_title">Relationship Analysis</h4>');
  content = content.replace(/<p>Understand compatibility &amp; dynamics of your relationship.<\/p>/g, '<p data-i18n="card_relationship_desc">Understand compatibility & dynamics of your relationship.</p>');
  
  content = content.replace(/<h4>आजको राशिफल<\/h4>/g, '<h4 data-i18n="card_rashifal_title">आजको राशिफल</h4>');
  content = content.replace(/<p>तपाईको दैनिक राशिफल हेर्नुहोस्।<\/p>/g, '<p data-i18n="card_rashifal_desc">तपाईको दैनिक राशिफल हेर्नुहोस्।</p>');
  
  content = content.replace(/<h4>नेपाली पात्रो<\/h4>/g, '<h4 data-i18n="card_calender_title">नेपाली पात्रो</h4>');
  content = content.replace(/<p>चाडपर्व र शुभ साइतहरू।<\/p>/g, '<p data-i18n="card_calender_desc">चाडपर्व र शुभ साइतहरू।</p>');
  
  content = content.replace(/<h4>नाम बाट राशि<\/h4>/g, '<h4 data-i18n="card_name_rashi_title">नाम बाट राशि</h4>');
  content = content.replace(/<p>आफ्नो नामको अक्षरबाट राशि थाहा पाउनुहोस्।<\/p>/g, '<p data-i18n="card_name_rashi_desc">आफ्नो नामको अक्षरबाट राशि थाहा पाउनुहोस्।</p>');

  // Footer
  content = content.replace(/<p>&copy; 2026 All Right Reserved \| Sudip Gautam<\/p>/g, '<p data-i18n="footer_rights">&copy; 2026 All Right Reserved | Sudip Gautam</p>');

  // Titles in files
  content = content.replace(/<div class="title" style="[^"]*">\s*卐 ज्योतिष सेवामा स्वागत छ 卐\s*<\/div>/, '');

  content = content.replace(/<h2 style="[^"]*">हाम्रो बारेमा \(About Us\)<\/h2>/, '<h2 style="color: var(--primary);" data-i18n="about_title">हाम्रो बारेमा (About Us)</h2>');
  content = content.replace(/<p>ज्योतिष शास्त्र एक प्राचीन विज्ञान हो जसले मानव जीवन र ब्रह्माण्डबीचको सम्बन्धलाई बुझाउँछ। हामी तपाईंलाई जीवनका विभिन्न पक्षहरू जस्तै शिक्षा, पेशा, स्वास्थ्य, विवाह आदिमा सही मार्गदर्शन प्रदान गर्दछौं।<\/p>/g, '<p data-i18n="about_p1">ज्योतिष शास्त्र एक प्राचीन विज्ञान हो जसले मानव जीवन र ब्रह्माण्डबीचको सम्बन्धलाई बुझाउँछ। हामी तपाईंलाई जीवनका विभिन्न पक्षहरू जस्तै शिक्षा, पेशा, स्वास्थ्य, विवाह आदिमा सही मार्गदर्शन प्रदान गर्दछौं।</p>');
  content = content.replace(/<p>हाम्रो उद्देश्य तपाईंका समस्याहरूलाई ज्योतिषीय दृष्टिकोणबाट समाधान गर्नु र तपाईंको भविष्य सुनौलो बनाउन मद्दत गर्नु हो।<\/p>/g, '<p data-i18n="about_p2">हाम्रो उद्देश्य तपाईंका समस्याहरूलाई ज्योतिषीय दृष्टिकोणबाट समाधान गर्नु र तपाईंको भविष्य सुनौलो बनाउन मद्दत गर्नु हो。</p>');

  content = content.replace(/<h2 style="[^"]*">सम्पर्क गर्नुहोस्<\/h2>/, '<h2 style="color: var(--primary);" data-i18n="contact_title">सम्पर्क गर्नुहोस्</h2>');
  content = content.replace(/<p>थप जानकारी वा व्यक्तिगत परामर्शको लागि तलको फर्म भर्नुहोस्।<\/p>/, '<p data-i18n="contact_p">थप जानकारी वा व्यक्तिगत परामर्शको लागि तलको फर्म भर्नुहोस्।</p>');
  content = content.replace(/<label style="[^"]*">तपाईंको नाम \(Full Name\)<\/label>/g, '<label style="color: var(--primary); font-weight: bold;" data-i18n="form_name">तपाईंको नाम (Full Name)</label>');
  content = content.replace(/<label style="[^"]*">सम्पर्क नम्बर \(Contact Number\)<\/label>/g, '<label style="color: var(--primary); font-weight: bold;" data-i18n="form_phone">सम्पर्क नम्बर (Contact Number)</label>');
  content = content.replace(/<label style="[^"]*">जन्म मिति \(Date of Birth\)<\/label>/g, '<label style="color: var(--primary); font-weight: bold;" data-i18n="form_dob">जन्म मिति (Date of Birth)</label>');
  content = content.replace(/<label style="[^"]*">जन्म समय \(Time of Birth\)<\/label>/g, '<label style="color: var(--primary); font-weight: bold;" data-i18n="form_tob">जन्म समय (Time of Birth)</label>');
  content = content.replace(/<label style="[^"]*">जन्म स्थान \(Birth Place\)<\/label>/g, '<label style="color: var(--primary); font-weight: bold;" data-i18n="form_place">जन्म स्थान (Birth Place)</label>');
  content = content.replace(/<label style="[^"]*">ईमेल \(Email Address\)<\/label>/g, '<label style="color: var(--primary); font-weight: bold;" data-i18n="form_email">ईमेल (Email Address)</label>');
  content = content.replace(/<label style="[^"]*">सेवा छान्नुहोस् \(Select Service\)<\/label>/g, '<label style="color: var(--primary); font-weight: bold;" data-i18n="form_service">सेवा छान्नुहोस् (Select Service)</label>');
  content = content.replace(/<label style="[^"]*">सन्देश \(Message \/ Questions\)<\/label>/g, '<label style="color: var(--primary); font-weight: bold;" data-i18n="form_message">सन्देश (Message / Questions)</label>');
  content = content.replace(/>पठाउनुहोस् \(Send Details\)<\/button>/g, ' data-i18n="form_btn">पठाउनुहोस् (Send Details)</button>');
  
  content = content.replace(/<label style="[^"]*">Full Name<\/label>/g, '<label style="color: var(--primary); font-weight: bold;" data-i18n="form_name">Full Name</label>');
  content = content.replace(/<label style="[^"]*">Contact Number<\/label>/g, '<label style="color: var(--primary); font-weight: bold;" data-i18n="form_phone">Contact Number</label>');
  content = content.replace(/<label style="[^"]*">Date of Birth<\/label>/g, '<label style="color: var(--primary); font-weight: bold;" data-i18n="form_dob">Date of Birth</label>');
  content = content.replace(/<label style="[^"]*">Time of Birth<\/label>/g, '<label style="color: var(--primary); font-weight: bold;" data-i18n="form_tob">Time of Birth</label>');
  content = content.replace(/<label style="[^"]*">Birth Place .*<\/label>/g, '<label style="color: var(--primary); font-weight: bold;" data-i18n="form_place">Birth Place (City, Country)</label>');
  content = content.replace(/<label style="[^"]*">Specific Questions .*<\/label>/g, '<label style="color: var(--primary); font-weight: bold;" data-i18n="form_message">Specific Questions (Optional)</label>');
  content = content.replace(/<label style="[^"]*">Service Required<\/label>/g, '<label style="color: var(--primary); font-weight: bold;" data-i18n="form_service">Service Required</label>');
  content = content.replace(/>Submit Details<\/button>/g, ' data-i18n="form_btn">Submit Details</button>');


  content = content.replace(/<h2 style="[^"]*">Book Kundali Consultation<\/h2>/, '<h2 style="color: var(--primary);" data-i18n="kundali_title">Book Kundali Consultation</h2>');
  content = content.replace(/<p style="[^"]*">Please fill in your birth details accurately for proper analysis. We will get back to you shortly.<\/p>/, '<p style="margin-bottom: 2rem;" data-i18n="kundali_p">Please fill in your birth details accurately for proper analysis. We will get back to you shortly.</p>');

  writeFileSync(file, content);
}
console.log('Processed HTML files');
