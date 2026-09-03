import { ServiceCategory } from '../types';
import { functions, QUOTE_FUNCTION_ID } from '../lib/appwrite';

export interface QuoteInputData {
  serviceCategory: ServiceCategory;
  serviceCategoryLabel: string;
  propertyType: string;
  estimatedAreaOrPoints: string;
  cameraCountOrScale: string;
  indoorOutdoorRequirement: string;
  budgetTier: 'economy' | 'standard' | 'enterprise';
  timeline: string;
  additionalNotes: string;
  city: string;
}

export interface GeneratedAIQuote {
  summary: string;
  suggestedHardware: string[];
  infrastructurePlan: string;
  recommendedTier: string;
  estimatedPriceRangePKR: string;
  specialNotes: string;
  cameraCountBreakdown?: {
    indoor: number;
    outdoor: number;
    specialty: number;
  };
  recommendedStorageTB: number;
  cablingType: string;
}

export async function generateAIQuoteRecommendation(data: QuoteInputData): Promise<GeneratedAIQuote> {
  try {
    if (!QUOTE_FUNCTION_ID) throw new Error('Quote function not configured');

    const execution = await functions.createExecution(
      QUOTE_FUNCTION_ID,
      JSON.stringify(data),
      false, // synchronous — wait for the result
      '/',
      'POST' as any,
    );

    if (execution.responseStatusCode >= 200 && execution.responseStatusCode < 300) {
      const result = JSON.parse(execution.responseBody);
      if (result?.success && result?.data) {
        return result.data;
      }
    }
  } catch (err) {
    console.warn('Appwrite quote function unavailable, using expert local engineering heuristics:', err);
  }

  // Robust Local Heuristic Engine (produces realistic, top-tier engineering specifications)
  return generateHeuristicQuote(data);
}

