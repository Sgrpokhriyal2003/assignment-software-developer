# Load Management System API

A RESTful API for managing load bookings and transportation logistics. This system allows shippers to post loads and transporters to book them.


## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Sgrpokhriyal2003/assignment-software-developer

```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3001
MONGO_URL=your_mongodb_connection_string
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

For production:
```bash
npm start
```

## API Documentation

### Load Management

#### Create Load
- **POST** `/load`
- Creates a new load posting
- Required fields:
  - shipperId
  - facility.loadingPoint
  - facility.unloadingPoint
  - facility.loadingDate (ISO8601)
  - facility.unloadingDate (ISO8601)
  - productType
  - truckType
  - noOfTrucks (min: 1)
  - weight (min: 0)
  - status (optional: POSTED, BOOKED, CANCELLED)

#### Get All Loads
- **GET** `/load`
- Retrieves all load postings

#### Get Load by ID
- **GET** `/load/:id`
- Retrieves a specific load posting

#### Update Load
- **PUT** `/load/:id`
- Updates an existing load posting
- Same validation as create load

#### Delete Load
- **DELETE** `/load/:id`
- Deletes a load posting

### Booking Management

#### Create Booking
- **POST** `/booking`
- Creates a new booking for a load
- Required fields:
  - loadId
  - transporterId
  - proposedRate (min: 0)
  - status (optional: PENDING, ACCEPTED, REJECTED)

#### Get All Bookings
- **GET** `/booking`
- Retrieves all bookings

#### Get Booking by ID
- **GET** `/booking/:id`
- Retrieves a specific booking

#### Update Booking Status
- **PUT** `/booking/:id/status`
- Updates the status of a booking
- Required field:
  - status (ACCEPTED or REJECTED)

#### Delete Booking
- **DELETE** `/booking/:id`
- Deletes a booking

## Assumptions

1. **Authentication & Authorization**
   - The system assumes that authentication is handled at a higher level
   - User IDs (shipperId, transporterId) are provided and validated externally

2. **Data Validation**
   - All dates are expected in ISO8601 format
   - Numeric values (weight, proposedRate) must be positive
   - Status fields have predefined valid values

3. **Business Logic**
   - A load can be booked by multiple transporters
   - Status transitions are managed through the API
   - No automatic status updates based on time or other conditions

4. **Error Handling**
   - All errors are logged using Winston
   - Error logs are stored in 'error.log' and 'combined.log'
   - API returns appropriate HTTP status codes and error messages

5. **Performance**
   - MongoDB is used for data persistence
   - No caching layer is implemented
   - Pagination is not implemented for list endpoints

## Logging

The application uses Winston for logging with the following configuration:
- Error logs are stored in 'error.log'
- Combined logs are stored in 'combined.log'
- Console logging is enabled in development mode

## Error Handling

The application includes a global error handling middleware that:
- Logs errors using Winston
- Returns a 500 status code with a generic error message
- Preserves the error stack trace in logs

## Development

To run the application in development mode with auto-reload:
```bash
npm run dev
```

## Production

For production deployment:
1. Set NODE_ENV=production in .env
2. Run the application using:
```bash
npm start
``` 
