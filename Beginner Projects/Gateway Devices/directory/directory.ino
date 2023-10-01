#include <WiFi.h>
#include <SPIFFS.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>

// WiFi settings
const char *ssid = "BangBros";
const char *password = "babdigang";

// Create an AsyncWebServer object
AsyncWebServer server(80);
StaticJsonDocument<1024> serverResponse; // Create a JSON document to store the server response

void setup()
{
  // Initialize the serial port
  Serial.begin(115200);

  // Connect to the WiFi network
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.print("HTTP server started at http://");
  Serial.println(WiFi.localIP()); // Print the server's IP address

  // Mount the SPIFFS file system
  if (!SPIFFS.begin(true))
  {
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }

  // Serve the HTML page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request)
            {
    // Open the HTML file
    File htmlFile = SPIFFS.open("/web/directory.html");
    if (!htmlFile) {
      request->send(500, "text/plain", "Failed to open HTML file");
      return;
    }
    // Read the HTML file
    String htmlContent = htmlFile.readString();
    request->send(200, "text/html", htmlContent); });

  // Serve the CSS file
  server.on("/style.css", HTTP_GET, [](AsyncWebServerRequest *request)
            {
      // Open the CSS file
      File styleFile = SPIFFS.open("/web/style.css", "r");
      if (!styleFile) {
        request->send(404, "text/plain", "CSS file not found");
        return;
      }
      // Read the CSS file
      request->send(styleFile, "text/css"); });

  // Create a handler for the /fetchFiles endpoint
  server.on("/fetchFiles", HTTP_GET, [](AsyncWebServerRequest *request)
            {
      // Open the root directory
      File root = SPIFFS.open("/");
      if (!root) {
        request->send(500, "text/plain", "Failed to open directory");
        return;
      }

      // Create a JSON array to store file information
      JsonArray fileArray = serverResponse.createNestedArray("files");

      // Read each file in the directory
      File file = root.openNextFile();
      while (file) {
        // Encode the file name to prevent JSON parsing issues
        String encodedName = file.name();
        encodedName.replace("\"", "\\\"");
        // Create a JSON object for each file
        JsonObject fileObject = fileArray.createNestedObject();
        fileObject["name"] = encodedName;
        fileObject["size"] = file.size();

        file = root.openNextFile();
      }

      // Send the JSON response
      AsyncResponseStream *response = request->beginResponseStream("application/json");
      serializeJson(serverResponse, *response);
      request->send(response); });

  // Start the server
  server.begin();
}

void loop()
{
  // You can add other code here if needed
}