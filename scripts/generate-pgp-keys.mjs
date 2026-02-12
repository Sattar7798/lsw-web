import * as openpgp from 'openpgp';
import fs from 'fs';

async function generateKeys() {
    console.log('Generating PGP Keys (ECC Curve 25519)...');

    const { privateKey, publicKey } = await openpgp.generateKey({
        type: 'ecc', // Elliptic Curve (faster and smaller keys than RSA)
        curve: 'curve25519',
        userIDs: [{ name: 'Lion & Sun Admin', email: 'admin@lionandsun.com' }],
        format: 'armored'
    });

    console.log('\n---------------------------------------------------');
    console.log('✅ KEYS GENERATED SUCCESSFULLY');
    console.log('---------------------------------------------------\n');

    console.log('🔴 PRIVATE KEY (SAVE THIS SAFE & SECRET!):');
    console.log(privateKey);
    console.log('\n---------------------------------------------------\n');

    console.log('🟢 PUBLIC KEY (Use this in your app):');
    console.log(publicKey);
    console.log('\n---------------------------------------------------');

    // Save public key to public dir
    fs.writeFileSync('public/encryption_key.pub', publicKey);
    console.log('✅ Public key saved to: public/encryption_key.pub');

    // Save private key to a local file (gitignored preferably, but for now just local)
    fs.writeFileSync('admin_private_key.pem', privateKey);
    console.log('⚠️ Private key saved to: admin_private_key.pem (DO NOT SHARE/COMMIT THIS)');
}

generateKeys().catch(console.error);
