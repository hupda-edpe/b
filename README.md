# Bonita

this project provides interaction between Bonita BPM and Unicorn

### components

- UBM ("Unicorn Bonita Middleware") - receives notifications sent by Unicorn, saves them in a DB and provides these notifications via REST API; installation instructions can be found in the readme inside the UBM folder
- Connectors: 2 Connectors that can be imported into the Bonita BPM Studio - attach them to activties and cofigure them to either send events to Unicorn or fetch query notifications created by Unicorn and sent to UBM

    PostEvent-impl-1.0.0.zip - connector to send events to Unicorn
    
    ReactOnEvent-impl-1.0.0.zip - connector to poll query notifications from UBM

# Connectors

both connectors were created with Bonita BPM Studio 7.2.3

### import

open Bonita Studio and got to "Development" menu -> "Connectors" -> "import connector" and choose the zip files

