import { jsPDF } from 'jspdf';
import { CompanyStats, QuoteLead } from '../types';

// Helper to draw the HUAN Surveillance shield logo directly onto the jsPDF canvas
function drawHuanShieldLogo(
  doc: jsPDF, 
  cx: number, 
  cy: number, 
  scale: number = 1, 
  shieldColor: [number, number, number] = [17, 70, 106],
  iconColor: [number, number, number] = [255, 255, 255]
) {
  doc.saveGraphicsState();
  
  // Draw Outer Shield
  doc.setFillColor(shieldColor[0], shieldColor[1], shieldColor[2]);
  
  // Shield coordinates around center (cx, cy)
  const topY = cy - 20 * scale;
  const leftX = cx - 16 * scale;
  const rightX = cx + 16 * scale;
  const shoulderY = cy - 12 * scale;
  const bottomY = cy + 24 * scale;
  
  doc.setDrawColor(shieldColor[0], shieldColor[1], shieldColor[2]);
  doc.setLineWidth(0.1);
  
  // Curvilinear shield
  doc.triangle(
    cx, topY,
    leftX, shoulderY,
    rightX, shoulderY,
    'FD'
  );
  doc.rect(leftX, shoulderY, 32 * scale, 18 * scale, 'FD');
  doc.triangle(
    leftX, shoulderY + 18 * scale,
    rightX, shoulderY + 18 * scale,
    cx, bottomY,
    'FD'
  );
  
  // Draw Inner White CCTV Camera Head and Visor
  doc.setDrawColor(iconColor[0], iconColor[1], iconColor[2]);
  doc.setLineWidth(1.6 * scale);
  
  // Upper Visor Hood Arch
  doc.roundedRect(cx - 8 * scale, cy - 8 * scale, 17 * scale, 9 * scale, 2.5 * scale, 2.5 * scale, 'S');
  
  // Main Camera Body Visor
  doc.roundedRect(cx - 9 * scale, cy - 4 * scale, 18 * scale, 10 * scale, 3 * scale, 3 * scale, 'S');
  
  // Hollow Lens Aperture Ring
  doc.circle(cx + 3 * scale, cy + 1 * scale, 3.2 * scale, 'S');
  
  // Cable & Conduit Bracket
  doc.line(cx - 10 * scale, cy + 11 * scale, cx - 4 * scale, cy + 11 * scale);
  doc.line(cx - 4 * scale, cy + 11 * scale, cx - 4 * scale, cy + 6 * scale);
  doc.line(cx - 1 * scale, cy + 7 * scale, cx + 1 * scale, cy + 13 * scale);
  
  // Dynamic lower slash
  doc.line(cx - 6 * scale, cy + 17 * scale, cx - 2 * scale, cy + 20 * scale);

  doc.restoreGraphicsState();
}

// Draw standard header for pages 2 to 10
function drawPageHeader(doc: jsPDF, pageWidth: number) {
  // Top right corner emblem and wordmark
  const rightX = pageWidth - 20;
  const topY = 16;
  
  // Small shield logo
  drawHuanShieldLogo(doc, rightX - 32, topY + 4, 0.35, [14, 58, 92], [255, 255, 255]);
  
  // Logo text
  doc.setTextColor(14, 58, 92);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('HUAN', rightX - 22, topY + 4);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(14, 58, 92);
  doc.text('SURVEILLANCE', rightX - 22, topY + 8);
}

// Draw standard footer for pages 2 to 10
function drawPageFooter(doc: jsPDF, pageWidth: number, pageHeight: number, pageNumber: number) {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(140, 150, 160);
  doc.text('HUAN Surveillance — Company Profile', 20, pageHeight - 12);
  doc.text(String(pageNumber), pageWidth - 24, pageHeight - 12);
}

