```mermaid

sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes a note and clicks Save button

    Note right of browser: Browser executes event handler that prevents default form submission

    Note right of browser: Browser creates new note object with content and date

    Note right of browser: Browser adds note to notes array and rerenders the page

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note left of browser: Content-Type: application/json<br/>Payload: { "content": "...", "date": "..." }
    server-->>browser: 201 Created
    deactivate server

    Note right of browser: Browser stays on the same page, no redirect or reload needed