function generateHeuristicQuote(data: QuoteInputData): GeneratedAIQuote {
  const isKarachi = data.city.toLowerCase().includes('karachi');
  const slaText = isKarachi
    ? 'Backed by HUAN\u2019s 24\u201336 Hour Guaranteed Service Resolution SLA in Karachi.'
    : 'Backed by HUAN\u2019s Nationwide Technical Support & 2-Year Hardware Warranty.';

  if (data.serviceCategory === 'fiber-optic') {
    return {
      summary: `Engineered long-range optical backbone system for ${data.propertyType}. Transmits lossless 4K camera streams over single-mode armored optical fiber cores with zero electrical interference.`,
      suggestedHardware: [
        'Armored Outdoor 6-Core Single-Mode Optical Fiber Cable (Distance calibrated to site layout)',
        'Industrial Gigabit SFP Optical Media Converters with 6kV surge suppression',
        'Rackmount 12/24-Port Optical Distribution Frames (ODF) & LC Pigtails',
        'Core-Alignment Precision Fusion Splicing (<0.02dB signal attenuation)',
        'HUAN 4K Long-Range AI Bullet & Optical Zoom PTZ Cameras',
      ],
      infrastructurePlan: 'Direct-buried or aerial armored optical fiber trunk lines connecting outposts/gates to central server rack. Eliminates the 100m copper limitation.',
      recommendedTier: data.budgetTier === 'enterprise' ? 'Enterprise Fiber Campus Backbone' : 'Standard Long-Range Fiber Link Kit',
      estimatedPriceRangePKR: data.budgetTier === 'enterprise'
        ? 'PKR 550,000 \u2013 950,000 (Based on fiber run meters & core count)'
        : 'PKR 220,000 \u2013 380,000 (Subject to exact site survey)',
      specialNotes: `Includes Fluke/OTDR certified optical signal-loss verification report upon commissioning. ${slaText}`,
      recommendedStorageTB: 8,
      cablingType: 'Armored Single-Mode 9/125\u00b5m Optical Fiber',
    };
  }

  if (data.serviceCategory === 'command-center') {
    return {
      summary: `Turnkey surveillance command center and control room design for ${data.propertyType}. Features unified multi-screen video wall decoding, ergonomic operator console, and 24/7 continuous operations readiness.`,
      suggestedHardware: [
        '4x to 6x HUAN 55-Inch Ultra-Narrow Bezel (0.88mm) Commercial 24/7 Video Wall Displays',
        'Hardware Multi-Screen Video Matrix Processor with 4K HDMI Loop-through',
        'Dual-Operator Ergonomic Steel Console with integrated cable raceways and monitor arms',
        'Enterprise Video Management System (VMS) Server with Smart Alarm Pop-ups',
        '3kVA Pure Sine Wave Online Redundant UPS Battery Backup',
      ],
      infrastructurePlan: 'Dedicated control room server rack with isolated thermal dissipation, KVM matrix switching, and emergency generator auto-changeover line.',
      recommendedTier: 'HUAN Mission-Critical Command Center',
      estimatedPriceRangePKR: data.budgetTier === 'enterprise'
        ? 'PKR 1,200,000 \u2013 2,400,000 (Custom engineered to room dimensions)'
        : 'PKR 650,000 \u2013 980,000 (4-Display Matrix Configuration)',
      specialNotes: `Includes 3D sightline architectural plan, operator ergonomic layout, and staff training. ${slaText}`,
      recommendedStorageTB: 16,
      cablingType: 'Shielded Cat6A & Fiber Optic Matrix Interconnects',
    };
  }

  if (data.serviceCategory === 'access-control') {
    return {
      summary: `Touchless biometric and facial recognition access control infrastructure for ${data.propertyType}. Integrates electromagnetic security door locking with automated time-attendance logging.`,
      suggestedHardware: [
        'HUAN AI Dual-Lens Facial Recognition & Fingerprint Terminals (<0.2s speed)',
        '600lbs / 1200lbs Heavy-Duty Electromagnetic Locks with Stainless Steel ZL Brackets',
        'Emergency Break-Glass Override Switches & Push-to-Exit Sensor Buttons',
        '12V 5A Linear Power Supply Unit with Rechargeable Standby Battery Backup',
        'Automated Time-Attendance & Shift Payroll Management Software',
      ],
      infrastructurePlan: 'Concealed low-voltage fire-rated cabling run inside door frames with master interlock integration.',
      recommendedTier: 'Commercial Biometric & Access Tier',
      estimatedPriceRangePKR: 'PKR 95,000 \u2013 190,000 (Depending on number of controlled doors)',
      specialNotes: `Anti-spoofing algorithm prevents photo/video mobile phone spoofing. ${slaText}`,
      recommendedStorageTB: 1,
      cablingType: 'Shielded 4-Core Twisted Pair Cable',
    };
  }

  if (data.serviceCategory === 'amc-maintenance') {
    return {
      summary: `Comprehensive Preventive & Corrective Annual Maintenance Contract (AMC) for ${data.propertyType}. Ensures 99.8% system uptime with regular health audits and standby spare equipment.`,
      suggestedHardware: [
        'Monthly On-Site Camera Lens Cleaning, Alignment, and Waterproofing Inspection',
        'Surveillance Hard Drive SMART Sector & Recording Retention Audits',
        'PoE Switch & Power Supply Voltage Stability Testing',
        'Standby Camera & NVR Loaner Unit Policy during repairs',
        'Priority Technical Helpdesk Support with Dedicated Account Engineer',
      ],
      infrastructurePlan: 'Scheduled quarterly preventive site visits + unlimited emergency breakdown dispatches.',
      recommendedTier: 'HUAN Gold AMC Contract',
      estimatedPriceRangePKR: 'PKR 45,000 \u2013 120,000 / Year (Based on camera count & site complexity)',
      specialNotes: `Guarantees ${data.city} on-site response within ${isKarachi ? '24\u201336 Hours' : '48 Hours'}. Standby loaner hardware prevents security gaps.`,
      recommendedStorageTB: 0,
      cablingType: 'Maintenance & Cable Rectification Included',
    };
  }

  const isResidential = data.propertyType.toLowerCase().includes('home') || data.propertyType.toLowerCase().includes('villa') || data.propertyType.toLowerCase().includes('residence');

  if (isResidential) {
    return {
      summary: `High-resolution residential surveillance setup for ${data.propertyType}. Offers 24/7 full-color night vision, two-way audio monitoring, and instant smartphone notifications for family security.`,
      suggestedHardware: [
        '4x to 8x HUAN 4MP/4K ColorVu Full-Color Turret IP Cameras with Built-in Microphones',
        '1x 4K AI NVR with Human & Vehicle Smart Target Filtering',
        '2TB to 4TB Surveillance Hard Drive (25+ Days Recording)',
        'Heavy-Duty Weatherproof Junction Boxes & Pure Copper Cat6 Cable',
        'Zero-Subscription Mobile App for iOS & Android with Multi-User Family Sharing',
      ],
      infrastructurePlan: 'Clean concealed wiring inside PVC conduits through ceiling/crawlspaces with zero messy visible wires.',
      recommendedTier: 'HUAN 4K Smart Home Package',
      estimatedPriceRangePKR: 'PKR 68,500 \u2013 125,000 (Turnkey Installed)',
      specialNotes: `F1.0 super-aperture lenses keep porch, driveway, and garden brightly illuminated in full color all night. ${slaText}`,
      recommendedStorageTB: 2,
      cablingType: 'Cat6 Pure Oxygen-Free Copper',
    };
  }

  return {
    summary: `Commercial-grade IP surveillance system designed for ${data.propertyType}. Engineered with AI perimeter intrusion detection, point-of-sale cash register coverage, and centralized recording.`,
    suggestedHardware: [
      'HUAN Pro 4MP/8MP AcuSense WDR Dome & Bullet IP Cameras',
      'Motorized Varifocal Zoom Camera for Cash Registers / Entry Gates',
      '8 to 16-Channel 4K AI NVR with Face & Vehicle Plate Indexing',
      '4TB to 8TB High-Endurance Enterprise Surveillance Hard Drive',
      'Gigabit PoE Network Switch & Online UPS Power Protection',
    ],
    infrastructurePlan: 'Industrial-grade conduit routing with surge protection at outdoor poles and centralized server rack termination.',
    recommendedTier: data.budgetTier === 'enterprise' ? 'HUAN Industrial Fortress Tier' : 'HUAN Commercial Pro Tier',
    estimatedPriceRangePKR: data.budgetTier === 'enterprise' ? 'PKR 285,000 \u2013 490,000' : 'PKR 135,000 \u2013 210,000',
    specialNotes: `Smart AI tripwire alerts send immediate push notifications if unauthorized personnel enter restricted areas after hours. ${slaText}`,
    recommendedStorageTB: 4,
    cablingType: 'Cat6 Pure Copper / SFP Fiber Uplink',
  };
}