export function createCompanyProfileDocument(stats?: CompanyStats): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const navy: [number, number, number] = [14, 58, 92]; // #0E3A5C
  const darkNavy: [number, number, number] = [8, 25, 38];
  const slateDark: [number, number, number] = [30, 41, 59];
  const slateMuted: [number, number, number] = [71, 85, 105];
  const cardBg: [number, number, number] = [248, 250, 252];
  const cardBorder: [number, number, number] = [226, 232, 240];

  // =========================================================================
  // PAGE 1: COVER PAGE
  // =========================================================================
  
  // Top half Navy Blue block (48% height)
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(0, 0, pageWidth, pageHeight * 0.44, 'F');

  // White Center Circle for Logo (diameter 60mm)
  const circleX = pageWidth / 2;
  const circleY = pageHeight * 0.22;
  doc.setFillColor(255, 255, 255);
  doc.circle(circleX, circleY, 32, 'F');

  // Inside Circle: HUAN Shield Logo + Text
  drawHuanShieldLogo(doc, circleX - 14, circleY - 1, 0.75, [14, 58, 92], [255, 255, 255]);
  
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('HUAN', circleX + 2, circleY - 1);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('SURVEILLANCE', circleX + 2, circleY + 5);

  // Lower Half: Company Name & Title
  const lowerStartY = pageHeight * 0.58;
  
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.text('HUAN SURVEILLANCE', pageWidth / 2, lowerStartY, { align: 'center' });

  // Navy Horizontal Line
  doc.setDrawColor(navy[0], navy[1], navy[2]);
  doc.setLineWidth(1.2);
  doc.line(pageWidth / 2 - 25, lowerStartY + 10, pageWidth / 2 + 25, lowerStartY + 10);

  // Corporate Company Profile Subtitle
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('C O R P O R A T E   C O M P A N Y   P R O F I L E', pageWidth / 2, lowerStartY + 22, { align: 'center' });

  // Slogan in Quotes
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(11);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text('"Protecting What Matters Most"', 22, lowerStartY + 38);

  // =========================================================================
  // PAGE 2: ABOUT HUAN SURVEILLANCE, VISION & MISSION
  // =========================================================================
  doc.addPage();
  drawPageHeader(doc, pageWidth);

  let y = 46;
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('ABOUT HUAN SURVEILLANCE', 20, y);

  y += 14;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  
  const aboutP1 = doc.splitTextToSize(
    'HUAN Surveillance is a Pakistan-based security and surveillance solutions provider specializing in the design, supply, installation, and maintenance of advanced security systems. With over three years of industry experience, we help businesses, institutions, industrial facilities, and residential clients enhance safety, monitor critical assets, and maintain operational security through reliable and modern surveillance technologies.',
    pageWidth - 40
  );
  doc.text(aboutP1, 20, y);
  y += aboutP1.length * 5.2 + 6;

  const aboutP2 = doc.splitTextToSize(
    'Our commitment is to deliver practical, scalable, and cost-effective security solutions tailored to the unique requirements of every client. From small businesses to large-scale industrial environments, we focus on quality workmanship, technical expertise, and long-term customer support. Today, HUAN Surveillance proudly serves clients across Pakistan, providing dependable security infrastructure that helps organizations protect what matters most.',
    pageWidth - 40
  );
  doc.text(aboutP2, 20, y);
  y += aboutP2.length * 5.2 + 16;

  // Side-by-side Vision and Mission cards
  const cardWidth = (pageWidth - 48) / 2;
  const cardHeight = 70;
  
  // Vision Card
  doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
  doc.setDrawColor(cardBorder[0], cardBorder[1], cardBorder[2]);
  doc.roundedRect(20, y, cardWidth, cardHeight, 2, 2, 'FD');
  
  // Top accent bar
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(20, y, cardWidth, 2.5, 'F');

  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Our Vision', 26, y + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  const visionText = doc.splitTextToSize(
    "To become one of Pakistan's most trusted and innovative security solutions providers by delivering advanced surveillance technologies, exceptional service quality, and long-term value to our clients.",
    cardWidth - 12
  );
  doc.text(visionText, 26, y + 24);

  // Mission Card
  const missionX = 20 + cardWidth + 8;
  doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
  doc.setDrawColor(cardBorder[0], cardBorder[1], cardBorder[2]);
  doc.roundedRect(missionX, y, cardWidth, cardHeight, 2, 2, 'FD');
  
  // Top accent bar
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(missionX, y, cardWidth, 2.5, 'F');

  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('Our Mission', missionX + 6, y + 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  const missionText = doc.splitTextToSize(
    'Our mission is to provide reliable, efficient, and technologically advanced security solutions that help businesses, institutions, and communities safeguard their people, assets, and operations. We strive to build lasting relationships through professionalism and integrity.',
    cardWidth - 12
  );
  doc.text(missionText, missionX + 6, y + 24);

  drawPageFooter(doc, pageWidth, pageHeight, 2);

  // =========================================================================
  // PAGE 3: OUR CORE VALUES
  // =========================================================================
  doc.addPage();
  drawPageHeader(doc, pageWidth);

  y = 46;
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('OUR CORE VALUES', 20, y);

  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text(
    'At HUAN Surveillance, our core values guide our business operations, engineering principles, and client interactions across the country.',
    20, 
    y,
    { maxWidth: pageWidth - 40 }
  );

  y += 16;
  const values = [
    {
      title: 'Integrity',
      desc: 'We conduct our business with honesty, transparency, and strict professionalism in every engagement.'
    },
    {
      title: 'Reliability',
      desc: 'We deliver dependable security solutions that our clients can trust to operate flawlessly when it matters most.'
    },
    {
      title: 'Quality',
      desc: 'We maintain high standards in every project, from the initial site consultation to professional installation and technical support.'
    },
    {
      title: 'Customer Commitment',
      desc: "Our clients' security needs remain at the absolute center of everything we do, ensuring customized, exact deployments."
    },
    {
      title: 'Innovation',
      desc: 'We continuously adopt modern, future-ready technologies to provide the most effective security systems available in the industry.'
    }
  ];

  values.forEach((val) => {
    // Value Box
    doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
    doc.setDrawColor(cardBorder[0], cardBorder[1], cardBorder[2]);
    doc.roundedRect(20, y, pageWidth - 40, 24, 2, 2, 'FD');

    // Left thick accent line
    doc.setFillColor(navy[0], navy[1], navy[2]);
    doc.rect(20, y, 3, 24, 'F');

    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(val.title, 28, y + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    doc.text(val.desc, 28, y + 16, { maxWidth: pageWidth - 54 });

    y += 30;
  });

  drawPageFooter(doc, pageWidth, pageHeight, 3);

  // =========================================================================
  // PAGE 4: OUR SERVICES (PART 1)
  // =========================================================================
  doc.addPage();
  drawPageHeader(doc, pageWidth);

  y = 46;
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('OUR SERVICES', 20, y);

  y += 10;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text(
    'We provide complete security, surveillance, networking, communication, and infrastructure solutions — from system design and equipment supply to professional installation, configuration, integration, testing, and maintenance.',
    20, 
    y,
    { maxWidth: pageWidth - 40 }
  );

  y += 16;
  const servicesP1 = [
    {
      title: 'CCTV & Smart Surveillance',
      desc: 'HD CCTV, IP Camera Systems, NVR/DVR, high-resolution and modern smart cameras with AI-based human & vehicle detection, motion detection, intrusion detection, line-crossing and advanced video analytics, remote monitoring and centralized video management.'
    },
    {
      title: 'Long-Range & Fiber CCTV Solutions',
      desc: 'Fiber-based surveillance infrastructure for factories, warehouses, ports, farms, estates, campuses and long perimeters. Single-mode/multi-mode fiber, media converters, splicing, testing and redundant fiber paths for reliable long-distance camera connectivity.'
    },
    {
      title: 'Control Rooms & Command Centers',
      desc: 'Complete CCTV control room and command center solutions including VMS, monitoring workstations, large displays, multi-monitor setups, video walls, centralized monitoring, network redundancy and 24/7 surveillance infrastructure.'
    },
    {
      title: 'Access Control & Biometric Systems',
      desc: 'RFID/card access, fingerprint and facial-recognition systems, biometric attendance, smart door controllers, electromagnetic locks, exit buttons and centralized access management.'
    },
    {
      title: 'Door Phone & Intercom Systems',
      desc: 'Audio, Video & IP Intercom solutions, video door phones, indoor monitors, outdoor panels, master stations and multi-point communication systems for residential, commercial and industrial facilities.'
    }
  ];

  servicesP1.forEach((svc) => {
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text(svc.title, 20, y);

    y += 4.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    const lines = doc.splitTextToSize(svc.desc, pageWidth - 40);
    doc.text(lines, 20, y);

    y += lines.length * 4 + 7;
  });

  drawPageFooter(doc, pageWidth, pageHeight, 4);

  // =========================================================================
  // PAGE 5: OUR SERVICES (CONTINUED - PART 2)
  // =========================================================================
  doc.addPage();
  drawPageHeader(doc, pageWidth);

  y = 46;
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('OUR SERVICES (CONTINUED)', 20, y);

  y += 14;
  const servicesP2 = [
    {
      title: 'Network & Structured Cabling',
      desc: 'Complete Cat6/Cat6A and structured cabling infrastructure for CCTV, computers, servers and communication systems, including patch panels, PoE/managed switches, cable management, testing and organized rack cabling.'
    },
    {
      title: 'Server Room & Rack Infrastructure',
      desc: 'Professional server room and network rack setup including server racks, wall-mount racks, patch panels, switches, PDU, UPS integration, fiber distribution, cable management and equipment organization.'
    },
    {
      title: 'Fiber Optic Networking',
      desc: 'Fiber backbone design, installation, termination, splicing, testing and distribution for high-bandwidth building, campus and multi-site networks.'
    },
    {
      title: 'PABX & IP-PBX Telephone Systems',
      desc: 'Business telephone infrastructure including PABX/IP-PBX, IP phones, extensions, internal calling, reception systems and centralized telephone management.'
    },
    {
      title: 'Network & Wireless Infrastructure',
      desc: 'Routers, managed/PoE switches, enterprise Wi-Fi, network infrastructure and connectivity solutions designed to support security and business operations.'
    },
    {
      title: 'Security System Integration & Maintenance',
      desc: 'Integration of CCTV, access control, biometric, intercom, networking, servers and communication systems, supported by preventive maintenance, troubleshooting, upgrades and technical support.'
    }
  ];

  servicesP2.forEach((svc) => {
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.2);
    doc.text(svc.title, 20, y);

    y += 4.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    const lines = doc.splitTextToSize(svc.desc, pageWidth - 40);
    doc.text(lines, 20, y);

    y += lines.length * 3.8 + 6.5;
  });

  drawPageFooter(doc, pageWidth, pageHeight, 5);

  // =========================================================================
  // PAGE 6: KEEP TRACK OF SECTORS
  // =========================================================================
  doc.addPage();
  drawPageHeader(doc, pageWidth);

  y = 46;
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('KEEP TRACK OF SECTORS', 20, y);

  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text(
    'HUAN Surveillance engineers reliable security configurations across a versatile client landscape throughout Pakistan. Our architectures adapt perfectly to sector-specific operational rules.',
    20, 
    y,
    { maxWidth: pageWidth - 40 }
  );

  y += 18;
  // Custom-Tailored Implementations Card
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Custom-Tailored Implementations', 20, y);

  y += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  const customLines = doc.splitTextToSize(
    'We recognize that an industrial manufacturing plant requires an entirely different perimeter defense architecture compared to a commercial corporate office or an educational campus. Our systems are engineered specifically to map to your daily operational flows without causing systemic friction or security blindspots.',
    pageWidth - 40
  );
  doc.text(customLines, 20, y);

  y += customLines.length * 4.8 + 18;

  // 12 Sectors in 2 Columns with Navy Bullet Squares
  const sectorsCol1 = [
    'Educational Institutions',
    'Industrial Facilities',
    'Manufacturing Plants',
    'Corporate Offices',
    'Commercial Buildings',
    'Retail Stores & Malls'
  ];

  const sectorsCol2 = [
    'Warehouses & Logistics Centers',
    'Healthcare Facilities',
    'Residential Communities',
    'Government Organizations',
    'Semi-Government Environments',
    'Logistics & Distribution Hubs'
  ];

  const col1X = 20;
  const col2X = 20 + (pageWidth - 40) / 2;

  sectorsCol1.forEach((sec, idx) => {
    const rowY = y + idx * 12;
    
    // Column 1
    doc.setFillColor(navy[0], navy[1], navy[2]);
    doc.rect(col1X, rowY - 3, 3, 3, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
    doc.text(sec, col1X + 6, rowY);

    // Column 2
    if (sectorsCol2[idx]) {
      doc.setFillColor(navy[0], navy[1], navy[2]);
      doc.rect(col2X, rowY - 3, 3, 3, 'F');
      doc.text(sectorsCol2[idx], col2X + 6, rowY);
    }
  });

  drawPageFooter(doc, pageWidth, pageHeight, 6);

  // =========================================================================
  // PAGE 7: OUR WORK PROCESS
  // =========================================================================
  doc.addPage();
  drawPageHeader(doc, pageWidth);

  y = 46;
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('OUR WORK PROCESS', 20, y);

  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text(
    'To ensure complete quality alignment and structural reliability, we execute every deployment according to a standardized 6-step engineering methodology.',
    20, 
    y,
    { maxWidth: pageWidth - 40 }
  );

  y += 18;
  const steps = [
    {
      num: 1,
      title: 'Requirement Assessment',
      desc: "Comprehensive structural analysis of the client's explicit security requirements, baseline operational hazards, and long-term strategic safety objectives."
    },
    {
      num: 2,
      title: 'Site Survey',
      desc: 'Conducting microscopic on-site layout inspections, signal testing, wireless line-of-sight analysis, and critical technical evaluations.'
    },
    {
      num: 3,
      title: 'Solution Design',
      desc: 'Developing comprehensive blueprint layouts, bandwidth allocation mappings, network schematics, and customized system architectures.'
    },
    {
      num: 4,
      title: 'Installation & Deployment',
      desc: 'Professional, clean physical deployment, structured low-voltage cabling, equipment anchoring, and system configuration by senior technicians.'
    },
    {
      num: 5,
      title: 'Testing & Commissioning',
      desc: 'Rigorous multi-point testing, failover analysis, camera angle tuning, dark-environment calibration, and comprehensive system optimization.'
    },
    {
      num: 6,
      title: 'Ongoing Support',
      desc: 'Providing structured routine maintenance, emergency on-site troubleshooting, software firmware upgrades, and immediate technical assistance.'
    }
  ];

  steps.forEach((st) => {
    // Number box
    doc.setFillColor(navy[0], navy[1], navy[2]);
    doc.rect(20, y - 2, 8, 14, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(String(st.num), 23, y + 6);

    // Title
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text(st.title, 34, y + 2);

    // Desc
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    const lines = doc.splitTextToSize(st.desc, pageWidth - 54);
    doc.text(lines, 34, y + 8);

    y += lines.length * 4.2 + 14;
  });

  drawPageFooter(doc, pageWidth, pageHeight, 7);

  // =========================================================================
  // PAGE 8: WHY CHOOSE HUAN SURVEILLANCE
  // =========================================================================
  doc.addPage();
  drawPageHeader(doc, pageWidth);

  y = 46;
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('WHY CHOOSE HUAN SURVEILLANCE', 20, y);

  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text(
    'With years of active commercial experience and a track record of high-profile deployments, we provide uncompromised technical proficiency.',
    20, 
    y,
    { maxWidth: pageWidth - 40 }
  );

  y += 16;
  // Side by side Big Stat Hero Blocks
  const heroCardWidth = (pageWidth - 48) / 2;
  const heroCardHeight = 44;

  // Stat Card 1: 3+ Years
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.roundedRect(20, y, heroCardWidth, heroCardHeight, 2, 2, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text('3+', 20 + heroCardWidth / 2, y + 18, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('YEARS OF INDUSTRY EXPERIENCE', 20 + heroCardWidth / 2, y + 30, { align: 'center' });

  // Stat Card 2: 90+ Completed Projects
  const heroCard2X = 20 + heroCardWidth + 8;
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.roundedRect(heroCard2X, y, heroCardWidth, heroCardHeight, 2, 2, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text('90+', heroCard2X + heroCardWidth / 2, y + 18, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('SUCCESSFULLY COMPLETED', heroCard2X + heroCardWidth / 2, y + 28, { align: 'center' });
  doc.text('PROJECTS', heroCard2X + heroCardWidth / 2, y + 34, { align: 'center' });

  y += heroCardHeight + 16;

  // 6 Bullet Points
  const reasons = [
    {
      title: 'Nationwide Service Coverage:',
      desc: 'Capability to execute unified multi-city enterprise deployments all across Pakistan.'
    },
    {
      title: 'Customized Security Solutions:',
      desc: 'Zero off-the-shelf generalized packages; every blueprint is made to measure.'
    },
    {
      title: 'Professional Installation Standards:',
      desc: 'Rigid compliance with structural neatness, weatherproofing, and safety codes.'
    },
    {
      title: 'Reliable Technical Support:',
      desc: 'Fast-response SLAs designed to keep your surveillance infrastructure live 24/7.'
    },
    {
      title: 'Cost-Effective Implementations:',
      desc: 'High-tier hardware optimization providing maximal protection for your capital allocation.'
    },
    {
      title: 'Proven Cross-Sector Domain Expertise:',
      desc: 'Verified experience serving complex educational campuses, continuous factories, and corporate headquarters.'
    }
  ];

  reasons.forEach((r) => {
    // Bullet square
    doc.setFillColor(navy[0], navy[1], navy[2]);
    doc.rect(20, y, 3, 3, 'F');

    // Title and Desc
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
    doc.text(r.title, 26, y + 3);

    const titleWidth = doc.getTextWidth(r.title) + 2;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    
    const lines = doc.splitTextToSize(r.desc, pageWidth - 26 - titleWidth - 20);
    if (lines.length === 1) {
      doc.text(lines[0], 26 + titleWidth, y + 3);
      y += 12;
    } else {
      const fullLines = doc.splitTextToSize(r.desc, pageWidth - 46);
      doc.text(fullLines, 26, y + 8);
      y += fullLines.length * 4.5 + 8;
    }
  });

  drawPageFooter(doc, pageWidth, pageHeight, 8);

  // =========================================================================
  // PAGE 9: NOTABLE EXPERIENCE & HEALTH, SAFETY & QUALITY COMMITMENT
  // =========================================================================
  doc.addPage();
  drawPageHeader(doc, pageWidth);

  y = 46;
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('NOTABLE EXPERIENCE', 20, y);

  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text(
    'HUAN Surveillance has successfully delivered high-tier structural protection configurations for critical defense, industrial, and institutional environments.',
    20, 
    y,
    { maxWidth: pageWidth - 40 }
  );

  y += 16;
  // Selected Client Feature Box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('Selected Client Feature:', 20, y);

  y += 6;
  doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
  doc.setDrawColor(180, 205, 230);
  doc.roundedRect(20, y, pageWidth - 40, 36, 2, 2, 'FD');

  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('CMES (Pakistan Navy)', 26, y + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  const cmesLines = doc.splitTextToSize(
    'Our successful delivery of professional security configurations within highly sensitive defense zones demonstrates our elite engineering capabilities, security compliance, and organizational trustworthiness.',
    pageWidth - 52
  );
  doc.text(cmesLines, 26, y + 18);

  y += 50;

  // HEALTH, SAFETY & QUALITY COMMITMENT
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('HEALTH, SAFETY & QUALITY COMMITMENT', 20, y);

  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  const safetyP1 = doc.splitTextToSize(
    'We prioritize zero-harm safety policies, technical quality compliance, and rigorous engineering standards throughout every phase of a project lifecycle.',
    pageWidth - 40
  );
  doc.text(safetyP1, 20, y);

  y += safetyP1.length * 5 + 8;
  const safetyP2 = doc.splitTextToSize(
    "Our site deployments rigorously adhere to international structural and low-voltage standards. This disciplined layout methodology ensures that all data pipelines and power loops are safe, fully shielded, properly insulated, and optimized for long-term structural durability. We work diligently to avoid any disruption to your company's active working environment during deployment.",
    pageWidth - 40
  );
  doc.text(safetyP2, 20, y);

  drawPageFooter(doc, pageWidth, pageHeight, 9);

  // =========================================================================
  // PAGE 10: GET IN TOUCH
  // =========================================================================
  doc.addPage();
  drawPageHeader(doc, pageWidth);

  y = 46;
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('GET IN TOUCH', 20, y);

  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text(
    'Contact our engineering and consultation desk today to schedule a comprehensive structural risk assessment or a detailed technical site survey.',
    20, 
    y,
    { maxWidth: pageWidth - 40 }
  );

  y += 16;
  // Full Details Container
  const contactBoxWidth = pageWidth - 40;
  const contactBoxHeight = 110;
  
  doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
  doc.setDrawColor(cardBorder[0], cardBorder[1], cardBorder[2]);
  doc.roundedRect(20, y, contactBoxWidth, contactBoxHeight, 3, 3, 'FD');

  // Left Column Details
  let cY = y + 14;
  const contactItems = [
    { label: 'COMPANY NAME', val: 'HUAN Surveillance' },
    { label: 'PHONE / WHATSAPP', val: '+92 344 3733996' },
    { label: 'EMAIL ADDRESS', val: 'info@huan-surveillance.com' },
    { label: 'OFFICIAL WEBSITE', val: 'www.huan-surveillance.com' },
    { label: 'CORE COVERAGE AREA', val: 'Karachi & All Over Pakistan' }
  ];

  contactItems.forEach((item) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.text(item.label, 28, cY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
    doc.text(item.val, 28, cY + 5.5);

    cY += 16;
  });

  // Right Column: WhatsApp QR Graphic Box
  const qrX = 20 + contactBoxWidth - 62;
  const qrY = y + 14;
  
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(cardBorder[0], cardBorder[1], cardBorder[2]);
  doc.roundedRect(qrX, qrY, 52, 76, 2, 2, 'FD');

  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('HUAN Surveillance', qrX + 26, qrY + 8, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text('WhatsApp business account', qrX + 26, qrY + 13, { align: 'center' });

  // Draw simulated QR Pattern
  doc.setFillColor(navy[0], navy[1], navy[2]);
  // Outer frame
  doc.rect(qrX + 6, qrY + 18, 40, 40, 'S');
  // QR Corner Squares
  doc.rect(qrX + 8, qrY + 20, 10, 10, 'F');
  doc.rect(qrX + 34, qrY + 20, 10, 10, 'F');
  doc.rect(qrX + 8, qrY + 46, 10, 10, 'F');
  
  // Inner patterns
  doc.rect(qrX + 22, qrY + 21, 6, 6, 'F');
  doc.rect(qrX + 20, qrY + 48, 12, 4, 'F');
  doc.rect(qrX + 34, qrY + 46, 10, 10, 'F');
  
  // Center WhatsApp Badge
  doc.setFillColor(255, 255, 255);
  doc.circle(qrX + 26, qrY + 38, 7.5, 'F');
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.setDrawColor(navy[0], navy[1], navy[2]);
  doc.setLineWidth(0.8);
  doc.circle(qrX + 26, qrY + 38, 5.5, 'S');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('+', qrX + 27.5, qrY + 36);

  // Centered Motto & Bottom Tagline
  y += contactBoxHeight + 24;
  doc.setFont('helvetica', 'bolditalic');
  doc.setFontSize(12);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('"Protecting What Matters Most"', pageWidth / 2, y, { align: 'center' });

  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text('HUAN Surveillance — Corporate Head Office / Service Desks Pakistan', pageWidth / 2, y, { align: 'center' });
  doc.text('© 2026 HUAN Surveillance. All Rights Reserved.', pageWidth / 2, y + 5, { align: 'center' });

  drawPageFooter(doc, pageWidth, pageHeight, 10);
  return doc;
}

export function generateCompanyProfilePDF(stats?: CompanyStats) {
  const doc = createCompanyProfileDocument(stats);
  doc.save('HUAN-Surveillance-Corporate-Company-Profile.pdf');
}

/**
 * Downloads the official static company profile PDF from /public/company-profile.pdf
 * with a fallback to generateCompanyProfilePDF if direct download encounters an issue.
 */
export function downloadCompanyProfileFile(stats?: CompanyStats) {
  try {
    const link = document.createElement('a');
    link.href = '/company-profile.pdf';
    link.download = 'HUAN-Surveillance-Company-Profile.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.warn('Direct PDF download failed, falling back to dynamic generation:', err);
    generateCompanyProfilePDF(stats);
  }
}

/**
 * Sanitizes text to standard ASCII to prevent jsPDF crashes with currency symbols or special characters.
 */
export function cleanPdfText(text: string | null | undefined): string {
  if (!text) return '';
  return String(text)
    .replace(/[₨₹$€£]/g, 'PKR ')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u2022\u25AA\u25CF]/g, '-')
    .replace(/[\u2026]/g, '...')
    .replace(/[^\x00-\x7F]/g, ' ')
    .trim();
}

/**
 * Comprehensive Multi-Page Proposal & Quotation PDF Generator
 * Dynamically tracks Y-position and inserts pages automatically with running headers/footers.
 */
export function generateQuotePDF(lead: QuoteLead, stats?: CompanyStats) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const navy: [number, number, number] = [14, 58, 92]; // #0E3A5C
  const darkNavy: [number, number, number] = [8, 25, 38];
  const amber: [number, number, number] = [230, 81, 0]; // #E65100
  const slateDark: [number, number, number] = [30, 41, 59];
  const slateMuted: [number, number, number] = [71, 85, 105];
  const cardBg: [number, number, number] = [248, 250, 252];
  const cardBorder: [number, number, number] = [226, 232, 240];

  const topMargin = 20;
  const bottomMargin = 22;
  const leftMargin = 16;
  const rightMargin = 16;
  const contentWidth = pageWidth - leftMargin - rightMargin;

  // Helper to draw running page header on subsequent pages
  const drawSubsequentPageHeader = () => {
    doc.setFillColor(navy[0], navy[1], navy[2]);
    doc.rect(0, 0, pageWidth, 18, 'F');
    drawHuanShieldLogo(doc, 14, 9, 0.4, [255, 255, 255], [14, 58, 92]);
    
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('HUAN SURVEILLANCE', 24, 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(200, 225, 245);
    doc.text(`Official Quotation Ref: ${cleanPdfText(lead.id)}`, pageWidth - rightMargin, 11, { align: 'right' });
  };

  // Helper to check Y-space and create a new page dynamically
  let currentY = 0;
  const checkPageBreak = (neededHeight: number): boolean => {
    if (currentY + neededHeight > pageHeight - bottomMargin) {
      doc.addPage();
      drawSubsequentPageHeader();
      currentY = 28;
      return true;
    }
    return false;
  };

  // ==========================================
  // PAGE 1: PRIMARY HEADER & CLIENT SUMMARY
  // ==========================================
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.rect(0, 0, pageWidth, 44, 'F');

  drawHuanShieldLogo(doc, 18, 22, 0.65, [255, 255, 255], [14, 58, 92]);

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('HUAN SURVEILLANCE', 36, 19);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 225, 245);
  doc.text('COMMERCIAL SECURITY ENGINEERING & PROPOSAL DOSSIER', 36, 26);
  doc.text('Helpline / WhatsApp: +92 344 3733996 | Email: info@huan-surveillance.com', 36, 32);
  doc.text('NTN Registered FBR Corporate Vendor | Karachi, Pakistan', 36, 37);

  currentY = 52;

  // Metadata Card (Reference, Date, Client info)
  const metaHeight = 36;
  doc.setFillColor(cardBg[0], cardBg[1], cardBg[2]);
  doc.setDrawColor(cardBorder[0], cardBorder[1], cardBorder[2]);
  doc.roundedRect(leftMargin, currentY, contentWidth, metaHeight, 2, 2, 'FD');

  doc.setFillColor(amber[0], amber[1], amber[2]);
  doc.rect(leftMargin, currentY, 3, metaHeight, 'F');

  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text(`PROPOSAL REFERENCE: ${cleanPdfText(lead.id)}`, leftMargin + 8, currentY + 8);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text(`Date Issued: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`, leftMargin + 8, currentY + 14);

  // Left Column
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(`Client Name: ${cleanPdfText(lead.customerName)}`, leftMargin + 8, currentY + 22);
  doc.text(`Contact: ${cleanPdfText(lead.phone)} | ${cleanPdfText(lead.email)}`, leftMargin + 8, currentY + 28);
  doc.text(`Location: ${cleanPdfText(lead.city || 'Karachi, Pakistan')}`, leftMargin + 8, currentY + 33);

  // Right Column
  const rightColX = leftMargin + (contentWidth / 2) + 4;
  doc.text(`Property Type: ${cleanPdfText(lead.propertyType)}`, rightColX, currentY + 22);
  doc.text(`Estimated Scale: ${cleanPdfText(lead.cameraCountOrScale || lead.estimatedAreaOrPoints || 'Site Scale Custom')}`, rightColX, currentY + 28);
  doc.text(`Deployment Timeline: ${cleanPdfText(lead.timeline || 'Immediate')}`, rightColX, currentY + 33);

  currentY += metaHeight + 10;

  // ==========================================
  // SECTION 1: ARCHITECTURAL SUMMARY & SCOPE
  // ==========================================
  checkPageBreak(30);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('1. EXECUTIVE ARCHITECTURAL SUMMARY & SCOPE', leftMargin, currentY);

  currentY += 6;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);

  const summaryText = cleanPdfText(
    lead.aiRecommendation?.summary || 
    `Turnkey security and surveillance infrastructure engineered by HUAN Surveillance. Includes precision hardware deployment, dedicated structured cabling, power backup, command center video integration, and on-site testing.`
  );
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(summaryLines, leftMargin, currentY);
  currentY += summaryLines.length * 4.6 + 6;

  // Additional Client Notes if any
  if (lead.additionalNotes) {
    checkPageBreak(25);
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    const notesText = cleanPdfText(lead.additionalNotes);
    const notesLines = doc.splitTextToSize(`Project Scope / Client Site Notes: ${notesText}`, contentWidth - 12);
    const boxH = notesLines.length * 4.2 + 8;
    
    checkPageBreak(boxH + 4);
    doc.roundedRect(leftMargin, currentY, contentWidth, boxH, 1.5, 1.5, 'FD');
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    doc.text(notesLines, leftMargin + 6, currentY + 5.5);
    currentY += boxH + 6;
  }

  // ==========================================
  // SECTION 2: EQUIPMENT BILL OF QUANTITIES (BOQ)
  // ==========================================
  checkPageBreak(35);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('2. RECOMMENDED EQUIPMENT BILL OF QUANTITIES (BOQ)', leftMargin, currentY);
  currentY += 6;

  const hardwareList = lead.aiRecommendation?.suggestedHardware || [];
  if (hardwareList.length > 0) {
    hardwareList.forEach((hw, idx) => {
      const hwText = cleanPdfText(hw);
      const lines = doc.splitTextToSize(`${idx + 1}.  ${hwText}`, contentWidth - 8);
      const rowHeight = lines.length * 4.4 + 3;
      checkPageBreak(rowHeight);

      doc.setFillColor(idx % 2 === 0 ? 250 : 255, idx % 2 === 0 ? 250 : 255, idx % 2 === 0 ? 252 : 255);
      doc.rect(leftMargin, currentY - 3, contentWidth, rowHeight, 'F');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
      doc.text(lines, leftMargin + 3, currentY);
      currentY += rowHeight;
    });
    currentY += 4;
  }

  // ==========================================
  // SECTION 3: CART SELECTED ITEMS (IF ANY)
  // ==========================================
  if (lead.cartItemsSummary && lead.cartItemsSummary.length > 0) {
    checkPageBreak(40);
    doc.setTextColor(navy[0], navy[1], navy[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('3. SELECTED CATALOG PRODUCTS & SPECIFICATIONS', leftMargin, currentY);
    currentY += 6;

    // Table Header
    doc.setFillColor(navy[0], navy[1], navy[2]);
    doc.rect(leftMargin, currentY, contentWidth, 7, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('ITEM DESCRIPTION', leftMargin + 4, currentY + 4.8);
    doc.text('QTY', pageWidth - rightMargin - 48, currentY + 4.8, { align: 'center' });
    doc.text('AMOUNT (PKR)', pageWidth - rightMargin - 6, currentY + 4.8, { align: 'right' });
    currentY += 7;

    lead.cartItemsSummary.forEach((item, i) => {
      const itemName = cleanPdfText(item.name);
      const lines = doc.splitTextToSize(itemName, contentWidth - 65);
      const rowH = Math.max(7, lines.length * 4.2 + 3);
      checkPageBreak(rowH);

      doc.setFillColor(i % 2 === 0 ? 248 : 255, i % 2 === 0 ? 250 : 255, i % 2 === 0 ? 252 : 255);
      doc.rect(leftMargin, currentY, contentWidth, rowH, 'F');
      doc.setDrawColor(235, 240, 245);
      doc.line(leftMargin, currentY + rowH, pageWidth - rightMargin, currentY + rowH);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
      doc.text(lines, leftMargin + 4, currentY + 4.5);

      doc.setFont('helvetica', 'bold');
      doc.text(String(item.quantity || 1), pageWidth - rightMargin - 48, currentY + 4.5, { align: 'center' });

      const priceVal = Number(item.price);
      const priceStr = (!priceVal || priceVal <= 0) ? 'Quote Required' : `PKR ${priceVal.toLocaleString('en-PK')}`;
      doc.text(cleanPdfText(priceStr), pageWidth - rightMargin - 6, currentY + 4.5, { align: 'right' });

      currentY += rowH;
    });
    currentY += 6;
  }

  // ==========================================
  // SECTION 4: INFRASTRUCTURE & TECHNICAL PLAN
  // ==========================================
  checkPageBreak(40);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('4. INFRASTRUCTURE, CABLING & STORAGE PLAN', leftMargin, currentY);
  currentY += 6;

  const planText = cleanPdfText(
    lead.aiRecommendation?.infrastructurePlan || 
    'Pure Copper 23AWG Cat6 / Singlemode 4-Core Optical Fiber backbone. Complete PVC conduits, rack termination, labeling, and centralized uninterruptible power distribution.'
  );
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  const planLines = doc.splitTextToSize(planText, contentWidth);
  doc.text(planLines, leftMargin, currentY);
  currentY += planLines.length * 4.5 + 4;

  // Commercial Estimate Highlight Box
  checkPageBreak(28);
  doc.setFillColor(navy[0], navy[1], navy[2]);
  doc.roundedRect(leftMargin, currentY, contentWidth, 20, 2, 2, 'F');

  doc.setTextColor(200, 225, 245);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('COMMERCIAL BUDGET ESTIMATE / PRICE RANGE', leftMargin + 8, currentY + 7);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  const priceDisplay = cleanPdfText(lead.aiRecommendation?.estimatedPriceRangePKR || 'Custom Commercial Quote');
  doc.text(priceDisplay, leftMargin + 8, currentY + 15);

  doc.setFontSize(7.5);
  doc.setTextColor(255, 190, 140);
  doc.text('Karachi Site Survey: FREE OF CHARGE | Formal GST Invoice Issued Upon Order', pageWidth - rightMargin - 8, currentY + 15, { align: 'right' });
  currentY += 26;

  // ==========================================
  // SECTION 5: COMMERCIAL TERMS, SLA & WARRANTY
  // ==========================================
  checkPageBreak(48);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('5. COMMERCIAL TERMS & SLA GUARANTEES', leftMargin, currentY);
  currentY += 6;

  const terms = [
    'Karachi SLA Resolution Guarantee: 24 to 36 hours on-site physical response and fault resolution guaranteed.',
    'Warranty Assurance: 2-Year Official Manufacturer Hardware Warranty with direct replacement coverage.',
    'Cabling Certification: 100% Pure Copper Solid Core / Optical Fiber certified to Fluke standards.',
    'Validity: This commercial proposal is valid for 30 calendar days from the date of issuance.',
    'Payment Terms: 70% mobilization advance upon order confirmation, 30% upon final sign-off and testing handover.'
  ];

  terms.forEach((t) => {
    const tLines = doc.splitTextToSize(`-  ${cleanPdfText(t)}`, contentWidth - 4);
    checkPageBreak(tLines.length * 4 + 2);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
    doc.text(tLines, leftMargin + 2, currentY);
    currentY += tLines.length * 4 + 2;
  });
  currentY += 6;

  // ==========================================
  // SECTION 6: AUTHORIZATION & STAMP BLOCK
  // ==========================================
  checkPageBreak(38);
  doc.setDrawColor(cardBorder[0], cardBorder[1], cardBorder[2]);
  doc.line(leftMargin, currentY, pageWidth - rightMargin, currentY);
  currentY += 8;

  const sigColWidth = (contentWidth - 20) / 2;
  
  // Left: HUAN Authorization
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('FOR HUAN SURVEILLANCE:', leftMargin, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text('Engineering & Solutions Lead', leftMargin, currentY + 5);
  doc.text('Verified Technical Proposal', leftMargin, currentY + 9);
  doc.setDrawColor(navy[0], navy[1], navy[2]);
  doc.line(leftMargin, currentY + 22, leftMargin + sigColWidth, currentY + 22);
  doc.text('Authorized Technical Signature & Seal', leftMargin, currentY + 26);

  // Right: Client Acceptance
  const clientSigX = leftMargin + sigColWidth + 20;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(navy[0], navy[1], navy[2]);
  doc.text('CLIENT ACCEPTANCE / CONFIRMATION:', clientSigX, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.text(`Client Representative: ${cleanPdfText(lead.customerName)}`, clientSigX, currentY + 5);
  doc.text('Signature & Official Company Stamp', clientSigX, currentY + 9);
  doc.setDrawColor(slateMuted[0], slateMuted[1], slateMuted[2]);
  doc.line(clientSigX, currentY + 22, clientSigX + sigColWidth, currentY + 22);
  doc.text('Date of Acceptance & Handover', clientSigX, currentY + 26);

  // ==========================================
  // RUNNING FOOTERS ACROSS ALL PAGES
  // ==========================================
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFillColor(darkNavy[0], darkNavy[1], darkNavy[2]);
    doc.rect(0, pageHeight - 14, pageWidth, 14, 'F');

    doc.setTextColor(200, 210, 220);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text(
      'HUAN Surveillance | "Protecting What Matters Most" | Ph: +92 344 3733996 | Karachi, Pakistan',
      leftMargin,
      pageHeight - 5.5
    );
    doc.text(
      `Page ${p} of ${totalPages}`,
      pageWidth - rightMargin,
      pageHeight - 5.5,
      { align: 'right' }
    );
  }

  // Save the proposal PDF
  const safeFilename = `HUAN-Quote-${cleanPdfText(lead.id).replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
  doc.save(safeFilename);
}
