#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <SPIFFS.h>
#include <ArduinoJson.h>
#include <Arduino.h>
#include <ESPmDNS.h> // Include the mDNS library

const char* ssid = "BangBros";
const char* password = "babdigang";

AsyncWebServer server(80);
File uploadFile;
static const size_t bufferSize = 1024;
static uint8_t buffer[bufferSize];

void setup() {
  Serial.begin(115200);

  // Configure mDNS with a specific hostname
  if (!MDNS.begin("babdigangserver")) {
    Serial.println("Error setting up mDNS");
  }
  Serial.println("mDNS responder started");

  // Set the fixed IP address
  IPAddress staticIP(192, 168, 1, 100); // Your desired IP address
  IPAddress gateway(192, 168, 1, 1);    // Your router's IP address
  IPAddress subnet(255, 255, 255, 0);   // Subnet mask

  WiFi.config(staticIP, gateway, subnet);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Initialize SPIFFS
  if (!SPIFFS.begin()) {
    Serial.println("Failed to mount SPIFFS");
    return;
  }

  // Serve HTML pages
  server.on("/", HTTP_GET, [](AsyncWebServerRequest * request) {
    servePage(request, "/web/login.html");
  });

  server.on("/index.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    servePage(request, "/web/index.html");
  });

  server.on("/download.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    servePage(request, "/web/download.html");
  });

  server.on("/upload.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    servePage(request, "/web/upload.html");
  });

  server.on("/request.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    servePage(request, "/web/request.html");
  });

  server.on("/delete.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    servePage(request, "/web/delete.html");
  });

  server.on("/directory.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    servePage(request, "/web/directory.html");
  });

  server.on("/login.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    servePage(request, "/web/login.html");
  });

  // Handler for the /fetchFiles endpoint
  server.on("/fetchFiles", HTTP_GET, [](AsyncWebServerRequest * request) {
    // Open the specific folder (files)
    File folder = SPIFFS.open("/files");
    if (!folder) {
      request->send(500, "text/plain", "Failed to open the folder");
      return;
    }

    // Create a JSON array to store file information
    DynamicJsonDocument serverResponse(4096); // Adjust the size as needed
    JsonArray fileArray = serverResponse.createNestedArray("files");

    // Read each file in the folder
    File file = folder.openNextFile();
    while (file) {
      // Encode the file name to prevent JSON parsing issues
      String encodedName = file.name();
      encodedName.replace("\"", "\\\"");

      // Create a JSON object for each file
      JsonObject fileObject = fileArray.createNestedObject();
      fileObject["name"] = encodedName;
      fileObject["size"] = file.size();

      file = folder.openNextFile();
    }

    // Send the JSON response
    AsyncResponseStream *response = request->beginResponseStream("application/json");
    serializeJson(serverResponse, *response);
    request->send(response);
  });

  // Handle API requests to download files
  server.on("/download", HTTP_GET, [](AsyncWebServerRequest * request) {
    downloadFileOnWeb(request); // Pass the request object to the function
  });

  // Handler for the /file endpoint to read files
  server.on("/file", HTTP_GET, [](AsyncWebServerRequest * request) {
    // Get the filename from the query parameter
    String filename = request->arg("filename");

    // Create the full path to the file inside the "files" folder
    String fullPath = "/files/" + filename;

    // Open the file
    File file = SPIFFS.open(fullPath, "r");

    // Check if the file exists
    if (file) {
      // Create a response with the file content
      AsyncWebServerResponse *response = request->beginResponse(SPIFFS, fullPath, "application/octet-stream");
      // Send the response
      request->send(response);
    } else {
      // Send a 404 error if the file does not exist
      request->send(404, "text/plain", "File Not Found: " + filename);
    }
  });

  // Handle API requests to delete files
  server.on("/delete", HTTP_GET, [](AsyncWebServerRequest * request) {
    String filename = request->arg("filename");
    if (SPIFFS.remove("/files/" + filename)) {
      request->send(200, "text/plain", "File Deleted: " + filename);
    } else {
      request->send(404, "text/plain", "File Not Found: " + filename);
    }
  });

  // Handle API requests to upload files
  server.on("/upload.html", HTTP_GET, [](AsyncWebServerRequest * request) {
    request->send(SPIFFS, "/upload.html");
  });

  server.on("/fupload", HTTP_POST, [](AsyncWebServerRequest * request) {
    request->send(200);
  }, handleUpload);


  // Start the web server
  server.begin();
  // Print the URL of the web server
  Serial.print("HTTP server started at http://");
  Serial.println(WiFi.localIP());
}

void servePage(AsyncWebServerRequest *request, String path) {
  // Open the file
  File file = SPIFFS.open(path, "r");
  // Check if the file exists
  if (file) {
    // Send the file as the response
    request->send(200, "text/html", file.readString());
    // Close the file
    file.close();
  } else {
    // Send a 404 response
    request->send(404, "text/plain", "File not found");
  }
}

void downloadFileOnWeb(AsyncWebServerRequest *request)
{
  // Get the file path from the URL query string
  String filePath = "/files/" + request->arg("filepath");

  // Open the file for reading
  File file = SPIFFS.open(filePath, "r");

  // If the file exists
  if (file)
  {
    // Send the file as a response
    request->send(SPIFFS, filePath, "application/octet-stream");
    // Close the file
    file.close();
  }
  // If the file doesn't exist
  else
  {
    // Send a 404 response
    request->send(404, "text/plain", "File Not Found: " + filePath);
  }
}

// Define the custom function to handle file uploads
void handleUpload(AsyncWebServerRequest *request, String filename, size_t index, uint8_t *data, size_t len, bool final) {
  File f;
  if (!index) {
    Serial.println("Received file:");
    Serial.println(filename);
    f = SPIFFS.open("/files/" + filename, FILE_WRITE); // Save the file to the "files" folder
  }

  if (!f) {
    f = SPIFFS.open("/files/" + filename, FILE_APPEND); // Append to the file in the "files" folder
  }

  if (!f) {
    Serial.println("Failed to create file");
    return;
  }

  for (size_t i = 0; i < len; i++) {
    f.write(data[i]);
  }

  if (final) {
    int bytes = f.size();

    String fsize = "";
    if (bytes < 1024)
      fsize = String(bytes) + " B";
    else if (bytes < (1024 * 1024))
      fsize = String(bytes / 1024.0, 3) + " KB";
    else if (bytes < (1024 * 1024 * 1024))
      fsize = String(bytes / 1024.0 / 1024.0, 3) + " MB";
    else
      fsize = String(bytes / 1024.0 / 1024.0 / 1024.0, 3) + " GB";

    Serial.println((String)filename + " uploaded of size " + fsize);

    request->send(200, "text/plain", "File uploaded successfully");

    request->redirect("/directory.html");
  }
  f.close();
}

void loop() {
  // Nothing to do here
}
