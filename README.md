# Road map building

## Requirements

- Exists a Team
- Exists a Users
- Exists a Sprints
- Exists a Topic
- Exists one or more owner of Team
- A Team can grouper a or more users
- A owner can be invite more users for own Team
- A topic is any generic for vote
- Users can be votes in topics

## Entities

### Team

- id
- name

### User

- id
- name
- email
- password

### Sprint

- id
- name
- date_init
- date_end

### Sprint-Topic

- sprint_id
- topic_id

### Sprint-Team

- sprint_id
- team_id

### Topic

- id
- name
- description
- point
- team_id

### Team-User

- team_id
- user_id
- is_owner

### Team-Invites

- team_id
- who_invite
- expires
- secret_invite

### Session (Planning Poker)

- id
- name
- expires

### Session-Topic

- id
- topic_id
- session_id
