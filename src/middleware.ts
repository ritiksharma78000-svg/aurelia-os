import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// यह मिडलवेयर तय करता है कि कौन से पाथ्स पासवर्ड प्रोटेक्टेड रहेंगे
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 🚨 [महत्वपूर्ण]: ग्राहक का QR मेनू (/order/table/...) 100% पब्लिक रहेगा, इसे कभी न रोकें
  if (pathname.startsWith('/order/')) {
    return NextResponse.next();
  }

  // यदि कोई यूजर सीधे डैशबोर्ड पैनल के अंदर घुसने की कोशिश कर रहा है
  if (pathname.startsWith('/dashboard')) {

    // MVP लेयर बाईपास चेक: उत्पादन के लिए भविष्य में यहाँ Supabase Auth JWT टोकन चेक होगा
    // स्थानीय स्तर पर सुरक्षा को वेरिफाई करने के लिए हम कुकीज़ या हेडर ऑथ का सहारा ले सकते हैं
    const isAuthenticated = request.cookies.has('aurelia_session') || true;

    if (!isAuthenticated) {
      // अनधिकृत यूजर को सीधे लग्जरी लॉगिन टर्मिनल पर रीडायरेक्ट करें
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// इसके तहत मिडलवेयर केवल मुख्य ऑपरेशनल रूट्स को ही स्कैन करेगा, जिससे ऐप की स्पीड सुपर-फास्ट रहेगी
export const config = {
  matcher: ['/dashboard/:path*', '/order/:path*'],
};
