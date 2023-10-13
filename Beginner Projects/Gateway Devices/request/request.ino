#include <Arduino.h>
#include <SPIFFS.h>
#include <WiFi.h>
#include <WebServer.h>

const char *ssid = "BangBros";      // Replace with your Wi-Fi SSID
const char *password = "babdigang"; // Replace with your Wi-Fi password

WebServer server(80);

void setup()
{
  // Initialize the serial port
  Serial.begin(115200);
  // Initialize the SPIFFS filesystem
  SPIFFS.begin();

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  // Wait until the connection is established
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.print("HTTP server started at http://");
  Serial.println(WiFi.localIP());

  // Route for the default page (request.html)
  server.on("/", HTTP_GET, []()
            {
    // Open and send the HTML file as the response
    File file = SPIFFS.open("/request.html", "r");
    if (file) {
      server.streamFile(file, "text/html");
      file.close();
    } else {
      server.send(404, "text/plain", "File Not Found");
    } });

  // Route for the file request page
  server.on("/file", HTTP_GET, []()
            {
    // Get the file path from the URL
    String filePath = server.arg("filename");

    // Call the function to read the file
    readFileOnSerial(filePath); });

  // Start the server
  server.begin();
}

void loop()
{
// code
}

void readFileOnSerial(const String &filePath)
{
  // Create the full path to the file
  String fullPath = "/" + filePath; // Add leading slash to the file path

  // Open the file
  File file = SPIFFS.open(fullPath, "r");

  // Check if the file exists
  if (file)
  {
    // Create a string to store the file content
    String fileContent = "";
    // Read the file content
    while (file.available())
    {
      // Append the content to the string
      fileContent += (char)file.read();
    }
    // Close the file
    file.close();

    // Send the file content as the response to the client
    server.send(200, "text/plain", fileContent);
  }
  else
  {
    // Send a 404 error if the file does not exist
    server.send(404, "text/plain", "File Not Found: " + fullPath);
  }
}
