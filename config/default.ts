export default {
  port: 4000,
  host: 'localhost',
  origin: 'http://localhost:3000',
  dbUri: 'YOUR DATABASE URI',
  saltWorkFactor: 10,
  accessTokenTtl: '15m',
  refreshTokenTtl: '1y',
  accessTokenPrivateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCQCphIFOSTsVAJ0s+IrxwFhoj5CXKT/Z+vc/vKncTh5J8/MZLk
KTFaLTH44DAbze75IGi62xDw5ptmMaQtztqjhdfmpeXxXQODq4cfW3+m4ueM9iQh
MN9q/p2UhJd7iOM4OdNpV2GNsG+uFnLttHZTP654dDfrz/iX2iARHoL2dQIDAQAB
AoGAaqYtklFF3MTQSjW4S6+7w6uVBy8jksea0EHEEIU4HTk1X4jJBf4p+Ga2NVto
w216nyKL6K4CoRtdvBDNSs15u7TOCZc56+NZD6ZU6Vic/wlW1bgC2tXTBl1PWQf+
bSzmzEProaKlA/yIA2v7s2QQBdqUJWCZca+F1rPEzLKCYhECQQDJq4vMbLXrLz1W
HUkxKg95dFTDPnvOaFYiXAdGNs9TbKAcUUuhFevIBiw73xlXor/ag4nwTuoft4fE
PyTvc+7vAkEAttibDyQWIL8ihm7BWYzndtcwcGNXYm8quKV2PrJww+3yRhxkP02P
Xw2P2FhdXUBqKtmER29xBcl163xCTwNw2wJBAJiKJBT9CWEZ+zf+sNT6Lng8kLyZ
r4XBj50vpOTsIkfEuxqQNzdh4FUMrjqfFokd9iXvJs/YsOhKpuu+o05nj4sCQC5Y
Gn0s9VrZd0PBoMo015ocks95rnVpnddtQNpFWiWfEvBIU/RjkTpTcqkwRIHVSNOR
jGCa03fXB0dnmFr0kU8CQQCuribTPFzLfhl1+35CgHOXxwEO+4T986mi1JM73u5W
SqDIWvjSQ6/ZbRywZ9ptPw+qRUW14iemI18SZzHQat9K
-----END RSA PRIVATE KEY-----`,
  accesTokenPublicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCQCphIFOSTsVAJ0s+IrxwFhoj5
CXKT/Z+vc/vKncTh5J8/MZLkKTFaLTH44DAbze75IGi62xDw5ptmMaQtztqjhdfm
peXxXQODq4cfW3+m4ueM9iQhMN9q/p2UhJd7iOM4OdNpV2GNsG+uFnLttHZTP654
dDfrz/iX2iARHoL2dQIDAQAB
-----END PUBLIC KEY-----§`,
  refreshTokenPrivateKey: '',
  refreshTokenPublicKey: '',
}
