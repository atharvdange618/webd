#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <SPIFFS.h>
#include <ArduinoJson.h>
#include <Arduino.h>

const char* ssid = "BangBros";
const char* password = "babdigang";

AsyncWebServer server(80);
File uploadFile;
static const size_t bufferSize = 1024; // Adjust the buffer size as needed
static uint8_t buffer[bufferSize];

void setup() {
  // Initialize the serial port
  Serial.begin(115200);

  // Connect to Wi-Fi
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

  //Handler for the /fetchFiles endpoint
  server.on("/fetchFiles", HTTP_GET, [](AsyncWebServerRequest * request) {
    // Open the root directory
    File root = SPIFFS.open("/");
    if (!root) {
      request->send(500, "text/plain", "Failed to open directory");
      return;
    }

    // Create a JSON array to store file information
    DynamicJsonDocument serverResponse(4096); // Adjust the size as per your needs
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
    request->send(response);
  });

  // Handle API requests to download files
  server.on("/download", HTTP_GET, [](AsyncWebServerRequest * request) {
    downloadFileOnWeb(request); // Pass the request object to the function
  });

  //Handler for the /file endpoint to read files
  server.on("/file", HTTP_GET, [](AsyncWebServerRequest * request) {
    // Get the filename from the query parameter
    String filename = request->arg("filename");

    // Create the full path to the file
    String fullPath = "/" + filename;

    // Open the file
    File file = SPIFFS.open(fullPath, "r");

    // Check if the file exists
    if (file) {
      // Read the file content
      String fileContent = file.readString();
      // Close the file
      file.close();
      // Send the file content as the response
      request->send(200, "text/plain", fileContent);
    } else {
      // Send a 404 error if the file does not exist
      request->send(404, "text/plain", "File Not Found: " + filename);
    }
  });

  // Handle API requests to delete files
  server.on("/delete", HTTP_GET, [](AsyncWebServerRequest * request) {
    String filename = request->arg("filename");
    if (SPIFFS.remove("/" + filename)) {
      request->send(200, "text/plain", "File Deleted: " + filename);
    } else {
      request->send(404, "text/plain", "File Not Found: " + filename);
    }
  });

  server.on("/upload", HTTP_POST, [](AsyncWebServerRequest * request) {
    // Check if the request has a file attached
    if (request->hasParam("file", true, true)) {
      AsyncWebParameter* file = request->getParam("file", true, true);
      String filename = "/" + file->value();
      // Handle file upload
      if (handleFileUpload(request, filename, 0, buffer, file->size(), true)) {
        request->send(200, "text/plain", "File uploaded successfully");
      } else {
        request->send(500, "text/plain", "Failed to upload file");
      }
    } else {
      request->send(400, "text/plain", "No file attached to the request");
    }
  });


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
  String filePath = "/" + request->arg("filepath");

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

bool handleFileUpload(AsyncWebServerRequest *request, String filename, size_t index, const uint8_t *data, size_t len, bool final) {
  static File uploadFile;

  // Check if this is the first chunk of the upload
  if (index == 0) {
    // Open a new file with the specified filename for writing
    uploadFile = SPIFFS.open(filename, "w");
    if (!uploadFile) {
      // Failed to open the file
      return false;
    }
  }

  // Write the current chunk of data to the file
  if (uploadFile.write(data, len) != len) {
    // Failed to write data to the file
    return false;
  }

  // Check if this is the final chunk of the upload
  if (final) {
    // Close the file
    uploadFile.close();
    return true; // Upload completed successfully
  }

  return true; // Continue uploading
}

void loop() {
  // Nothing to do here
}
