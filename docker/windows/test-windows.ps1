Set-DnsClientServerAddress -InterfaceIndex 4 -ServerAddresses ("8.8.8.8")

# This triggers the build
npm install

# This runs the test
npm run test
