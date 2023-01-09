# Application requirenments

----------------------------------------------------------------------------

## Car registration

### Functional requirenments
- should be possible to register a new car;
- should be possible to list all car categories.

### Business rules
- it must not be possible to register multiple cars with the same line plate;
- it must not be possible to edit line plate;
- cars must be registered with available status;
- it must not be possible to register a new car without admin privilegies.

----------------------------------------------------------------------------

## Car listing

### Functional requirenments
- should be possible to list all the available cars;
- should be possible to list all cars by category name;
- should be possible to list all cars by manufactory name;
- should be possible to list all cars by car name.

### Business rules
- should be possible to list cars without login.

----------------------------------------------------------------------------

## Specification registration

### Functional requirenments
- should be register a new car specification;
- should be possible to list all specifications;
- it must not be possible to register a new specification without admin privilegies.

### Business rules
- it must not be possible to register a specification to a not registered car;
- it must not be possible to register duplicated specifications to the same car.

----------------------------------------------------------------------------

## Car image registration

### Functional requirenments
- should be possible to register a new car img;

### Not functional requirenments
- use multer for upload.

### Business rules
- should be possible to register more than one image by car model;
- it must not be possible to register a new car image without admin privilegies.

-----------------------------------------------------------------------------

## Car rental

### Functional requirenments
- should be possible to register a new car rental;
- car rental must be at least 24 hours long;
- it must be not register a new car rental if exists another one with the same car.


