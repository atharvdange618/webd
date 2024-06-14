const dgram = require('node:dgram');
const dnsPacket = require('dns-packet');

// Create server using udp types
const server = dgram.createSocket('udp4');

const db = {
    'atharvdange.dev': {
        type: 'A',
        data: '1.2.3.4'
    },
    'blog.atharvdange.dev': {
        type: 'CNAME',
        data: 'hashnode.network'
    }
};

server.on('message', (msg, rinfo) => {
    const incomingReq = dnsPacket.decode(msg);
    const ipFromDb = db[incomingReq.questions[0].name];

    if (ipFromDb) {
        const ans = dnsPacket.encode({
            type: 'response',
            id: incomingReq.id,
            flags: dnsPacket.AUTHORITATIVE_ANSWER,
            questions: incomingReq.questions,
            answers: [{
                type: ipFromDb.type,
                class: 'IN',
                name: incomingReq.questions[0].name,
                data: ipFromDb.data
            }]
        });

        server.send(ans, rinfo.port, rinfo.address);

        console.log({
            msg: incomingReq.questions,
            rinfo
        });
    } else {
        console.log('Domain not found in DB:', incomingReq.questions[0].name);
    }
});

server.on('error', (err) => {
    console.error('Server error:', err);
    server.close();
});

server.bind(53, () => {
    console.log('DNS server is running on port 53');
});
