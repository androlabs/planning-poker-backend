# Road map building

## Requirements

- Exists a session
- Exists a peoples
- Exists a owner of session
- A session can grouper a or more peoples
- In session exists a owner session
- A owner can be invite more peoples for own session
- A topic is any generic for vote
- Peoples can be votes in topics

## Entities

### Session

- id
- name

### People

- id
- name

### Session-People

- session_id
- people_id
- is_owner

### Session-Invites

- session_id
- who_invite
- expires
- secret_invite
