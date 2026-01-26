sequenceDiagram
    participant browser
    participant server

    Note right of browser: User types a new note into the input field
    Note right of browser: User clicks the Save button

    browser->>browser: JavaScript intercepts form submit event
    Note right of browser: Prevent default page reload

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of server: Server saves the new note
    server-->>browser: JSON response with saved note
    deactivate server

    Note right of browser: Browser updates notes list in the DOM without reloading page
