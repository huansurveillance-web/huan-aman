// Appwrite Function — runs server-side only.
// GROQ_API_KEY is set as an environment variable in the Appwrite Function's
// settings (Console > Functions > generate-quote > Settings > Variables).
// It never lives in this repo and never reaches the browser.

const SYSTEM_PROMPT = `You are the Lead Systems Architect at HUAN Surveillance (Pakistan's premier security & CCTV engineering firm).
Analyze the customer's security requirements and generate a professional, engineering-grade system architecture and hardware recommendation.
Return a valid JSON object ONLY (no markdown, no code fences) with this exact schema:
{
  "summary": "2-3 sentence executive architectural overview tailored to the site and risk profile",
  "suggestedHardware": ["array of 4-6 specific equipment items with specs"],
  "infrastructurePlan": "Specific cabling (Cat6 vs Single-mode Fiber), conduit routing, power backup UPS, and mounting strategy",
  "recommendedTier": "Recommended package name",
  "estimatedPriceRangePKR": "Realistic estimated price range in Pakistani Rupees, e.g. 'PKR 120,000 - 150,000'",
  "specialNotes": "Important technical precautions, storage retention days, Karachi 24-36hr SLA note if applicable",
  "recommendedStorageTB": 4,
  "cablingType": "Pure Copper Cat6 OR Armored Single-Mode Fiber Optic"
}`;

export default async ({ req, res, log, error }) => {
  try {
    const data = req.bodyJson ?? JSON.parse(req.body || '{}');
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return res.json({ success: false, useFallback: true, message: 'GROQ_API_KEY not configured' });
    }

    const userPrompt = `CUSTOMER SPECIFICATIONS:
- Service Category: ${data.serviceCategoryLabel || data.serviceCategory} (${data.serviceCategory})
- City / Location: ${data.city} (Note: Karachi has guaranteed 24-36hr service resolution)
- Property Type: ${data.propertyType}
- Size / Area / Points: ${data.estimatedAreaOrPoints}
- Scale / Camera Count needed: ${data.cameraCountOrScale}
- Indoor / Outdoor Split: ${data.indoorOutdoorRequirement}
- Target Budget Tier: ${data.budgetTier}
- Project Timeline: ${data.timeline}
- Customer Notes: ${data.additionalNotes || 'Standard installation requested'}`;

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' },
      }),
    });

    if (!groqRes.ok) {
      error(`Groq API error: ${groqRes.status}`);
      return res.json({ success: false, useFallback: true });
    }

    const groqJson = await groqRes.json();
    const text = groqJson?.choices?.[0]?.message?.content?.trim();
    if (!text) return res.json({ success: false, useFallback: true });

    const parsed = JSON.parse(text);
    return res.json({
      success: true,
      data: {
        summary: parsed.summary || 'Custom tailored surveillance architecture designed for your premises.',
        suggestedHardware: Array.isArray(parsed.suggestedHardware) ? parsed.suggestedHardware : [
          'HUAN 4K High Definition AI Cameras',
          'Central 4K AI NVR Recorder with Surveillance HDD',
          'Pure Copper Cat6 / Fiber Optic Link',
          'Surge Protected Power Infrastructure',
        ],
        infrastructurePlan: parsed.infrastructurePlan || 'Concealed PVC/GI conduit with isolated power line routing.',
        recommendedTier: parsed.recommendedTier || `${(data.budgetTier || 'pro').toUpperCase()} Surveillance Specification`,
        estimatedPriceRangePKR: parsed.estimatedPriceRangePKR || 'PKR 85,000 - 160,000 (Subject to site survey)',
        specialNotes: parsed.specialNotes || 'Includes full installation, mobile streaming app configuration, and Karachi 24-36hr service SLA.',
        recommendedStorageTB: parsed.recommendedStorageTB || 4,
        cablingType: parsed.cablingType || (data.serviceCategory === 'fiber-optic' ? 'Armored Single-Mode Optical Fiber' : 'Cat6 Pure Copper'),
      },
    });
  } catch (err) {
    error(err?.message || String(err));
    return res.json({ success: false, useFallback: true, error: err?.message || 'Groq error' });
  }
};
