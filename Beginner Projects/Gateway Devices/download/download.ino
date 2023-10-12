#include <Arduino.h>
#include <SPIFFS.h>
#include <WiFi.h>
#include <WebServer.h>

const char *ssid = "BangBros";      // Replace with your Wi-Fi SSID
const char *password = "babdigang"; // Replace with your Wi-Fi password

WebServer server(80);

void downloadFileOnWeb()
{
    // Get the file path from the URL query string
    String filePath = "/" + server.arg("filepath");
    // Open the file for reading
    File file = SPIFFS.open(filePath, "r");

    // If the file exists
    if (file)
    {
        // Send the file as a response
        server.streamFile(file, "application/octet-stream");
        // Close the file
        file.close();
    }
    // If the file doesn't exist
    else
    {
        // Send a 404 response
        server.send(404, "text/plain", "File Not Found: " + filePath);
    }
}

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
        // Delay 1 second to avoid a flood of messages
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");

    // Serve HTML and handle API requests
    // Serve the HTML page for downloading files
    server.on("/", HTTP_GET, []()
            {
        // Open the HTML file for reading
        File htmlFile = SPIFFS.open("/download.html", "r");
        // Send the HTML file as a response
        server.streamFile(htmlFile, "text/html");
        // Close the HTML file
        htmlFile.close(); });

    // Handle API requests to list files
    server.on("/list", HTTP_GET, listFilesOnWeb);
    // Handle API requests to download files
    server.on("/download", HTTP_GET, downloadFileOnWeb);

    // Start the web server
    server.begin();
    // Print the URL of the web server
    Serial.print("HTTP server started at http://");
    Serial.println(WiFi.localIP());
}

void loop()
{
    // Handle any incoming client requests
    server.handleClient();
}