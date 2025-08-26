const net = require('net');

class TestClient {
  constructor(port = 3000) {
    this.port = port;
    this.socket = new net.Socket();
    this.setupSocket();
  }

  setupSocket() {
    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.sendInitialMessage();
    });

    this.socket.on('data', (data) => {
      try {
        const size = data.readUInt32LE(0);
        const id = data.readUInt16LE(4);
        console.log(`Received message - ID: ${id}, Size: ${size}`);
        
        // Eğer Information mesajı ise, tekrar gönder
        if (id === 27968) {
          setTimeout(() => {
            this.sendInitialMessage();
          }, 1000);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });

    this.socket.on('close', () => {
      console.log('Connection closed');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  connect() {
    this.socket.connect(this.port, '127.0.0.1');
  }

  sendInitialMessage() {
    // Information mesajı oluştur (GClass250 - ID: 27968)
    const buffer = Buffer.alloc(256);
    let offset = 0;

    // Version (4x int32)
    buffer.writeInt32LE(1, offset); offset += 4;
    buffer.writeInt32LE(2, offset); offset += 4;
    buffer.writeInt32LE(0, offset); offset += 4;
    buffer.writeInt32LE(3, offset); offset += 4;

    // Unknown (int64)
    buffer.writeBigInt64LE(BigInt(0), offset); offset += 8;

    // Password (string)
    buffer.writeUInt8(0, offset); offset += 1; // empty string

    // CPU (string)
    const cpu = 'Test CPU';
    buffer.writeUInt8(cpu.length, offset); offset += 1;
    buffer.write(cpu, offset); offset += cpu.length;

    // GPU (string)
    const gpu = 'Test GPU';
    buffer.writeUInt8(gpu.length, offset); offset += 1;
    buffer.write(gpu, offset); offset += gpu.length;

    // RAM (int32)
    buffer.writeInt32LE(8192, offset); offset += 4;

    // Software (string)
    const software = 'Test Software';
    buffer.writeUInt8(software.length, offset); offset += 1;
    buffer.write(software, offset); offset += software.length;

    // MAC (string)
    const mac = '00:00:00:00:00:00';
    buffer.writeUInt8(mac.length, offset); offset += 1;
    buffer.write(mac, offset); offset += mac.length;

    // Entry (int32) - Oyuncu pozisyonu (1-22)
    buffer.writeInt32LE(1, offset); offset += 4;

    // Session (string)
    const session = 'test-session';
    buffer.writeUInt8(session.length, offset); offset += 1;
    buffer.write(session, offset); offset += session.length;

    // Autorun (boolean)
    buffer.writeUInt8(0, offset); offset += 1;

    // Header oluştur
    const header = Buffer.alloc(6);
    header.writeUInt32LE(offset + 2, 0); // size
    header.writeUInt16LE(27968, 4); // message id

    const finalBuffer = Buffer.concat([header, buffer.subarray(0, offset)]);
    
    console.log('Sending initial message, size:', finalBuffer.length);
    this.socket.write(finalBuffer);
  }

  sendMovement(x, y, sprint = false) {
    // GClass237 - Movement message
    const buffer = Buffer.alloc(32);
    let offset = 0;

    // Velocity as floatVector2 (degrees)
    const angle = Math.atan2(y, x);
    buffer.writeFloatLE(angle * 180.0 / Math.PI, offset); offset += 4;

    // Sprint
    buffer.writeUInt8(sprint ? 1 : 0, offset); offset += 1;

    // Header
    const header = Buffer.alloc(6);
    header.writeUInt32LE(offset + 2, 0);
    header.writeUInt16LE(42398, 4); // GClass237 ID

    const finalBuffer = Buffer.concat([header, buffer.subarray(0, offset)]);
    this.socket.write(finalBuffer);
  }

  sendStop() {
    // GClass260 - Stop message
    const header = Buffer.alloc(6);
    header.writeUInt32LE(2, 0); // only header size
    header.writeUInt16LE(10804, 4); // GClass260 ID

    this.socket.write(header);
  }

  disconnect() {
    this.socket.destroy();
  }
}

// Test client'ı başlat
const client = new TestClient();
client.connect();

// Test hareketleri
setTimeout(() => {
  console.log('Sending movement commands...');
  client.sendMovement(1, 0); // Sağa hareket
}, 3000);

setTimeout(() => {
  client.sendMovement(0, 1); // Yukarı hareket
}, 5000);

setTimeout(() => {
  client.sendStop(); // Dur
}, 7000);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down...');
  client.disconnect();
  process.exit(0);
});