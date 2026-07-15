import { NextResponse } from 'next/server';
import { ThermalPrinter, PrinterTypes, CharacterSet } from 'node-thermal-printer';

export async function POST(request: Request) {
  try {
    const orderData = await request.json();

    // 🖨️ KOT थर्मल प्रिंटर कॉन्फ़िगरेशन इंजन
    const printer = new ThermalPrinter({
      type: PrinterTypes.EPSON,
      interface: 'tcp://192.168.1.100',                 // 👈 यहाँ अपनी किचन KOT मशीन का असली IP एड्रेस डालें
      characterSet: CharacterSet.PC852_LATIN2,
      removeSpecialCharacters: false,
      lineCharacter: "=",
      width: 48
    });

    // 📋 रीयल-टाइम KOT पर्ची लेआउट जनरेशन
    printer.alignCenter();
    printer.bold(true);
    printer.setTextSize(2, 2);
    printer.println("=== AUTOMATIC KOT ===");
    printer.setTextSize(1, 1);
    printer.println(`KOT ID: #KOT-${orderData.id || Math.floor(1000 + Math.random() * 9000)}`);
    printer.println(`Table/Type: ${orderData.type || 'Lounge Seating'}`);
    printer.println(`Time: ${new Date().toLocaleTimeString()}`);
    printer.bold(false);
    printer.drawLine();

    // 🍽️ ऑर्डर की गई डिशेज को पर्ची पर प्रिंट करना
    printer.alignLeft();
    printer.bold(true);
    printer.println("QTY   ITEM NAME");
    printer.bold(false);
    printer.drawLine();

    // सुपाबेस या फ्रंटएंड से आ रहे डिशेज के डेटा को लूप करना
    if (orderData.items && orderData.items.length > 0) {
      orderData.items.forEach((item: any) => {
        printer.println(`${item.quantity.toString().padEnd(5)}${item.name}`);
      });
    } else if (orderData.customer_name) {
      // यदि टेबल बुकिंग है तो कस्टमर की जानकारी प्रिंट होगी
      printer.println(`1x   Reservation Allocation Suite`);
      printer.println(`For: ${orderData.customer_name}`);
      printer.println(`Guests: ${orderData.guest_count || 2} Seats`);
    } else {
      printer.println("1x   Live Live Order Sync Dispatched");
    }

    printer.drawLine();
    printer.alignCenter();
    printer.bold(true);
    printer.println("* RESTAURANT OS SECURE SYNC *");
    printer.cut();

    // 🚀 प्रिंटर को लाइव कमांड एक्जीक्यूट करना
    await printer.execute();
    return NextResponse.json({ success: true, message: "KOT Sent to Kitchen Printer successfully!" });

  } catch (error: any) {
    console.error("Printer Hardware Error:", error);
    return NextResponse.json({ success: false, error: "Printer Offline or IP Mismatch" }, { status: 500 });
  }
}
