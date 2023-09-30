#include <Arduino.h>
#include <SPIFFS.h>
#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "BangBros";   // Replace with your Wi-Fi SSID
const char* password = "babdigang"; // Replace with your Wi-Fi password

WebServer server(80);

void listFilesOnSerial();
void downloadFileOnSerial(const String& filePath);
void processSerialCommand();

void setup() {
  Serial.begin(115200);
  SPIFFS.begin();

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  Serial.print("HTTP server started at http://");
  Serial.println(WiFi.localIP());

  // Route for the default page (file_download.html)
  server.on("/", HTTP_GET, []() {
    // Open and send the HTML file as the response
    File file = SPIFFS.open("/request.html", "r");
    if (file) {
      server.streamFile(file, "text/html");
      file.close();
    } else {
      server.send(404, "text/plain", "File Not Found");
    }
  });

  // Route for the file download page
  server.on("/file", HTTP_GET, []() {
    String filePath = server.arg("filename");
    downloadFileOnSerial(filePath);
  });

  server.begin();
}

void loop() {
  server.handleClient();

  // Check for serial commands
  if (Serial.available() > 0) {
    processSerialCommand();
  }
}

void listFilesOnSerial() {
  File root = SPIFFS.open("/");

  File file = root.openNextFile();
  while (file) {
    Serial.println(file.name());
    file = root.openNextFile();
  }
}

void downloadFileOnSerial(const String& filePath) {
  String fullPath = "/" + filePath; // Add leading slash to the file path

  File file = SPIFFS.open(fullPath, "r");

  if (file) {
    String fileContent = "";
    while (file.available()) {
      fileContent += (char)file.read();
    }
    file.close();

    // Send the file content as the response to the client
    server.send(200, "text/plain", fileContent);
  } else {
    server.send(404, "text/plain", "File Not Found: " + fullPath);
  }
}

void processSerialCommand() {
  String command = Serial.readStringUntil('\n');
  command.trim(); // Remove leading/trailing whitespace

  if (command == "list") {
    listFilesOnSerial();
  } else if (command.startsWith("download ")) {
    String filePath = command.substring(9); // Remove "download "
    downloadFileOnSerial(filePath);
  } else {
    Serial.println("Invalid command. Available commands: list, download <filename>");
  }
}
