class HandleAlreadyExistsException implements Exception {
  final String cause;
  HandleAlreadyExistsException(this.cause);
}

class UserAlreadyExistsException implements Exception {
  final String cause;
  UserAlreadyExistsException(this.cause);
}
