import { BlogPost, CompanyStats, Product, QuoteLead, Review } from '../types';

export const INITIAL_COMPANY_STATS: CompanyStats = {
  yearsInBusiness: 3,
  sitesCompleted: 90,
  sectorsServed: 12,
  karachiResolutionHours: "24–36",
  uptimeSLA: "99.8%",
  activeClients: 120,
  ntnNumber: "8392014-7 (Registered FBR Entity)",
  fbrStatus: "Active Taxpayer (Verified Active)",
  salesTaxNumber: "STRN-3277876123456",
  companyAddress: "Corporate Head Office & Service Desks, Karachi, Pakistan",
  primaryPhone: "+92 344 3733996",
  secondaryPhone: "+92 344 3733996",
  whatsappNumber: "923443733996",
  email: "infa@huan-surveillance.com",
  salesEmail: "infa@huan-surveillance.com",
  website: "www.huan-surveillance.com",
  slogan: "Protecting What Matters Most",
  coverageArea: "Karachi & All Over Pakistan",
  notableClient: "CMES (Pakistan Navy)"
};

export const INITIAL_PRODUCTS: Product[] = [
  // Packages / Bundles
  {
    id: 'pkg-home-4k',
    name: 'HUAN 4-Camera Smart Home 4K Security Bundle',
    category: 'package',
    brand: 'HUAN Pro System',
    modelNumber: 'HS-PKG-HOME4K',
    price: 68500,
    shortDescription: 'Complete 4-Channel 4K ColorVu night vision surveillance kit for residential homes & villas.',
    description: 'A turnkey plug-and-play surveillance system engineered for home security. Includes 4x 4K ColorVu audio-enabled night cameras, 4-Channel H.265+ AI NVR, 2TB Surveillance Hard Drive, Cat6 pure copper cabling roll, waterproof junction boxes, and mobile app live streaming with human/vehicle intrusion alerts.',
    specs: {
      'Channels': '4 Channel NVR with 4K HDMI Output',
      'Cameras Included': '4x 5MP/4K ColorVu IP Turret Cameras (Audio Mic Built-in)',
      'Night Vision': '24/7 Full Color Night Vision up to 30 meters',
      'Storage': '2TB Seagate SkyHawk / WD Purple Surveillance Drive',
      'Cabling': '100m Cat6 Pure Copper + RJ45 Connectors + Waterproof Boxes',
      'Remote View': 'iOS & Android App (Zero Monthly Cloud Subscription)',
      'Warranty': '2 Years Official Hardware Replacement Warranty'
    },
    features: [
      '24/7 Full-Color Day & Night Video Recording',
      'Built-in Microphone for Two-Way Audio Monitoring',
      'Smart Human & Vehicle Shape Detection (No False Alarms)',
      'Instant Push Notifications on Phone App',
      'Weatherproof IP67 Metal Housing'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller',
    isPackage: true,
    packageIncludes: [
      '4x 4K ColorVu Audio Turret IP Cameras',
      '1x 4-Port PoE AI NVR with 4K HDMI',
      '1x 2TB Surveillance Grade Hard Drive',
      '100m Cat6 Pure Copper Cable Roll',
      '4x Waterproof Heavy-Duty Junction Boxes',
      'Complete On-Site Installation & Mobile App Setup in Karachi / Nationwide'
    ],
    inStock: true,
    rating: 4.9,
    reviewCount: 94
  },
  {
    id: 'pkg-retail-8cam',
    name: 'HUAN 8-Camera Retail & Shop Pro Package',
    category: 'package',
    brand: 'HUAN Commercial',
    modelNumber: 'HS-PKG-SHOP8',
    price: 135000,
    shortDescription: 'Commercial-grade 8-camera surveillance system with Point-of-Sale zoom coverage and staff/inventory monitoring.',
    description: 'Designed specifically for supermarkets, pharmacies, retail stores, and restaurants. Features 8 high-definition AI cameras with cash counter zoom, customer traffic counting, wide-angle cashier monitoring, and 30-day continuous audio-video recording.',
    specs: {
      'Channels': '8 Channel PoE AI NVR with Dual 4K Outputs',
      'Cameras Included': '8x 4MP Wide-Dynamic Range IP Cameras (Indoor Domes + Outdoor Bullets)',
      'Cash Counter Cam': '1x Motorized Varifocal Zoom Camera for Currency Notes Verification',
      'Storage': '4TB Surveillance Grade HDD (30+ Days Retention)',
      'Network': 'Built-in 8-Port Gigabit PoE Switch',
      'Power Backup': 'Optional 1kVA Pure Sine Wave Online UPS Support'
    },
    features: [
      'Ultra-Sharp Cash Register & Bill Verification',
      'Customer Foot-Traffic Heatmap & Line Crossing Alarms',
      'Tamper & Video Loss Alert to Owner Phone',
      'Synchronized Multi-Camera Playback',
      'Karachi 24-36hr Priority Support Included'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    badge: 'Commercial Pick',
    isPackage: true,
    packageIncludes: [
      '8x 4MP Commercial WDR IP Dome/Bullet Cameras',
      '1x 8-Channel 4K NVR with AI Face/Human Analytics',
      '1x 4TB Surveillance Hard Drive',
      '200m Cat6 Cable + High Grade Conduit Piping',
      'Installation, Labeling, & Manager Multi-Screen Configuration'
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 78
  },
  {
    id: 'pkg-warehouse-16cam',
    name: 'HUAN 16-Camera Industrial Warehouse & Perimeter Fortress',
    category: 'package',
    brand: 'HUAN Enterprise',
    modelNumber: 'HS-PKG-IND16',
    price: 285000,
    shortDescription: 'Heavy-duty industrial surveillance bundle for factories, warehouses, logistics depots, and large perimeters.',
    description: 'Complete high-density security solution engineered to withstand harsh Pakistani industrial environments (dust, heat, power surges). Includes 16 motorized varifocal cameras, optical surge protectors, long-range night IR, and RAID-ready NVR storage.',
    specs: {
      'Channels': '16-Channel 4K Enterprise NVR with RAID 5 Support',
      'Cameras Included': '16x 5MP Long-Range Bullet & IK10 Vandal-Proof Domes',
      'IR Distance': 'Up to 80 Meters Long-Distance Infrared Night Illumination',
      'Storage': '8TB Enterprise Surveillance HDD (Expandable to 32TB)',
      'Surge Protection': 'Integrated 6kV Lightning & Power Surge Isolators',
      'Perimeter AI': 'Deep Learning Tripwire & Perimeter Fence Intrusion'
    },
    features: [
      'Perimeter Line-Crossing & Intrusion Strobe Light Trigger',
      'IK10 Vandal-Proof Metal Domes for High-Traffic Loading Bays',
      'Corridor Mode for Long Warehouse Aisles',
      'Multi-User Access with Role-Based Security Permissions'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    badge: 'Enterprise',
    isPackage: true,
    packageIncludes: [
      '16x 5MP Industrial Bullet & Anti-Vandal Dome Cameras',
      '1x 16-Channel 4K AI NVR with Dual LAN Gigabit Ports',
      '2x 4TB Enterprise Surveillance Drives',
      '16-Port Industrial PoE Switch with 2x SFP Fiber Uplinks',
      'Heavy-duty GI/PVC Conduit Wiring & Lightning Arrestors'
    ],
    inStock: true,
    rating: 5.0,
    reviewCount: 42
  },
  {
    id: 'pkg-fiber-backbone',
    name: 'Long-Range Fiber Optic Multi-Building CCTV Backbone Kit',
    category: 'package',
    brand: 'HUAN Optical Systems',
    modelNumber: 'HS-PKG-FIBER2KM',
    price: 340000,
    shortDescription: 'Turnkey single-mode optical fiber transmission kit connecting remote factory gates and perimeter cameras up to 10km.',
    description: 'Engineered for sprawling sites (factories, ports, farmhouses, campuses) where standard Cat6 copper cable fails due to distance limits (>100m) or electrical interference. Includes armored optical fiber cable, SFP optical transceivers, ODF patch boxes, and fusion splicing service.',
    specs: {
      'Transmission Media': 'Single-Mode Armored Outdoor Fiber Optic (6-Core / 12-Core)',
      'Max Distance': 'Up to 20 Kilometers without Signal Degeneration',
      'Data Throughput': 'Gigabit 1.25Gbps / 10G SFP+ Optical Links',
      'Splicing Standard': 'Core-Alignment Fusion Splicing with <0.02dB Loss Verification',
      'Enclosure': 'IP66 Outdoor Diecast Joint Closure & 19" Rackmount ODF'
    },
    features: [
      'Immune to High-Voltage EMI / Motor Interference & Lightning',
      'Zero Latency Multi-Kilometer 4K Video Transmission',
      'Centralizes Remote Gatehouses & Perimeter Fences to 1 Server Room',
      'OTDR Certified Testing Report Provided upon Commissioning'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    badge: 'Infrastructure',
    isPackage: true,
    packageIncludes: [
      '1,000m Armored Single-Mode Outdoor 6-Core Optical Cable',
      '4x Gigabit SFP Industrial Optical Transceivers',
      '2x 19-Inch 12-Port Fiber Distribution Patch Panels (ODF)',
      'Full On-Site Core Fusion Splicing & Optical Power Meter Certification'
    ],
    inStock: true,
    rating: 5.0,
    reviewCount: 31
  },

  // Individual Hardware Products
  {
    id: 'cam-colorvu-4mp',
    name: 'HUAN Pro 4MP Full-Color AcuSense Turret Camera',
    category: 'dome',
    brand: 'HUAN Pro',
    modelNumber: 'HS-IPC-T240-CV',
    price: 14800,
    shortDescription: '4MP high-resolution turret camera with F1.0 super aperture for vivid 24/7 night color vision and built-in mic.',
    description: 'High-performance IP turret camera engineered with an ultra-wide F1.0 aperture lens and high-sensitivity sensor. Delivers crisp full-color video even in pitch-black conditions. Features deep learning human and vehicle target classification.',
    specs: {
      'Resolution': '4 Megapixel (2560 x 1440 @ 30fps)',
      'Lens': '2.8mm / 4mm Fixed Lens (109° Field of View)',
      'Illumination': 'Warm White LED Light up to 30m',
      'Audio': 'Built-in Noise-Cancelling Microphone',
      'Protection': 'IP67 Waterproof & Dustproof',
      'Compression': 'H.265+ / H.265 / H.264+'
    },
    features: [
      '24/7 Color Imaging with F1.0 Super Aperture',
      'AI Human and Vehicle Target Classification',
      '120dB True Wide Dynamic Range (WDR)',
      'Power over Ethernet (PoE 802.3af)'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
    inStock: true,
    rating: 4.9,
    reviewCount: 65
  },
  {
    id: 'cam-ptz-32x',
    name: 'HUAN Sentinel 32x Optical Zoom 4K Speed Dome PTZ',
    category: 'ptz',
    brand: 'HUAN Sentinel',
    modelNumber: 'HS-PTZ-832-IR',
    price: 112000,
    shortDescription: 'Industrial 4K Pan-Tilt-Zoom camera with 32x optical zoom, 200m Smart IR, and auto-tracking perimeter patrol.',
    description: 'Heavy-duty speed dome camera designed for vast perimeter monitoring, ports, stadiums, and industrial compounds. Features 360-degree endless pan, high-speed tilt, smart auto-tracking of trespassing vehicles and personnel, and laser-assisted night illumination up to 200 meters.',
    specs: {
      'Optical Zoom': '32x Optical Zoom + 16x Digital Zoom',
      'Sensor': '1/1.8" Progressive Scan CMOS (4K 8MP)',
      'IR Range': 'Smart IR Illumination up to 200 Meters',
      'Pan / Tilt Speed': 'Pan: 0.1° to 300°/s; Tilt: 0.1° to 200°/s',
      'Smart Tracking': 'Auto-tracking 3.0 with Perimeter Guard Tripwire',
      'Weather Protection': 'IP67 Weatherproof, 6000V Lightning Surge Protection'
    },
    features: [
      '32x Optical Zoom for License Plate Reading at 300+ Meters',
      'Endless 360° Continuous High-Speed Rotation',
      'Auto-Tracking Algorithm with Deep Learning Target Focus',
      'Defog and Optical Image Stabilization (OIS)'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=800&q=80',
    badge: 'Enterprise PTZ',
    inStock: true,
    rating: 5.0,
    reviewCount: 29
  },
  {
    id: 'cam-bullet-8mp',
    name: 'HUAN Apex 8MP 4K AI Bullet Security Camera',
    category: 'bullet',
    brand: 'HUAN Apex',
    modelNumber: 'HS-IPC-B800-AI',
    price: 22500,
    shortDescription: '8MP ultra-sharp 4K bullet camera with 60m EXIR night vision and motorized varifocal lens.',
    description: 'Commercial-grade 4K bullet camera engineered with motorized remote focus and zoom. Perfect for gate entry lanes, factory perimeters, and outdoor roadways. Built-in strobe light and siren for active deterrence.',
    specs: {
      'Resolution': '8 Megapixel 4K UHD (3840 x 2160)',
      'Lens': '2.8mm to 12mm Motorized Varifocal Lens',
      'Night Vision': 'EXIR 2.0 Infrared up to 60 Meters',
      'Active Deterrence': 'Flashing Red/Blue Strobe & Voice Warning Siren',
      'Housing': 'Full Metal Aluminum Casing (IP67)'
    },
    features: [
      'Motorized Remote Zoom & Auto-Focus via NVR/App',
      'Active Deterrence Sound & Light Alarm to Scared Intruders',
      'True 130dB WDR for Harsh Glare and Headlight Compensation',
      'MicroSD Card Slot up to 512GB Edge Recording'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.8,
    reviewCount: 48
  },
  {
    id: 'nvr-32ch-ai',
    name: 'HUAN Enterprise 32-Channel 4K AI Video Recorder (NVR)',
    category: 'nvr',
    brand: 'HUAN Matrix',
    modelNumber: 'HS-NVR-324K-4S',
    price: 98000,
    shortDescription: 'Enterprise 32-channel NVR with 4 SATA bays (up to 64TB), AI facial recognition, and dual 4K HDMI outputs.',
    description: 'Robust central recording powerhouse for corporate offices, hospitals, and factories. Capable of decoding up to 32 channels of 4K IP streams simultaneously. Features smart AI video analytics, facial recognition database matching, license plate indexing, and redundant dual power/LAN inputs.',
    specs: {
      'Channel Capacity': '32 IP Channels up to 12MP Resolution',
      'Incoming Bandwidth': '384 Mbps Ultra-High Throughput',
      'Storage Capacity': '4x SATA Ports (Supports 4x 16TB = 64TB Total)',
      'Video Outputs': '2x Independent 4K HDMI + 1x VGA',
      'AI Capabilities': 'Facial Recognition, LPR Vehicle Plate, Perimeter Defense',
      'Network': '2x Gigabit RJ45 Self-Adaptive Ethernet Ports'
    },
    features: [
      'Facial Recognition & Blacklist/Whitelist Instant Alerts',
      'Smart Search by Target Face, Plate Number, or Object Color',
      'H.265+ Ultra Compression (Saves 75% Storage Bandwidth)',
      'Automatic Failover Recording & Cloud Storage Sync'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    badge: 'Enterprise Hub',
    inStock: true,
    rating: 4.9,
    reviewCount: 37
  },
  {
    id: 'cmd-videowall-55',
    name: 'HUAN Command Ultra-Narrow Bezel 55" 4K Video Wall Display',
    category: 'control-room',
    brand: 'HUAN Command',
    modelNumber: 'HS-VW55-UNB',
    price: 245000,
    isPriceOnQuote: true,
    shortDescription: 'Commercial 24/7 continuous operation 55-inch video wall display with razor-thin 0.88mm combined bezel.',
    description: 'Engineered specifically for CCTV monitoring stations, emergency dispatch centers, and corporate security headquarters. Features 700 nits high-brightness anti-glare IPS panel, Daisy-Chain 4K loop-through, and thermal heat-dissipation management for 24/7/365 uninterrupted operation.',
    specs: {
      'Screen Size': '55 Inch D-LED Backlit Commercial Panel',
      'Bezel Width': '0.88mm Ultra-Narrow Bezel to Bezel',
      'Brightness': '700 cd/m² Industrial High-Luminance',
      'Duty Cycle': '24/7 Continuous Operation (60,000 Hours Lifespan)',
      'Inputs': 'HDMI 2.0, DisplayPort 1.2, DVI-D, RS232 Control, LAN',
      'Daisy Chain': 'DisplayPort 1.2 4K Loop Through up to 10x10 Matrix'
    },
    features: [
      'Seamless Visual Matrix with 0.88mm Extreme Narrow Bezel',
      'Industrial Grade Thermal Cooling for Non-Stop 24/7 Security Ops',
      'Wide Viewing Angle (178°/178°) with Zero Color Shift',
      'Wall Mount Hydraulic Pop-out Bracket Included'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    badge: 'Control Room Grade',
    inStock: true,
    rating: 5.0,
    reviewCount: 19
  },
  {
    id: 'fiber-media-converter',
    name: 'Industrial Gigabit SFP Fiber Media Converter Pair',
    category: 'fiber',
    brand: 'HUAN OptoLink',
    modelNumber: 'HS-MC-1000-SFP',
    price: 18500,
    shortDescription: 'Heavy-duty industrial optical media converter converting 10/100/1000Base-T Ethernet to 1000Base-FX Fiber.',
    description: 'Designed for extreme industrial environments with operating temperatures from -40°C to +85°C. Features aluminum heat dissipation housing, dual redundant DC power inputs, and 6kV surge isolation for outdoor camera poles and perimeter junction boxes.',
    specs: {
      'Interface': '1x RJ45 10/100/1000M PoE + 1x 1000M SFP Slot',
      'Supported Fiber': 'Single-Mode 9/125um or Multi-Mode 50/125um',
      'Transmission Distance': 'Up to 20km (Single Mode 1310nm/1550nm)',
      'Operating Temp': '-40°C to +85°C Industrial Grade',
      'Surge Immunity': '6kV Lightning and ESD Protection'
    },
    features: [
      'Plug and Play with Link Fault Pass-Through (LFP)',
      'DIN-Rail & Wall-Mount Metal Enclosure',
      'Supports Long-Range Optical Transceiver SFP Modules',
      'Dual Power Input Redundancy'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.8,
    reviewCount: 26
  },
  {
    id: 'acc-biometric-face',
    name: 'HUAN Secure AI Facial & Fingerprint Access Control Terminal',
    category: 'access',
    brand: 'HUAN Access',
    modelNumber: 'HS-AC-FACE80',
    price: 38500,
    shortDescription: 'Touchless AI facial recognition, RFID card, and biometric fingerprint reader with electromagnetic lock controller.',
    description: 'High-speed touchless access control terminal with anti-spoofing dual camera algorithms. Recognizes authorized staff in under 0.2 seconds even while wearing masks or in dim lighting. Integrates with automatic glass doors, turnstiles, and payroll software.',
    specs: {
      'Face Capacity': '10,000 Facial Templates (0.2s Recognition Speed)',
      'Fingerprint Capacity': '10,000 Fingerprint Records',
      'Display': '5.0-Inch IPS High-Def Touch Screen',
      'Communication': 'TCP/IP, Wi-Fi, RS485, Wiegand 26/34 Output',
      'Relay': 'Direct Output for EM-Lock, Drop Bolt, and Push Button'
    },
    features: [
      'Live Anti-Spoofing Algorithm (Blocks Photos & Screen Replays)',
      'Time Attendance Reporting & Shift Scheduling Export to Excel',
      'Remote Door Unlock via Admin App',
      'Vandal Proof Aluminum Alloy Frame'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.9,
    reviewCount: 41
  }
];

export const INITIAL_SERVICES = [
  {
    id: 'cctv-smart-surveillance',
    title: 'CCTV & Smart Surveillance',
    shortDesc: 'HD CCTV, IP Camera Systems, NVR/DVR, high-resolution smart cameras with AI-based human & vehicle detection.',
    fullDesc: 'HD CCTV, IP Camera Systems, NVR/DVR, high-resolution and modern smart cameras with AI-based human & vehicle detection, motion detection, intrusion detection, line-crossing and advanced video analytics, remote monitoring and centralized video management.',
    icon: 'Camera',
    keyPoints: [
      'HD CCTV, 4K IP Camera Systems & high-capacity NVR/DVR recording',
      'AI-based human & vehicle classification with 98% false alarm reduction',
      'Intrusion detection, motion tracking, and line-crossing video analytics',
      'Encrypted remote monitoring and centralized video management (VMS)'
    ],
    idealFor: 'Commercial facilities, retail outlets, manufacturing sites, and high-density residential properties.',
    slaNote: 'Guaranteed 24–36 hour on-site resolution for service requests anywhere in Karachi.'
  },
  {
    id: 'fiber-cctv-solutions',
    title: 'Long-Range & Fiber CCTV Solutions',
    shortDesc: 'Fiber-based surveillance infrastructure for factories, warehouses, ports, farms, estates, and long perimeters.',
    fullDesc: 'Fiber-based surveillance infrastructure for factories, warehouses, ports, farms, estates, campuses and long perimeters. Single-mode/multi-mode fiber, media converters, splicing, testing and redundant fiber paths for reliable long-distance camera connectivity.',
    icon: 'Network',
    keyPoints: [
      'Single-mode & multi-mode optical fiber trunk distribution for up to 20km',
      'Industrial Gigabit media converters & optical SFP transceiver modules',
      'Precision fusion splicing (<0.02 dB loss) and calibrated OTDR testing',
      'Redundant fiber ring architectures ensuring zero downtime from cable cuts'
    ],
    idealFor: 'Factories, textile spinning mills, warehouses, shipping ports, farms, estates, and perimeter security.',
    slaNote: 'Emergency optical fusion splicing restoration within 24 hours.'
  },
  {
    id: 'command-centers',
    title: 'Control Rooms & Command Centers',
    shortDesc: 'Complete CCTV control rooms, video walls, monitoring workstations, and 24/7 surveillance infrastructure.',
    fullDesc: 'Complete CCTV control room and command center solutions including VMS, monitoring workstations, large displays, multi-monitor setups, video walls, centralized monitoring, network redundancy and 24/7 surveillance infrastructure.',
    icon: 'LayoutGrid',
    keyPoints: [
      'Ultra-narrow bezel commercial 24/7 video wall displays (0.88mm / 1.74mm seam)',
      'Enterprise Video Management Software (VMS) matrix deployment',
      'Ergonomic multi-screen operator consoles and client workstations',
      'Network redundancy, active cooling management & 24/7 continuous uptime design'
    ],
    idealFor: 'Corporate headquarters, municipal security, defense zones, logistics hubs, and financial institutions.',
    slaNote: 'Turnkey architectural build-out including thermal optimization and matrix configuration.'
  },
  {
    id: 'access-control-biometrics',
    title: 'Access Control & Biometric Systems',
    shortDesc: 'RFID/card access, fingerprint and facial-recognition systems, biometric attendance, and smart door controllers.',
    fullDesc: 'RFID/card access, fingerprint and facial-recognition systems, biometric attendance, smart door controllers, electromagnetic locks, exit buttons and centralized access management.',
    icon: 'ShieldCheck',
    keyPoints: [
      'Touchless AI facial recognition terminals (<0.2s) & optical fingerprint scanners',
      'RFID proximity smart cards, PIN keypads, and mobile Bluetooth credentials',
      'Biometric attendance automation synchronized with payroll and ERP databases',
      'Heavy-duty electromagnetic locks (600lbs/1200lbs), push exit buttons & smart controllers'
    ],
    idealFor: 'Corporate offices, factories, healthcare institutions, pharmaceutical labs, and server rooms.',
    slaNote: 'Emergency fire alarm auto-unlock fail-safe integration standard.'
  },
  {
    id: 'door-phone-intercom',
    title: 'Door Phone & Intercom Systems',
    shortDesc: 'Audio, Video & IP Intercom solutions, video door phones, indoor monitors, and multi-point communication systems.',
    fullDesc: 'Audio, Video & IP Intercom solutions, video door phones, indoor monitors, outdoor panels, master stations and multi-point communication systems for residential, commercial and industrial facilities.',
    icon: 'Phone',
    keyPoints: [
      'High-definition touchscreen indoor master stations with smartphone call forwarding',
      'Vandal-resistant outdoor camera doorbell panels with integrated night IR',
      'Multi-point master stations and reception communication terminals',
      'Direct electronic gate and door lock release with acoustic echo cancellation'
    ],
    idealFor: 'Residential villas, luxury apartment complexes, commercial receptions, and industrial entry gates.',
    slaNote: 'Turnkey wiring, chime synchronization, and mobile remote unlock setup.'
  },
  {
    id: 'structured-cabling',
    title: 'Network & Structured Cabling',
    shortDesc: 'Complete Cat6/Cat6A structured cabling infrastructure for CCTV, computers, servers, and communication systems.',
    fullDesc: 'Complete Cat6/Cat6A and structured cabling infrastructure for CCTV, computers, servers and communication systems, including patch panels, PoE/managed switches, cable management, testing and organized rack cabling.',
    icon: 'Cable',
    keyPoints: [
      '100% Pure Oxygen-Free Copper Cat6 and Cat6A certified low-voltage cabling',
      'High-density patch panels, brush cable managers & organized comb dressing',
      'PoE / PoE+ / PoE++ Gigabit managed switches for high-wattage PTZ cameras',
      'Standardized node labeling with Fluke analyzer certified performance reports'
    ],
    idealFor: 'Data centers, corporate towers, manufacturing floors, multi-story buildings, and commercial offices.',
    slaNote: 'Structured channel certification with lifetime cable backbone integrity assurance.'
  },
  {
    id: 'server-room-infrastructure',
    title: 'Server Room & Rack Infrastructure',
    shortDesc: 'Professional server room and network rack setup including server racks, patch panels, switches, PDU, and UPS.',
    fullDesc: 'Professional server room and network rack setup including server racks, wall-mount racks, patch panels, switches, PDU, UPS integration, fiber distribution, cable management and equipment organization.',
    icon: 'Cpu',
    keyPoints: [
      'Floor-standing and wall-mount server racks (4U to 42U) with lockable glass/mesh doors',
      'Intelligent Power Distribution Units (PDU) and Online UPS battery backup integration',
      'Fiber Optic Distribution Units (LIU / ODF) and organized patch bays',
      'Thermal airflow optimization and disciplined horizontal/vertical cable management'
    ],
    idealFor: 'Enterprise server rooms, IT communication closets, network hubs, and telecom facilities.',
    slaNote: 'Complete CAD rack layout documentation and port mapping provided.'
  },
  {
    id: 'fiber-optic-networking',
    title: 'Fiber Optic Networking',
    shortDesc: 'Fiber backbone design, installation, termination, splicing, testing and distribution for high-bandwidth networks.',
    fullDesc: 'Fiber backbone design, installation, termination, splicing, testing and distribution for high-bandwidth building, campus and multi-site networks.',
    icon: 'Zap',
    keyPoints: [
      'Armored direct-burial outdoor and low-smoke zero-halogen (LSZH) indoor fiber cables',
      'Core-alignment fusion splicing with minimal optical attenuation (<0.02 dB)',
      'High-density fiber optic patch panels, splice trays, and LC/SC/FC terminations',
      'Multi-gigabit backbone integration for campus, inter-building, and multi-site networking'
    ],
    idealFor: 'Campuses, multi-building industrial plants, hospitals, commercial complexes, and data networks.',
    slaNote: 'Comprehensive optical attenuation test reports with calibrated light source & power meters.'
  },
  {
    id: 'pabx-ip-pbx-systems',
    title: 'PABX & IP-PBX Telephone Systems',
    shortDesc: 'Business telephone infrastructure including PABX/IP-PBX, IP phones, extensions, and centralized telephone management.',
    fullDesc: 'Business telephone infrastructure including PABX/IP-PBX, IP phones, extensions, internal calling, reception systems and centralized telephone management.',
    icon: 'Headphones',
    keyPoints: [
      'Next-generation IP-PBX appliance deployment & SIP trunk carrier configuration',
      'Executive HD desktop IP phones, wireless DECT handsets, and softphone apps',
      'Multi-level IVR auto-attendant, hunt groups, call forwarding, and voicemail-to-email',
      'Free inter-branch extension dialing and centralized call recording management'
    ],
    idealFor: 'Corporate offices, customer service centers, hotels, hospitals, and distributed branch networks.',
    slaNote: 'Pre-configured dialing plans and customized automated voice greetings.'
  },
  {
    id: 'network-wireless-infrastructure',
    title: 'Network & Wireless Infrastructure',
    shortDesc: 'Routers, managed/PoE switches, enterprise Wi-Fi, and connectivity solutions for security and business operations.',
    fullDesc: 'Routers, managed/PoE switches, enterprise Wi-Fi, network infrastructure and connectivity solutions designed to support security and business operations.',
    icon: 'Radio',
    keyPoints: [
      'Enterprise multi-WAN Gigabit routers with automatic failover and load balancing',
      'Managed Layer 2/3 PoE switches with VLAN network segmentation for security streams',
      'High-density indoor/outdoor Wi-Fi 6 Access Points with zero-handoff seamless roaming',
      'Dedicated guest portal authentication and hardware firewall bandwidth management'
    ],
    idealFor: 'Corporate headquarters, warehouses, educational institutions, retail outlets, and outdoor yards.',
    slaNote: 'RF heatmap-guided AP placement for 100% wireless coverage without dead zones.'
  },
  {
    id: 'system-integration-maintenance',
    title: 'Security System Integration & Maintenance',
    shortDesc: 'Integration of CCTV, access control, intercom, and networking supported by preventive maintenance and upgrades.',
    fullDesc: 'Integration of CCTV, access control, biometric, intercom, networking, servers and communication systems, supported by preventive maintenance, troubleshooting, upgrades and technical support.',
    icon: 'Wrench',
    keyPoints: [
      'Unified software integration of CCTV, access control, intercoms, and intrusion alarms',
      'Scheduled preventive maintenance audits, lens cleaning, and focus calibration',
      'Storage integrity verification, firmware security patches, and PSU health checks',
      'Fixed Karachi SLA: Dedicated service engineer on-site in 24–36 hours with standby loaner units'
    ],
    idealFor: 'All commercial, industrial, and institutional facilities requiring zero-downtime security assurance.',
    slaNote: 'Karachi 24–36hr resolution contract with priority emergency dispatch.'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    authorName: 'Tariq Mehmood',
    companyOrRole: 'Operations Director, Lucky Textile Mills',
    city: 'Karachi (SITE Area)',
    serviceType: 'Fiber Optic Long-Range CCTV Backbone',
    rating: 5,
    date: '2026-06-14',
    comment: 'HUAN Surveillance deployed an extensive 4.5km single-mode fiber optic backbone across our textile weaving and spinning units. Their fusion splicing quality was top-notch with zero packet drops. When we reported a damaged cable after civil work, their Karachi team was on-site within 18 hours. Exceptional commitment!',
    verified: true,
    status: 'approved',
    featured: true
  },
  {
    id: 'rev-2',
    authorName: 'Salman Farooqui',
    companyOrRole: 'Head of IT & Security, Premier Logistics Hub',
    city: 'Karachi (Port Qasim)',
    serviceType: 'Control Room & 6-Screen Video Wall',
    rating: 5,
    date: '2026-07-02',
    comment: 'The command center they engineered for our container yard is world-class. 6x 55-inch ultra-narrow bezel screens connected to 64 IP cameras with automated truck gate recognition. Professional cable management and flawless training for our control room operators.',
    verified: true,
    status: 'approved',
    featured: true
  },
  {
    id: 'rev-3',
    authorName: 'Dr. Ayesha Siddiqui',
    companyOrRole: 'Medical Director, Horizon Specialty Hospital',
    city: 'Karachi (Gulshan-e-Iqbal)',
    serviceType: 'Commercial CCTV & Access Control',
    rating: 5,
    date: '2026-07-28',
    comment: 'We upgraded 32 cameras across our emergency and ICU wings with HUAN. The ColorVu night vision cameras are shockingly clear even with lights switched off. The FBR tax invoice and NTN compliance made our procurement audit completely painless.',
    verified: true,
    status: 'approved',
    featured: true
  },
  {
    id: 'rev-4',
    authorName: 'Hamza Khan',
    companyOrRole: 'Estate Owner',
    city: 'Islamabad (Chak Shahzad)',
    serviceType: '4K Smart Home Security Package',
    rating: 5,
    date: '2026-08-05',
    comment: 'Got the 8-camera 4K package for my farmhouse. Even though I am in Islamabad, their nationwide installation team arrived right on schedule. The mobile app works smoothly on both iOS and Android with two-way audio. Highly recommended!',
    verified: true,
    status: 'approved',
    featured: false
  },
  {
    id: 'rev-5',
    authorName: 'Khurram Jamil',
    companyOrRole: 'Managing Partner, Gourmet Bakers & Supermarket',
    city: 'Lahore (Gulberg III)',
    serviceType: 'Retail Cashier 8-Camera Bundle',
    rating: 5,
    date: '2026-08-11',
    comment: 'The motorized zoom camera over our cash registers has already helped us resolve three cash discrepancy disputes. The image clarity when zooming into 1000 and 5000 rupee notes is remarkable. Great after-sales support.',
    verified: true,
    status: 'approved',
    featured: true
  },
  {
    id: 'rev-6',
    authorName: 'Naveed Akhtar',
    companyOrRole: 'Admin Manager, Hub Power Plant Ancillary Facility',
    city: 'Hub Industrial Area (Balochistan)',
    serviceType: 'Industrial Perimeter Security & AMC',
    rating: 4,
    date: '2026-05-19',
    comment: 'Reliable team that understands tough industrial power environments. They equipped all outdoor camera poles with lightning arrestors and surge suppressors. We have signed their annual maintenance contract (AMC) for peace of mind.',
    verified: true,
    status: 'approved',
    featured: false
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'fiber-optic-vs-copper-cctv-pakistan',
    title: 'Why Fiber Optic Cabling is Essential for Long-Range CCTV (>100m) in Industrial Sites',
    excerpt: 'Understanding the technical limitations of Cat6 copper cables and why factories, ports, and large estates in Pakistan require single-mode fiber optic backbones.',
    content: `When designing surveillance infrastructure for factories, agricultural estates, industrial parks (SITE, Korangi, Sundar, Hattar), or deep-water ports in Pakistan, security engineers frequently encounter distance limitations. 

Standard Ethernet copper cabling (Cat5e / Cat6) has an unbreakable physical limit of 100 meters (328 feet). Attempting to push copper beyond this threshold causes high packet loss, frame dropping, voltage drops on PoE cameras, and susceptibility to electromagnetic interference (EMI) from heavy industrial machinery and generators.

### 1. The 100-Meter Copper Wall
Copper transmits electrical signals. Over long distances, electrical resistance degrades the data waveform and introduces significant latency. For perimeter fences stretching 500m to 3km, running multiple copper repeaters or daisy-chained switches introduces multiple points of failure.

### 2. The Optical Fiber Advantage
Optical fiber uses pulses of light traveling through ultra-pure silica glass cores. 
- **Distance:** Single-mode fiber (9/125µm) can easily carry uncompressed 4K video streams up to 20 kilometers without a single repeater.
- **Immunity to Lightning & Power Surges:** Fiber is non-conductive. High voltage spikes from summer thunderstorms or fluctuating industrial grid power cannot travel down a glass fiber cable to destroy your expensive central NVR.
- **Zero EMI:** Motors, arc welders, and power transformers cause zero interference to optical signals.

### 3. Key Components of a HUAN Fiber Surveillance Backbone
1. **Armored Outdoor Fiber Cable:** Heavy-duty steel corrugated armoring prevents rodent damage and survives direct burial or aerial pole mounting.
2. **Core-Alignment Fusion Splicing:** Precision welding of optical fibers with insertion loss kept below 0.02 dB.
3. **Gigabit SFP Optical Transceivers & ODF Panels:** Standardized rack-mount termination for fast modular maintenance.

HUAN Surveillance provides complete optical network design, trenching, fusion splicing, and OTDR testing across Pakistan.`,
    category: 'Technical Guide',
    author: 'Engr. Zeeshan Ali, Senior Network Architect',
    date: 'August 18, 2026',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    tags: ['Fiber Optic', 'CCTV Infrastructure', 'Industrial Security', 'Long Range']
  },
  {
    id: 'blog-2',
    slug: 'karachi-24-36-hour-service-guarantee-guide',
    title: 'The Karachi 24–36 Hour Service Guarantee: Why Rapid Resolution Matters for Security',
    excerpt: 'A broken security camera is a security breach waiting to happen. Discover how HUAN Surveillance enforces a strict 24-36hr on-site resolution turnaround in Karachi.',
    content: `In the commercial capital of Karachi, business downtime is expensive — and security downtime is dangerous. Whether it is a busy retail pharmacy on Tariq Road, a warehouse in Korangi, or a residence in DHA Phase 8, a malfunctioning camera feed creates an immediate blind spot.

### The Problem with Traditional CCTV Vendors
Many contractors install CCTV equipment and disappear when service issues arise. Customers often wait 7 to 14 days for a technician to visit, only to be told the part needs to be sent for repairs.

### HUAN Surveillance\'s 24–36 Hour SLA Commitment
At HUAN Surveillance, our core operating principle is rapid turnaround. For all registered clients and installed systems within Karachi:
- **Triage within 2 Hours:** Our technical support desk reviews the ticket, verifies network ping, and identifies whether the fault is software or hardware.
- **On-Site Field Engineer within 24 to 36 Hours:** A fully equipped technical van arrives with standby replacement cameras, power supplies, connectors, and cable testing tools.
- **Standby Replacement Unit Policy:** If a camera or NVR requires factory warranty RMA, we install a temporary standby loaner unit immediately so your facility is never unprotected.

### Nationwide Service Network
While Karachi enjoys our fastest 24–36hr guarantee, HUAN delivers complete installation and project support across Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, and Hub.`,
    category: 'Company Policy',
    author: 'HUAN Operations Management',
    date: 'August 10, 2026',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    tags: ['Karachi SLA', 'Maintenance', 'Customer Service', 'Trust']
  },
  {
    id: 'blog-3',
    slug: 'cctv-control-room-and-command-center-design',
    title: 'Designing a 24/7 CCTV Control Room & Video Wall: 5 Critical Engineering Principles',
    excerpt: 'Key considerations for corporate HQs, gated communities, and industrial facilities building centralized monitoring command centers.',
    content: `A command center is the nervous system of an enterprise security operation. Simply mounting a few consumer televisions on a wall is not a command center. Professional surveillance command centers require careful attention to ergonomics, matrix video decoding, thermal management, and failover redundancy.

### 1. Commercial 24/7 Video Wall Displays vs Consumer TVs
Consumer televisions are designed for 4-6 hours of daily usage. When operated 24/7, their backlights burn out rapidly, colors drift, and thick plastic bezels create ugly 2-inch black gridlines across camera feeds.
HUAN utilizes industrial ultra-narrow bezel displays (0.88mm - 1.7mm seam) with 700 nits anti-glare coatings and 60,000-hour continuous duty cycles.

### 2. Video Management Software (VMS) & Decoding Matrix
High-density multi-camera viewing requires dedicated hardware decoders. Attempting to render 64 4K streams on a standard desktop PC will freeze the graphics card. A hardware video matrix processor seamlessly routes any alarm camera to a central focus screen upon motion or perimeter tripwire violation.

### 3. Operator Ergonomics & Sightlines
Operator fatigue is the #1 cause of missed security incidents. Video walls must be angled with proper focal distances (typically 1.5x to 2.5x the screen height) so operators can scan 48+ camera feeds without chronic neck strain.

### 4. Power & Environmental Redundancy
A command center must survive municipal power blackouts. Dual redundant online UPS systems paired with clean generator changeover switches ensure zero camera reboot cycles during load-shedding events.

### 5. Talk to HUAN Engineers
HUAN Surveillance offers complete turnkey command center engineering from 3D architectural layout and console fabrication to video wall installation and operator training.`,
    category: 'Engineering',
    author: 'Engr. Bilal Hashmi, Solutions Consultant',
    date: 'August 02, 2026',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    tags: ['Command Center', 'Video Wall', 'VMS', 'Control Room']
  }
];

export const INITIAL_LEADS: QuoteLead[] = [
  {
    id: 'HUAN-QT-2026-9102',
    createdAt: '2026-08-23T14:30:00Z',
    customerName: 'Kashif Riaz',
    email: 'kashif.riaz@alnoortextile.com.pk',
    phone: '+92 321 8901234',
    city: 'Karachi (Landhi Industrial Area)',
    address: 'Plot 48, Sector 12, Landhi Industrial Zone',
    serviceCategory: 'fiber-optic',
    propertyType: 'Industrial Textile Spinning Factory',
    estimatedAreaOrPoints: '12 Acres (4 Production Sheds + Perimeter)',
    cameraCountOrScale: '28 IP Cameras + 2.5km Fiber Optic Run',
    budgetTier: 'enterprise',
    indoorOutdoorRequirement: '12 Indoor Production Domes + 16 Outdoor 80m IR Bullets',
    timeline: 'Within 2 Weeks',
    additionalNotes: 'Need fiber connection between main gate, warehouse, and central server room. Need Karachi 24-36hr service commitment for tender sign-off.',
    aiRecommendation: {
      summary: 'High-density industrial multi-building surveillance with armored 6-core single-mode fiber optic backbone and 32-channel AI NVR.',
      suggestedHardware: [
        '16x HUAN Apex 8MP 4K AI Long-Range Bullet Cameras',
        '12x HUAN Pro 4MP Full-Color Turret Cameras',
        '1x HUAN Enterprise 32-Ch 4K AI NVR with 24TB RAID 5',
        '2,500m Armored Single-Mode Outdoor Optical Fiber Cable',
        '4x Industrial Gigabit SFP Media Converters + Core Fusion Splicing'
      ],
      infrastructurePlan: '4 SFP Fiber loop links originating from Central Admin Block to Gate 1, Spinning Unit 1, Weaving Unit 2, and Finished Goods Godown.',
      recommendedTier: 'Enterprise Industrial Tier',
      estimatedPriceRangePKR: 'PKR 850,000 – 1,150,000 (Subject to site survey & exact fiber meters)',
      specialNotes: 'Includes full optical OTDR certification report and 24-36hr Karachi priority maintenance.'
    },
    status: 'new'
  },
  {
    id: 'HUAN-QT-2026-8941',
    createdAt: '2026-08-22T09:15:00Z',
    customerName: 'Farhan Zaidi',
    email: 'farhan@apexretail.pk',
    phone: '+92 300 2345678',
    city: 'Karachi (Clifton)',
    address: 'Shop 14, Commercial Lane, Block 4, Clifton',
    serviceCategory: 'cctv',
    propertyType: 'Retail Boutique & Jewelry Counter',
    estimatedAreaOrPoints: '2,400 sq ft Showroom',
    cameraCountOrScale: '8 Cameras (2 High-Zoom Cashier)',
    budgetTier: 'standard',
    indoorOutdoorRequirement: '6 Indoor ColorVu Domes + 2 Outdoor Metal Bullets',
    timeline: 'Immediate (Next 3 Days)',
    additionalNotes: 'Looking at the HUAN 8-Camera Retail Pro package with cash counter notes verification.',
    aiRecommendation: {
      summary: '8-Camera Retail Pro package with motorized varifocal optical zoom on cash counters and 30-day audio-video retention.',
      suggestedHardware: [
        '6x HUAN Pro 4MP Full-Color AcuSense Domes',
        '2x Motorized Varifocal Cashier Zoom Cameras',
        '1x 8-Channel 4K AI PoE NVR',
        '1x 4TB Surveillance Hard Drive'
      ],
      infrastructurePlan: 'Cat6 pure copper concealed wiring inside decorative PVC trunking.',
      recommendedTier: 'Commercial Standard Pro',
      estimatedPriceRangePKR: 'PKR 145,000 – 165,000 (Turnkey Installed)',
      specialNotes: 'Customer requested installation before grand opening on Friday.'
    },
    status: 'contacted'
  }
];
