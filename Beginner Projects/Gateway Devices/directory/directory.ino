#include <WiFi.h>
#include <SPIFFS.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h> // Include the ArduinoJson library

const char* ssid = "BangBros";
const char* password = "babdigang";

AsyncWebServer server(80);
StaticJsonDocument<1024> serverResponse; // Create a JSON document to store the server response

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.print("HTTP server started at http://");
  Serial.println(WiFi.localIP()); // Print the server's IP address

  if (!SPIFFS.begin(true)) {
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }

  // Serve the HTML page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest * request) {
    File htmlFile = SPIFFS.open("/web/directory.html");
    if (!htmlFile) {
      request->send(500, "text/plain", "Failed to open HTML file");
      return;
    }
    String htmlContent = htmlFile.readString();
    request->send(200, "text/html", htmlContent);
  });

  // Serve the CSS file
  server.on("/style.css", HTTP_GET, [](AsyncWebServerRequest *request){
    File styleFile = SPIFFS.open("/web/style.css", "r");
    if (!styleFile) {
      request->send(404, "text/plain", "CSS file not found");
      return;
    }
    request->send(styleFile, "text/css");
  });

  server.on("/fetchFiles", HTTP_GET, [](AsyncWebServerRequest * request) {
    File root = SPIFFS.open("/");
    if (!root) {
      request->send(500, "text/plain", "Failed to open directory");
      return;
    }

    // Create a JSON array to store file information
    JsonArray fileArray = serverResponse.createNestedArray("files");

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
    request->send(response);
  });

  server.begin();
}

void loop() {
  // You can add other code here if needed
}
