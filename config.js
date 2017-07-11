const isProduction = (process.env.NODE_ENV === 'production');

module.exports = {
    port: isProduction ? process.env.PORT: 3000,
    database: isProduction ? 'mongodb://elisal:pdnlxx021@ds151662.mlab.com:51662/build-a-voting-app' :  'mongodb://'+process.env.testuser+':'+process.env.testpass+'@ds153699.mlab.com:53699/justtest'
};


