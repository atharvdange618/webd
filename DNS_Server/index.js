//require dgram package for creating udp server
const dgram = require('node:dgram')
const dnsPacket = require('dns-packet')
const { type } = require('node:os')

//create server using udp types
const server = dgram.createSocket('udp4')

const db = {
    'atharvdange.dev': {
        type: 'A',
        data: '1.2.3.4'
    },
    'blog.atharvdange.dev': {
        type: 'CNAME',
        data: 'hashnode.network'
    }

}

server.on('message', (msg, rinfo) => {
    const incomingReq = dnsPacket.decode(msg)
    const ipFromDb = db[incomingReq.questions[0].name]

    const ans = dnsPacket.encode({
        type: 'response',
        id: incomingReq.id,
        flags: dnsPacket.AUTHORITATIVE_ANSWER,
        questions: incomingReq.questions,
        answers: [{
            type: ipFromDb.type,
            class: 'IN',
            name: incomingReq.questions[0].name,
            db: ipFromDb.data
        }]
    })

    server.send(ans, rinfo.port, rinfo.address)

    console.log({
        msg: incomingReq.questions,
        rinfo
    })
})

server.bind(53, () => {
    console.log('DNS server is running on port 53')
})