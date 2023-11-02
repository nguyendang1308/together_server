import 'dart:convert';

class User {
  final String id;
  final String email;
  final String fullName;
  final String gender;
  final String birthday;

  User({
    required this.id,
    required this.email,
    required this.fullName,
    required this.gender,
    required this.birthday,
  });

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};

    result.addAll({'id': id});
    result.addAll({'email': email});
    result.addAll({'fullName': fullName});
    result.addAll({'gender': gender});
    result.addAll({'birthday': birthday});

    return result;
  }

  factory User.fromMap(Map<String, dynamic> map) {
    return User(
      id: map['idUser'] ?? '',
      email: map['email'] ?? '',
      fullName: map['fullName'] ?? '',
      gender: map['gender'] ?? '',
      birthday: map['birthday'] ?? '',
    );
  }
}
