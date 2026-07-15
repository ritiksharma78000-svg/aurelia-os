import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'aurelia_db.json');

const readDatabase = (): any[] => {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
    return [];
  }
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8') || '[]');
  } catch (e) {
    return [];
  }
};

const writeDatabase = (data: any[]) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
};

export async function GET() {
  return NextResponse.json(readDatabase());
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const currentOrders = readDatabase();
    const { action, order, orderId, status, paymentMethod } = payload;

    if (action === 'CREATE') {
      currentOrders.push(order);
      writeDatabase(currentOrders);
      return NextResponse.json({ success: true, orders: currentOrders });
    }

    if (action === 'UPDATE_STATUS') {
      const updated = currentOrders.map((o) =>
        o.id === orderId ? { ...o, status, ...(paymentMethod ? { paymentMethod } : {}) } : o
      );
      writeDatabase(updated);
      return NextResponse.json({ success: true, orders: updated });
    }

    return NextResponse.json({ error: 'Mismatch action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
