const AdmZip = require("adm-zip");
const zip = new AdmZip();

zip.addLocalFolder("./"); // Add all files from project
zip.writeZip("loves-me-loves-me-not-app.zip"); // Output file

console.log("✅ Project zipped successfully!");