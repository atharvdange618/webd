#include <Arduino.h>
#include <SPIFFS.h>
#include <WiFi.h>
#include <WebServer.h>

const char* ssid = "BangBros";   // Replace with your Wi-Fi SSID
const char* password = "babdigang"; // Replace with your Wi-Fi password

WebServer server(80);

void listFilesOnWeb() {
    String fileList = "[";
    File root = SPIFFS.open("/");
    File file = root.openNextFile();

    while (file) {
        fileList += "\"" + String(file.name()) + "\",";
        file = root.openNextFile();
    }

    fileList.remove(fileList.length() - 1); // Remove the trailing comma
    fileList += "]";
    server.send(200, "application/json", fileList);
}

void downloadFileOnWeb() {
    String filePath = "/" + server.arg("filepath");
    File file = SPIFFS.open(filePath, "r");

    if (file) {
        server.streamFile(file, "application/octet-stream");
        file.close();
    } else {
        server.send(404, "text/plain", "File Not Found: " + filePath);
    }
}

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

    // Serve HTML and handle API requests
    server.on("/", HTTP_GET, []() {
        File htmlFile = SPIFFS.open("/download.html", "r");
        server.streamFile(htmlFile, "text/html");
        htmlFile.close();
    });

    server.on("/list", HTTP_GET, listFilesOnWeb);
    server.on("/download", HTTP_GET, downloadFileOnWeb);

    server.begin();
    Serial.print("HTTP server started at http://");
    Serial.println(WiFi.localIP());
}

void loop() {
    server.handleClient();
}
