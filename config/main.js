module.exports = {
  secret: "super secret passphrase",
  database: process.env.MONGOLAB_URI || "mongodb://localhost:27017/voting-plex",
  port: process.env.PORT || 3001
};
