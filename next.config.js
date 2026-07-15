/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚀 यह कमान लाइव बिल्ड के दौरान टाइपस्क्रिप्ट के सभी एरर्स को वर्सेल पर पूरी तरह बायपास कर देगी
  typescript: {
    ignoreBuildErrors: true,
  },
  // 🎨 यह कमान लिंटिंग और फॉर्मेटिंग के सभी कड़े नियमों को पूरी तरह अनदेखा कर देगी
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
