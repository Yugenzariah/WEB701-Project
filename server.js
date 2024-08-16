/* User Routes */
GET /api/users
// RESPONSE EXAMPLE:
[
    {
      "id": "user123",
      "name": "Emma Johnson",
      "email": "emma@example.com",
      "role": "participant"
    },
    {
      "id": "user124",
      "name": "Sarah Smith",
      "email": "sarah@example.com",
      "role": "mentor"
    }
  ]  

POST /api/users
// RESPONSE EXAMPLE:
[
{
    "name": "James Brown",
    "email": "james@example.com",
    "password": "securePassword",
    "role": "coordinator"
  }  
]

GET /api/users/{id}
// RESPONSE EXAMPLE:
[
    {
        "id": "user125",
        "name": "James Brown",
        "email": "james@example.com",
        "role": "coordinator"
      }      
]

PUT /api/users/{id}

DELETE /api/users/{id}

/* Program Routes */
GET /api/programs

POST /api/programs

GET /api/programs/{id}

PUT /api/programs/{id}

DELETE /api/programs/{id}

/* Events Routes */

GET /api/events

POST /api/events

GET /api/events/{id}

PUT /api/events/{id}

DELETE /api/events/{id}

/* Mentorship Routes */
GET /api/mentorship

POST /api/mentorship

GET /api/mentorship/{id}

PUT /api/mentorship/{id}

DELETE /api/mentorship/{id}

/* Donation Routes */

GET /api/donations

POST /api/donations

GET /api/donations/{id}

PUT /api/donations/{id}

DELETE /api/donations/{id}